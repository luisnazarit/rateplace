"use client";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import useUpdateUser from "@/hooks/useUpdateUser";
import TextField from "@/components/commons/TextField";
import SelectField from "@/components/commons/SelectField";
import Button from "@/components/commons/Button";

// Esquema de validación
const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .required("El nombre es requerido"),
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-\(\)]+$/, "Formato de teléfono inválido")
    .max(20, "El teléfono no puede exceder 20 caracteres"),
  address: Yup.string().max(
    200,
    "La dirección no puede exceder 200 caracteres"
  ),
  city: Yup.string().max(100, "La ciudad no puede exceder 100 caracteres"),
  state: Yup.string().max(100, "El estado no puede exceder 100 caracteres"),
  country: Yup.string().max(100, "El país no puede exceder 100 caracteres"),
  zipCode: Yup.string().max(
    20,
    "El código postal no puede exceder 20 caracteres"
  ),
  documentType: Yup.string().max(
    50,
    "El tipo de documento no puede exceder 50 caracteres"
  ),
  documentNumber: Yup.string().max(
    50,
    "El número de documento no puede exceder 50 caracteres"
  ),
  birthDate: Yup.date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
    .nullable(),
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
}

// Componente personalizado para el campo de fecha
const DateField = ({
  name,
  label,
  ...props
}: {
  name: keyof FormValues;
  label: string;
  [key: string]: any;
}) => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormValues>();
  const hasError = errors[name] && touched[name];

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="date"
        id={name}
        value={values[name] || ""}
        onChange={(e) => setFieldValue(name, e.target.value)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {hasError && (
        <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const {
    updateUser,
    loading: updateLoading,
    userLoading,
    user,
  } = useUpdateUser();

  if (userLoading || !user) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const initialValues: FormValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    zipCode: user?.zipCode || "",
    documentType: user?.documentType || "",
    documentNumber: user?.documentNumber || "",
    birthDate: user?.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      // Filtrar solo los campos que han cambiado
      const changedValues = Object.keys(values).reduce((acc, key) => {
        const fieldKey = key as keyof FormValues;
        if (values[fieldKey] !== initialValues[fieldKey]) {
          acc[fieldKey] = values[fieldKey];
        }
        return acc;
      }, {} as Partial<FormValues>);

      // Remover email ya que no se puede editar
      delete changedValues.email;

      if (Object.keys(changedValues).length > 0) {
        await updateUser(changedValues);
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const documentTypeOptions = [
    { value: "", label: "Seleccionar tipo" },
    { value: "DNI", label: "DNI" },
    { value: "RUC", label: "RUC" },
    { value: "CE", label: "Carné de Extranjería" },
    { value: "PASSPORT", label: "Pasaporte" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold  mb-6">Mis Datos</h3>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, dirty, errors, touched, handleChange }) => (
            <Form className="space-y-4">
              <TextField
                label="Nombre"
                name="name"
                onChange={handleChange}
                value={user?.name || ""}
                required
                isInvalid={!!(errors.name && touched.name)}
                hintError={
                  errors.name && touched.name ? errors.name : undefined
                }
                className="text-gray-700"
                inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />

              <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                type="email"
                value={user?.email || ""}
                disabled
                className="text-gray-700"
                inputClass="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                hint="El email no se puede modificar"
              />

              <TextField
                label="Teléfono"
                name="phone"
                onChange={handleChange}
                type="tel"
                isInvalid={!!(errors.phone && touched.phone)}
                hintError={
                  errors.phone && touched.phone ? errors.phone : undefined
                }
                className="text-gray-700"
                inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />

              <TextField
                label="Dirección"
                name="address"
                onChange={handleChange}
                isInvalid={!!(errors.address && touched.address)}
                hintError={
                  errors.address && touched.address ? errors.address : undefined
                }
                className="text-gray-700"
                inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Ciudad"
                  onChange={handleChange}
                  name="city"
                  isInvalid={!!(errors.city && touched.city)}
                  hintError={
                    errors.city && touched.city ? errors.city : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <TextField
                  label="Estado/Provincia"
                  name="state"
                  onChange={handleChange}
                  isInvalid={!!(errors.state && touched.state)}
                  hintError={
                    errors.state && touched.state ? errors.state : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="País"
                  name="country"
                  onChange={handleChange}
                  isInvalid={!!(errors.country && touched.country)}
                  hintError={
                    errors.country && touched.country
                      ? errors.country
                      : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <TextField
                  label="Código Postal"
                  name="zipCode"
                  onChange={handleChange}
                  isInvalid={!!(errors.zipCode && touched.zipCode)}
                  hintError={
                    errors.zipCode && touched.zipCode
                      ? errors.zipCode
                      : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Tipo de Documento"
                  name="documentType"
                  onChange={handleChange}
                  options={documentTypeOptions}
                  isInvalid={!!(errors.documentType && touched.documentType)}
                  hintError={
                    errors.documentType && touched.documentType
                      ? errors.documentType
                      : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <TextField
                  label="Número de Documento"
                  name="documentNumber"
                  onChange={handleChange}
                  isInvalid={
                    !!(errors.documentNumber && touched.documentNumber)
                  }
                  hintError={
                    errors.documentNumber && touched.documentNumber
                      ? errors.documentNumber
                      : undefined
                  }
                  className="text-gray-700"
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <DateField label="Fecha de Nacimiento" name="birthDate" />

              <div className="pt-4">
               
                <Button
                  type="submit"
                  isLoading={isSubmitting || updateLoading}
                  disabled={!dirty}
                >
                  {isSubmitting || updateLoading
                    ? 'Guardando...'
                    : 'Guardar Cambios'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
