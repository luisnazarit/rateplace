import FormLogin from "@/components/session/FormLogin";

export default async function Page() {

  return (
    <div className="my-8">
      <FormLogin
        title="Iniciar sesión"
      />
    </div>
  );
}
