# API de Configuración de Empresa

## Endpoint

### PUT /api/company/settings

Actualiza la configuración de la empresa actual.

#### Autenticación
Requiere autenticación de usuario y permisos en la cuenta de negocio.

#### Parámetros (FormData)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| description | string | Descripción de la empresa |
| logo | File/string | Logo de la empresa (archivo o URL) |
| banner | File/string | Banner de la empresa (archivo o URL) |
| status | string | Estado de la cuenta (PENDING, ACTIVE, SUSPENDED, CLOSED) |
| enabled | boolean | Si la cuenta está habilitada |
| domain | string | Dominio personalizado |
| phone | string | Teléfono de contacto |
| email | string | Email de contacto |
| address | string | Dirección |
| city | string | Ciudad |
| commune | string | Comuna |
| zipCode | string | Código postal |

#### Respuesta

```json
{
  "message": "Configuración actualizada exitosamente",
  "account": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "description": "string | null",
    "logo": "string | null",
    "banner": "string | null",
    "status": "string",
    "enabled": "boolean",
    "domain": "string | null",
    "phone": "string | null",
    "email": "string | null",
    "address": "string | null",
    "city": "string | null",
    "commune": "string | null",
    "zipCode": "string | null",
    "updatedAt": "Date"
  }
}
```

#### Códigos de Error

- `401` - No autorizado
- `403` - Sin permisos para esta cuenta
- `404` - Cuenta no encontrada
- `400` - Datos inválidos (email inválido, dominio duplicado)
- `500` - Error interno del servidor

## Hook Personalizado

### useUpdateCompanySettings

Hook de React para manejar la actualización de la configuración de la empresa.

#### Uso

```typescript
import useUpdateCompanySettings from "@/hooks/useUpdateCompanySettings";

function MyComponent() {
  const { updateSettings, loading } = useUpdateCompanySettings();

  const handleSubmit = async (data) => {
    const result = await updateSettings(data);
    if (result) {
      console.log("Configuración actualizada:", result.account);
    }
  };

  return (
    <button onClick={() => handleSubmit(formData)} disabled={loading}>
      {loading ? "Guardando..." : "Guardar"}
    </button>
  );
}
```

#### Parámetros

- `data`: `CompanySettingsData` - Datos de configuración a actualizar

#### Retorna

- `updateSettings`: Función para actualizar la configuración
- `loading`: Estado de carga

#### Características

- Maneja automáticamente FormData para archivos
- Muestra notificaciones de éxito/error usando react-toastify
- Maneja errores de red y validación
- Estado de carga integrado

## Tipos TypeScript

```typescript
interface CompanySettingsData {
  description?: string;
  logo?: string | File | null;
  banner?: string | File | null;
  status?: string;
  enabled?: boolean;
  domain?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  commune?: string;
  zipCode?: string;
}

interface BusinessAccountFormValues {
  name: string;
  slug: string;
  description: string;
  logo: string | File | null;
  banner: string | File | null;
  status: string;
  enabled: boolean;
  domain: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  commune: string;
  zipCode: string;
}
```

## Notas

- Los archivos (logo y banner) se envían como FormData
- El endpoint valida que el dominio sea único
- Se valida el formato del email
- Los campos opcionales se pueden enviar como `null` para limpiarlos
- El hook maneja automáticamente la conversión de tipos para FormData 