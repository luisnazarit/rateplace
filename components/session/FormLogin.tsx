"use client";
import WrapperAuth from "./WrapperAuth";
import { GoogleLogin } from "./GoogleLogin";
import TextField from "@/components/commons/TextField";
import Button from "@/components/commons/Button";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useLogin from "./hooks/useLogin";
import { redirect } from "next/navigation";

type FormLoginProps = {
  title?: string;
};

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const FormLogin = ({ title = "Iniciar sesión" }: FormLoginProps) => {
  const { login, loading, error, setError } = useLogin();

  return (
    <WrapperAuth subTitle="Ingresa con google" title={title}>
      <GoogleLogin />
      <hr className="my-8" />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          try {
            await login(values);
            window.location.href = "/";
          } catch (error) {}
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form className="flex flex-col gap-4 mt-6">
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email && touched.email}
              hintError={touched.email ? errors.email : undefined}
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password && touched.password}
              hintError={touched.password ? errors.password : undefined}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              color="primary"
              type="submit"
              isLoading={loading || isSubmitting}
            >
              Iniciar sesión
            </Button>
            <div className="flex justify-between mt-2 text-sm">
              <Link
                href="/forgot-password"
                className="text-blue-400 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <Link href="/register" className="text-blue-400 hover:underline">
                Crear una cuenta
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </WrapperAuth>
  );
};
export default FormLogin;
