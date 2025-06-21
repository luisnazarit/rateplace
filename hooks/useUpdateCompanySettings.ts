import { useState } from "react";
import { toast } from "react-toastify";
import { CompanySettingsData, CompanySettingsResponse } from "@/types/company-types";

export default function useUpdateCompanySettings() {
  const [loading, setLoading] = useState(false);

  const updateSettings = async (data: CompanySettingsData): Promise<CompanySettingsResponse | null> => {
    setLoading(true);

    try {
      // Preparar los datos para el envío
      const formData = new FormData();
      
      // Agregar campos de texto
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'boolean') {
            formData.append(key, value.toString());
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await fetch("/api/company/settings", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar la configuración");
      }
      console.log("hola")
      toast.success("Configuración actualizada exitosamente");
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      toast.error(errorMessage);
      console.error("Error al actualizar configuración:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSettings,
    loading,
  };
} 