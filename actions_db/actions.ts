import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Hashea una contraseña usando bcrypt
 * @param password Contraseña en texto plano
 * @returns Hash de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compara una contraseña en texto plano con un hash
 * @param password Contraseña en texto plano
 * @param hash Hash de la contraseña
 * @returns true si coinciden, false si no
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}