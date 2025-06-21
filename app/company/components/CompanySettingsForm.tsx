"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@/components/commons/TextField";
import Button from "@/components/commons/Button";
import SelectField from "@/components/commons/SelectField";
import SwitchField from "@/components/commons/SwitchField";
import FileUploader from "@/components/commons/FileUploader";
import useUpdateCompanySettings from "@/hooks/useUpdateCompanySettings";
import { BusinessAccountFormValues } from "@/types/company-types";

const BusinessAccountSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  slug: Yup.string().required("Slug requerido"),
  description: Yup.string().nullable(),
  logo: Yup.mixed().nullable(),
  banner: Yup.mixed().nullable(),
  status: Yup.string().required("Estado requerido"),
  enabled: Yup.boolean(),
  domain: Yup.string().nullable(),
  phone: Yup.string().nullable(),
  email: Yup.string().email("Email inválido").nullable(),
  address: Yup.string().nullable(),
  city: Yup.string().nullable(),
  commune: Yup.string().nullable(),
  zipCode: Yup.string().nullable(),
});

const accountStatusOptions = [
  { value: "PENDING", label: "Pendiente" },
  { value: "ACTIVE", label: "Activo" },
  { value: "SUSPENDED", label: "Suspendido" },
  { value: "CLOSED", label: "Cerrado" },
];

export default function CompanySettingsForm({
  initialValues,
}: {
  initialValues: BusinessAccountFormValues;
}) {
  const { updateSettings, loading } = useUpdateCompanySettings();

  return (
    <Formik<BusinessAccountFormValues>
      initialValues={initialValues}
      validationSchema={BusinessAccountSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const result = await updateSettings(values);
          if (result) {
            // Opcional: Actualizar los valores iniciales con la respuesta
            // Esto requeriría un callback del componente padre
          }
        } catch (error) {
          console.error("Error al guardar configuración:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        isSubmitting,
        errors,
        touched,
        values,
        setFieldValue,
        handleChange,
      }) => (
        <Form className="space-y-4">
          <TextField
            label="Nombre"
            name="name"
            value={values.name}
            disabled
            hint="El nombre no puede ser modificado."
            required
            isInvalid={!!(touched.name && errors.name)}
            hintError={
              touched.name && errors.name ? String(errors.name) : undefined
            }
          />
          <TextField
            label="Slug"
            hint="El slug no puede ser modificado."
            name="slug"
            value={values.slug}
            disabled
            required
            isInvalid={!!(touched.slug && errors.slug)}
            hintError={
              touched.slug && errors.slug ? String(errors.slug) : undefined
            }
          />
          <TextField
            label="Descripción"
            name="description"
            value={values.description}
            onChange={handleChange}
            type="text"
            isInvalid={!!(touched.description && errors.description)}
            hintError={
              touched.description && errors.description
                ? String(errors.description)
                : undefined
            }
          />
          <FileUploader
            label="Logo"
            name="logo"
            value={values.logo}
            setContent={(val: string | File | null) =>
              setFieldValue("logo", val)
            }
            isInvalid={!!(touched.logo && errors.logo)}
            hintError={
              touched.logo && errors.logo ? String(errors.logo) : undefined
            }
          />
          <FileUploader
            label="Banner"
            name="banner"
            value={values.banner}
            setContent={(val: string | File | null) =>
              setFieldValue("banner", val)
            }
          />
          <SelectField
            label="Estado"
            name="status"
            options={accountStatusOptions}
            value={values.status}
            onChange={(e) => setFieldValue("status", e.target.value)}
            hintError={
              touched.status && errors.status
                ? String(errors.status)
                : undefined
            }
            isInvalid={!!(touched.status && errors.status)}
          />
          <SwitchField
            label="Habilitado"
            name="enabled"
            checked={values.enabled}
            onChange={(checked) => setFieldValue("enabled", checked)}
          />

          <TextField
            label="Teléfono"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            isInvalid={!!(touched.phone && errors.phone)}
            hintError={
              touched.phone && errors.phone ? String(errors.phone) : undefined
            }
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!(touched.email && errors.email)}
            hintError={
              touched.email && errors.email ? String(errors.email) : undefined
            }
          />
          <TextField
            label="Dirección"
            name="address"
            value={values.address}
            onChange={handleChange}
            isInvalid={!!(touched.address && errors.address)}
            hintError={
              touched.address && errors.address
                ? String(errors.address)
                : undefined
            }
          />
          <TextField
            label="Ciudad"
            name="city"
            value={values.city}
            onChange={handleChange}
            isInvalid={!!(touched.city && errors.city)}
            hintError={
              touched.city && errors.city ? String(errors.city) : undefined
            }
          />
          <TextField
            label="Comuna"
            name="commune"
            value={values.commune}
            onChange={handleChange}
            isInvalid={!!(touched.commune && errors.commune)}
            hintError={
              touched.commune && errors.commune
                ? String(errors.commune)
                : undefined
            }
          />
          <TextField
            label="Código Postal"
            name="zipCode"
            value={values.zipCode}
            onChange={handleChange}
            isInvalid={!!(touched.zipCode && errors.zipCode)}
            hintError={
              touched.zipCode && errors.zipCode
                ? String(errors.zipCode)
                : undefined
            }
          />

          <h3>Avanzado</h3>

          <TextField
            label="Dominio"
            name="domain"
            value={values.domain}
            onChange={handleChange}
            isInvalid={!!(touched.domain && errors.domain)}
            hintError={
              touched.domain && errors.domain
                ? String(errors.domain)
                : undefined
            }
          />

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            color="primary"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
