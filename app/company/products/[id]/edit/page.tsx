'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm, { ProductFormData } from '@/components/ProductForm';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Aquí implementaremos la lógica para obtener el producto
        // Por ahora usamos datos de ejemplo
        const mockProduct: ProductFormData = {
          name: 'Producto de ejemplo',
          description: 'Esta es una descripción de ejemplo para el producto',
          price: '99.99',
          stock: '50',
          category: 'electronics',
          status: 'active',
        };
        
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Redirigir a la lista de productos si no se encuentra
        router.push('/company/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleSubmit = async (values: ProductFormData, images: File[]) => {
    try {
      // Aquí implementaremos la lógica para actualizar el producto
      console.log('Update form data:', { ...values, images, productId: params.id });
      router.push('/company/products');
    } catch (error) {
      console.error('Error updating product:', error);
      throw error; // Re-throw para que el componente maneje el error
    }
  };

  const handleCancel = () => {
    router.push('/company/products');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Cargando producto...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Producto no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      initialValues={product}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditing={true}
      isLoading={isLoading}
    />
  );
} 