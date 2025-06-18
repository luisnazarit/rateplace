"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loginAction } from "./auth-action";
import TextField from "../commons/TextField";
import Button from "../commons/Button";
import Link from "next/link";
import { UserType } from "@/types/login-types";
import Alert from "../commons/Alert";

type FormLoginProps = {
  title?: string;
  userType?: UserType;
};

const Login = ({ userType = "admin" }: FormLoginProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const response = await loginAction({ email: user, password }, userType);
      if (response?.error) {
        setError(response.error);
      } else {
        router.push(`/${userType}`);
      }
    });
  }

  return (
    <>
      {error && (
        <Alert color="error" className="mb-8">
          {error}
        </Alert>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{
            borderColor: error ? "red" : "rgba(255,255,255,.2)",
            background: "rgba(255,255,255,.1)",
          }}
          name="email"
          label="Email"
          type="email"
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderColor: error ? "red" : "rgba(255,255,255,.2)",
            background: "rgba(255,255,255,.1)",
          }}
          name="password"
          type="password"
          label="Password"
        />
        <div className="text-end">
          <Link href={`/forgot-password/${userType}`} className="text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          className="w-full"
          color="primary"
          type="submit"
          isLoading={isPending}
        >
          {isPending ? "Ingresando..." : "Ingresar"}
        </Button>
        <p className="text-sm mt-4">
          ¿Quieres publicar un empleo?{" "}
          <Link className="underline text-primary-500" href="/register/company">
            Crear una cuenta de empresa
          </Link>
        </p>
      </form>
    </>
  );
};
export default Login;
