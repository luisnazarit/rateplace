'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@/components/commons/TextField';
import TextAreaField from '@/components/commons/TextAreaField';
import SelectField from '@/components/commons/SelectField';

// Validation schema
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .required('El nombre es requerido'),
  description: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .required('La descripción es requerida'),
  price: Yup.number()
    .positive('El precio debe ser positivo')
    .required('El precio es requerido'),
  stock: Yup.number()
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo')
    .required('El stock es requerido'),
  category: Yup.string()
    .required('La categoría es requerida'),
  status: Yup.string()
    .required('El estado es requerido'),
});

const categoryOptions = [
  { value: 'electronics', label: 'Electrónicos' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'food', label: 'Alimentos' },
];

const statusOptions = [
  { value: 'draft', label: 'Borrador' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Aquí implementaremos la lógica para guardar el producto
      console.log('Form data:', { ...values, images });
      router.push('/company/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2>
            Nuevo Producto
          </h2>
        </div>
      </div>

      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          status: 'draft',
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className="">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Nombre del Producto */}
                  <div className="col-span-2">
                    <Field
                      as={TextField}
                      name="name"
                      label="Nombre del Producto"
                      placeholder="Ingrese el nombre del producto"
                      isInvalid={touched.name && errors.name}
                      hintError={touched.name && errors.name}
                      required
                    />
                  </div>

                  {/* Descripción */}
                  <div className="col-span-2">
                    <Field
                      as={TextAreaField}
                      name="description"
                      label="Descripción"
                      placeholder="Ingrese la descripción del producto"
                      rows={4}
                      isInvalid={touched.description && errors.description}
                      hintError={touched.description && errors.description}
                      required
                    />
                  </div>

                  {/* Precio */}
                  <div>
                    <Field
                      as={TextField}
                      name="price"
                      label="Precio"
                      type="number"
                      placeholder="0.00"
                      isInvalid={touched.price && errors.price}
                      hintError={touched.price && errors.price}
                      required
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <Field
                      as={TextField}
                      name="stock"
                      label="Stock"
                      type="number"
                      placeholder="0"
                      isInvalid={touched.stock && errors.stock}
                      hintError={touched.stock && errors.stock}
                      required
                    />
                  </div>

                  {/* Categoría */}
                  <div>
                    <Field
                      as={SelectField}
                      name="category"
                      label="Categoría"
                      options={categoryOptions}
                      isInvalid={touched.category && errors.category}
                      hintError={touched.category && errors.category}
                      required
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <Field
                      as={SelectField}
                      name="status"
                      label="Estado"
                      options={statusOptions}
                      isInvalid={touched.status && errors.status}
                      hintError={touched.status && errors.status}
                      required
                    />
                  </div>

                  {/* Imágenes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Imágenes</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Subir imágenes</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">o arrastrar y soltar</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                      </div>
                    </div>
                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              onClick={() => removeImage(index)}
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
} 