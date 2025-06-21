import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getCurrentAccount, getCurrentUserRole } from "@/lib/getTenant";
import { uploadCloudinary } from "@/actions_db/uploadCloudinary";

// PUT - Actualizar configuración de la empresa
export async function PUT(request: Request) {
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

    // Parsear FormData
    const formData = await request.formData();

    // Extraer los campos del FormData
    const description = formData.get("description") as string | null;
    const logo = formData.get("logo") as string | File | null;
    const banner = formData.get("banner") as string | File | null;
    const status = formData.get("status") as string | null;
    const enabled = formData.get("enabled") as string | null;
    const domain = formData.get("domain") as string | null;
    const phone = formData.get("phone") as string | null;
    const email = formData.get("email") as string | null;
    const address = formData.get("address") as string | null;
    const city = formData.get("city") as string | null;
    const commune = formData.get("commune") as string | null;
    const zipCode = formData.get("zipCode") as string | null;

    // Validaciones básicas
    if (
      email &&
      email.trim() !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Verificar que el dominio sea único (si se está actualizando)
    if (domain && domain.trim() !== "" && domain !== account.domain) {
      const domainExists = await prisma.businessAccount.findFirst({
        where: {
          domain,
          id: { not: account.id },
        },
      });

      if (domainExists) {
        return NextResponse.json(
          { error: "Ya existe una cuenta con este dominio" },
          { status: 400 }
        );
      }
    }

    let resultCover: { secure_url?: string } | null = null;
    let resultHero: { secure_url?: string } | null = null;

    try {
      if (logo instanceof File && logo.size > 0) {
        resultCover = await uploadCloudinary(logo);
      }

      if (banner instanceof File && banner.size > 0) {
        resultHero = await uploadCloudinary(banner);
      }
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Preparar datos de actualización
    const updateData: any = {};
    if (description !== null) updateData.description = description || null;
    if (resultCover !== undefined) updateData.logo = resultCover?.secure_url;
    if (resultHero !== undefined) updateData.banner = resultHero?.secure_url;
    if (status !== null) updateData.status = status;
    if (enabled !== null) updateData.enabled = enabled === "true";
    if (domain !== null) updateData.domain = domain || null;
    if (phone !== null) updateData.phone = phone || null;
    if (email !== null) updateData.email = email || null;
    if (address !== null) updateData.address = address || null;
    if (city !== null) updateData.city = city || null;
    if (commune !== null) updateData.commune = commune || null;
    if (zipCode !== null) updateData.zipCode = zipCode || null;

    // Actualizar la cuenta de negocio
    const updatedAccount = await prisma.businessAccount.update({
      where: { id: account.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        logo: true,
        banner: true,
        status: true,
        enabled: true,
        domain: true,
        phone: true,
        email: true,
        address: true,
        city: true,
        commune: true,
        zipCode: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Configuración actualizada exitosamente",
      account: updatedAccount,
    });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    return NextResponse.json(
      { error: "Error al procesar la actualización" },
      { status: 500 }
    );
  }
}
