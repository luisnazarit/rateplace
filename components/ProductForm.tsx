"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@/components/commons/TextField";
import TextAreaField from "@/components/commons/TextAreaField";
import SelectField from "@/components/commons/SelectField";
import Button from "@/components/commons/Button";

// Validation schema
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .required("El nombre es requerido"),
  description: Yup.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .required("La descripción es requerida"),
  price: Yup.number()
    .positive("El precio debe ser positivo")
    .required("El precio es requerido"),
  stock: Yup.number()
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .required("El stock es requerido"),
  category: Yup.string().required("La categoría es requerida"),
  status: Yup.string().required("El estado es requerido"),
});

const categoryOptions = [
  { value: "electronics", label: "Electrónicos" },
  { value: "clothing", label: "Ropa" },
  { value: "food", label: "Alimentos" },
];

const statusOptions = [
  { value: "draft", label: "Borrador" },
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
];

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  status: string;
}

interface ProductFormProps {
  initialValues?: Partial<ProductFormData>;
  onSubmit: (values: ProductFormData) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export default function ProductForm({
  initialValues = {},
  onSubmit,
  onCancel,
  isEditing = false,
  isLoading = false,
}: ProductFormProps) {
  const defaultValues: ProductFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "draft",
    ...initialValues,
  };

  const handleSubmit = async (
    values: ProductFormData,
    { setSubmitting }: any
  ) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2>{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
        </div>
      </div>

      <Formik
        initialValues={defaultValues}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className="">
              <div className="">
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
                </div>
              </div>
              <div className="flex gap-2 mt-8">
                <Button variant="outlined" type="button" href="/company/products">
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                    ? "Actualizar Producto"
                    : "Guardar Producto"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
