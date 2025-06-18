"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import useRegister from "./hooks/useRegister";
import TextField from "../commons/TextField";
import Button from "../commons/Button";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  passwordRepeat: Yup.string()
    .required("La contraseña es requerida")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

export default function FormRegister() {
  const { saveForm, loading } = useRegister();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", passwordRepeat: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveForm(values, setSubmitting);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre completo"
            name="name"
            value={values.name}
            style={{
              borderColor: errors.email && touched.name ? "red" : "rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.1)"
            }}
            onChange={handleChange}
            isInvalid={!!errors.name && touched.name}
            className="mb-4"
            hintError={errors.name && touched.name ? errors.name : undefined}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            style={{
              borderColor: errors.email && touched.email ? "red" : "rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.1)"
            }}
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.name && touched.email}
            className="mb-4"
            hintError={errors.name && touched.email ? errors.email : undefined}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            style={{
              borderColor: errors.password && touched.password ? "red" : "rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.1)"
            }}
            value={values.password}
            onChange={handleChange}
            isInvalid={!!errors.password && touched.password}
            className="mb-4"
            hintError={
              errors.password && touched.password ? errors.password : undefined
            }
          />
          <TextField
            label="Repetir Password"
            name="passwordRepeat"
            type="password"
            style={{
              borderColor: errors.passwordRepeat && touched.passwordRepeat ? "red" : "rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.1)"
            }}
            value={values.passwordRepeat}
            onChange={handleChange}
            isInvalid={!!errors.passwordRepeat && touched.passwordRepeat}
            className="mb-4"
            hintError={
              errors.passwordRepeat && touched.passwordRepeat ? errors.passwordRepeat : undefined
            }
          />
          <div className="flex flex-col gap-4">
            <Button
              isLoading={isSubmitting}
              type="submit"
              color="primary"
              className="w-full"
            >
              {isSubmitting ? "Guardando..." : "Crear cuenta"}
            </Button>
            <small className="text-white/50">
              By logging in and using OnlyFans, you agree to our Terms of
              Service and Privacy Policy, and confirm that you are at least 18
              years old.
            </small>
          </div>
        </form>
      )}
    </Formik>
  );
}
