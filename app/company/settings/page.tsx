import { getCurrentAccount } from "@/lib/getTenant";
import CompanySettingsForm from "../components/CompanySettingsForm";
import { BusinessAccountFormValues } from "@/types/company-types";

export default async function CompanySettingsPage() {
  // Obtener datos de la cuenta desde Prisma
  const account = await getCurrentAccount();

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Configuración de la Empresa</h1>
        <p>No se encontró la cuenta de la empresa.</p>
      </div>
    );
  }

  // Mapear los datos de la cuenta a los valores iniciales del formulario
  const initialValues: BusinessAccountFormValues = {
    name: account.name || "",
    slug: account.slug || "",
    description: account.description || "",
    logo: account.logo || null,
    banner: account.banner || null,
    status: account.status || "PENDING",
    enabled: account.enabled ?? true,
    domain: account.domain || "",
    phone: account.phone || "",
    email: account.email || "",
    address: account.address || "",
    city: account.city || "",
    commune: account.commune || "",
    zipCode: account.zipCode || "",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuración de la Empresa</h1>
      <CompanySettingsForm initialValues={initialValues} />
    </div>
  );
}
