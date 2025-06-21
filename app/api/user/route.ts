import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      documentType,
      documentNumber,
      birthDate,
    } = body;

    // Validar que al menos un campo esté presente
    if (
      !name &&
      !phone &&
      !address &&
      !city &&
      !state &&
      !country &&
      !zipCode &&
      !documentType &&
      !documentNumber &&
      !birthDate
    ) {
      return NextResponse.json(
        { error: "Al menos un campo debe ser proporcionado" },
        { status: 400 }
      );
    }

    // Preparar los datos a actualizar
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (country !== undefined) updateData.country = country;
    if (zipCode !== undefined) updateData.zipCode = zipCode;
    if (documentType !== undefined) updateData.documentType = documentType;
    if (documentNumber !== undefined)
      updateData.documentNumber = documentNumber;
    if (birthDate !== undefined)
      updateData.birthDate = birthDate ? new Date(birthDate) : null;

    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        country: true,
        zipCode: true,
        documentType: true,
        documentNumber: true,
        birthDate: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { error: "Error al procesar la actualización" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        country: true,
        zipCode: true,
        documentType: true,
        documentNumber: true,
        birthDate: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
