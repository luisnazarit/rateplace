import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RESERVED_DOMAINS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Validar que los campos requeridos estén presentes
    if (!name || !email) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear slug a partir del nombre
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Validar que el slug no sea un dominio reservado
    if (RESERVED_DOMAINS.includes(slug)) {
      return NextResponse.json(
        { error: "Este nombre no está disponible" },
        { status: 400 }
      );
    }

    // Verificar si ya existe una cuenta con ese slug
    const existingAccount = await prisma.businessAccount.findFirst({
      where: { slug },
    });

    if (existingAccount) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese nombre" },
        { status: 400 }
      );
    }

    // Buscar el usuario por email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Si no existe el usuario, crear uno temporal
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `Usuario_${Date.now()}`, // Nombre temporal único
          isTemporary: true, // Marcar como usuario temporal
        },
      });
    }

    // Crear o obtener el rol de administrador
    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        description: 'Administrador del sistema',
      },
    });

    // Crear la nueva cuenta de negocio con el rol de administrador
    const newAccount = await prisma.businessAccount.create({
      data: {
        name,
        slug,
        owner: {
          connect: { id: user.id }
        },
        users: {
          create: {
            user: {
              connect: { id: user.id }
            },
            role: {
              connect: { id: adminRole.id }
            }
          }
        }
      },
      include: {
        users: {
          include: {
            role: true
          }
        }
      }
    });

    return NextResponse.json(
      {
        message: "Cuenta creada exitosamente",
        account: {
          id: newAccount.id,
          name: newAccount.name,
          slug: newAccount.slug,
          owner: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          roles: newAccount.users.map(ur => ({
            role: ur.role.name,
            userId: ur.userId
          }))
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    return NextResponse.json(
      { error: "Error al procesar la creación de la cuenta" },
      { status: 500 }
    );
  }
}
