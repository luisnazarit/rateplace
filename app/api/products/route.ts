import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getCurrentAccount, getCurrentUserRole } from "@/lib/getTenant";

// GET - Listar productos
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const account = await getCurrentAccount();
    if (!account) {
      return NextResponse.json(
        { error: "Cuenta no encontrada" },
        { status: 404 }
      );
    }

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const enabled = searchParams.get("enabled");

    // Construir filtros
    const where: any = {
      accountId: account.id,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (enabled !== null && enabled !== undefined) {
      where.enabled = enabled === "true";
    }

    // Calcular offset
    const offset = (page - 1) * limit;

    // Obtener productos con paginación
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
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
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: offset,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Calcular información de paginación
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// POST - Crear producto
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const account = await getCurrentAccount();
    if (!account) {
      return NextResponse.json(
        { error: "Cuenta no encontrada" },
        { status: 404 }
      );
    }

    // Verificar permisos del usuario
    const userRole = await getCurrentUserRole();
    if (!userRole) {
      return NextResponse.json(
        { error: "Sin permisos para esta cuenta" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      stock,
      enabled = true,
      categoryId,
      images = [],
      variants = [],
    } = body;

    // Validaciones básicas
    if (
      !name ||
      !slug ||
      !description ||
      price === undefined ||
      stock === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Faltan campos requeridos: name, slug, description, price, stock",
        },
        { status: 400 }
      );
    }

    if (price < 0) {
      return NextResponse.json(
        { error: "El precio no puede ser negativo" },
        { status: 400 }
      );
    }

    if (stock < 0) {
      return NextResponse.json(
        { error: "El stock no puede ser negativo" },
        { status: 400 }
      );
    }

    // Verificar que el slug sea único para esta cuenta
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug,
        accountId: account.id,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Ya existe un producto con este slug" },
        { status: 400 }
      );
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

    // Crear el producto con sus relaciones
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        enabled,
        categoryId: categoryId || null,
        accountId: account.id,
        images: {
          create: images.map((image: any) => ({
            url: image.url,
            alt: image.alt || "",
          })),
        },
        variants: {
          create: variants.map((variant: any) => ({
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
            options: {
              create:
                variant.options?.map((option: any) => ({
                  name: option.name,
                  value: option.value,
                })) || [],
            },
            images: {
              create:
                variant.images?.map((image: any) => ({
                  url: image.url,
                  alt: image.alt || "",
                })) || [],
            },
          })),
        },
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
      },
    });

    return NextResponse.json(
      {
        message: "Producto creado exitosamente",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
