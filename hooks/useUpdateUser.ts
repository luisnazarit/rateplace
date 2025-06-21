import { useState } from "react";
import useFetch from "./useFetch";
import { User } from "@prisma/client";
import { API_URL } from "@/lib/constants";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  const updateUser = async (data: Partial<User>) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar usuario");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const { data: user, loading: userLoading } = useFetch<User>({
    url: `${API_URL}/user`,
  });

  return {
    updateUser,
    user,
    userLoading,
    loading,
  };
}
