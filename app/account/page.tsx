export default function AccountHome({ params }: { params: { subdomain: string } }) {
  return (
    <div>
      <h1>Dashboard de la cuenta: {params.subdomain}</h1>
      {/* Aquí va el contenido del dashboard de la cuenta */}
    </div>
  );
} 