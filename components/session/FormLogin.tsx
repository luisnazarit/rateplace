"use client";
import WrapperAuth from "./WrapperAuth";
import { GoogleLogin } from "./GoogleLogin";

type FormLoginProps = {
  title?: string;
};

const FormLogin = ({
  title = "Iniciar sesión",
}: FormLoginProps) => {
  return (
    <WrapperAuth subTitle="Ingresa con google" title={title}>
      <GoogleLogin />
    </WrapperAuth>
  );
};
export default FormLogin;
