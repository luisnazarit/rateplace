"use client";
import { UserType } from "@/types/login-types";
import WrapperAuth from "./WrapperAuth";
import Login from "./Login";
import { GoogleLogin } from "./GoogleLogin";

type FormLoginProps = {
  title?: string;
};

const FormLogin = ({
  title = "Iniciar sesión",
}: FormLoginProps) => {
  return (
    <WrapperAuth subTitle="Ingresa con google" title={title}>
      {/* {userType === "company" && <Login userType={userType} />} */}

      <GoogleLogin />
    </WrapperAuth>
  );
};
export default FormLogin;
