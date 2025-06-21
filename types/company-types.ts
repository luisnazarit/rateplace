export interface CompanySettingsData {
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

export interface CompanySettingsResponse {
  message: string;
  account: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    banner: string | null;
    status: string;
    enabled: boolean;
    domain: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    city: string | null;
    commune: string | null;
    zipCode: string | null;
    updatedAt: Date;
  };
}

export interface BusinessAccountFormValues {
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