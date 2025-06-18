import { redirect } from 'next/navigation';
import { useState } from 'react'
import { toast } from 'react-toastify';

type Values = {
  name: string;
  email: string;
  password: string;
  city: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const saveForm = async (values: Values, isSubmitting: (val: boolean) => void) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status > 399) {
        const data = await res.json();
        if (data.message) {
          toast.error(data.message);
          return;
        }
        toast.error("Hubo un error inesperado");
        return;
      }
      toast.success("Compañía creada correctamente");
      setTimeout(() => redirect('/login/company'), 1000);
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error inesperado");
    } finally {
      setLoading(false);
      isSubmitting(false);
    }
  };
  return {
    loading,
    saveForm
  }
}
