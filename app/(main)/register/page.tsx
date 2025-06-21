'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { useRegister } from '../hooks/useRegister';
import { RESERVED_DOMAINS } from '@/lib/constants';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .test('reserved-domain', 'Este nombre no está disponible', function(value) {
      if (!value) return true;
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return !RESERVED_DOMAINS.includes(slug);
    }),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
});

export default function RegisterPage() {
  const { register, isLoading } = useRegister();

  const initialValues = {
    name: '',
    email: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await register(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            Crear una cuenta
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <TextField
                  name="name"
                  label="Nombre completo"
                  required
                />
                <TextField
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="Correo electrónico"
                  required
                />
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  {isSubmitting || isLoading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 