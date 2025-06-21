"use client";

import { useRouter } from "next/navigation";
import ProductForm, { ProductFormData } from "@/components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (values: ProductFormData) => {
    try {
      // Aquí implementaremos la lógica para guardar el producto
      console.log("Form data:", { ...values });
      router.push("/company/products");
    } catch (error) {
      console.error("Error saving product:", error);
      throw error; // Re-throw para que el componente maneje el error
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      isEditing={false}
    />
  );
}
