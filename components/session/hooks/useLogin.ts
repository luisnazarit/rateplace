import { useState } from "react";
import { loginAction } from "../auth-action";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    const response = await loginAction(
      { email: values.email, password: values.password },
      "user"
    );

    if (response.error) {
      setError(response.error);
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
}
