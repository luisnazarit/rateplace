import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getCurrentAccount, getCurrentUserRole } from "@/lib/getTenant";

// GET - Obtener producto por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const account = await getCurrentAccount();
    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.id,
        accountId: account.id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },
        variants: {
          include: {
            images: {
              select: {
                id: true,
                url: true,
                alt: true,
              },
            },
            options: {
              select: {
                id: true,
                name: true,
                value: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            reviews: true,
            variants: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar producto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const account = await getCurrentAccount();
    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 });
    }

    // Verificar permisos del usuario
    const userRole = await getCurrentUserRole();
    if (!userRole) {
      return NextResponse.json({ error: "Sin permisos para esta cuenta" }, { status: 403 });
    }

    // Verificar que el producto existe y pertenece a la cuenta
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: params.id,
        accountId: account.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      stock,
      enabled,
      categoryId,
      images,
      variants,
    } = body;

    // Validaciones básicas
    if (price !== undefined && price < 0) {
      return NextResponse.json(
        { error: "El precio no puede ser negativo" },
        { status: 400 }
      );
    }

    if (stock !== undefined && stock < 0) {
      return NextResponse.json(
        { error: "El stock no puede ser negativo" },
        { status: 400 }
      );
    }

    // Verificar que el slug sea único (si se está actualizando)
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findFirst({
        where: {
          slug,
          accountId: account.id,
          id: { not: params.id },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Ya existe un producto con este slug" },
          { status: 400 }
        );
      }
    }

    // Verificar que la categoría pertenezca a la cuenta
    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          accountId: account.id,
        },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Categoría no encontrada o no pertenece a esta cuenta" },
          { status: 400 }
        );
      }
    }

    // Preparar datos de actualización
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (enabled !== undefined) updateData.enabled = enabled;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;

    // Actualizar producto
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },
        variants: {
          include: {
            images: {
              select: {
                id: true,
                url: true,
                alt: true,
              },
            },
            options: {
              select: {
                id: true,
                name: true,
                value: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar producto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const account = await getCurrentAccount();
    if (!account) {
      return NextResponse.json({ error: "Cuenta no encontrada" }, { status: 404 });
    }

    // Verificar permisos del usuario
    const userRole = await getCurrentUserRole();
    if (!userRole) {
      return NextResponse.json({ error: "Sin permisos para esta cuenta" }, { status: 403 });
    }

    // Verificar que el producto existe y pertenece a la cuenta
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: params.id,
        accountId: account.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar el producto (las relaciones se eliminan en cascada)
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
} 