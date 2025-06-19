import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import sanitize from "sanitize-html";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const formatCL = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
}).format;

export const jobType = {
  PART_TIME: "Part-time",
  FULL_TIME: "Full-time",
  TEMPORATY: "Temporal",
};

export const modes = {
  REMOTE: "Remoto",
  ON_SITE: "Presencial",
  HYBRID: "Híbrido",
};

export const jobTypeOptions = () => {
  return Object.entries(jobType).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};

export const modeOptions = () => {
  return Object.entries(modes).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};

export function string_to_slug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export const years = [
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
  { label: "2018", value: "2018" },
  { label: "2017", value: "2017" },
  { label: "2016", value: "2016" },
  { label: "2015", value: "2015" },
  { label: "2014", value: "2014" },
  { label: "2013", value: "2013" },
  { label: "2012", value: "2012" },
  { label: "2011", value: "2011" },
  { label: "2010", value: "2010" },
  { label: "2009", value: "2009" },
  { label: "2008", value: "2008" },
  { label: "2007", value: "2007" },
  { label: "2006", value: "2006" },
  { label: "2005", value: "2005" },
  { label: "2004", value: "2004" },
  { label: "2003", value: "2003" },
  { label: "2002", value: "2002" },
  { label: "2001", value: "2001" },
  { label: "2000", value: "2000" },
];

export const countries = [
  { label: "Alemania", value: "DE" },
  { label: "Argentina", value: "AR" },
  { label: "Australia", value: "AU" },
  { label: "Bolivia", value: "BO" },
  { label: "Brasil", value: "BR" },
  { label: "Canadá", value: "CA" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Colombia", value: "CO" },
  { label: "Costa Rica", value: "CR" },
  { label: "Corea del Sur", value: "KR" },
  { label: "Cuba", value: "CU" },
  { label: "Ecuador", value: "EC" },
  { label: "El Salvador", value: "SV" },
  { label: "España", value: "ES" },
  { label: "Estados Unidos", value: "US" },
  { label: "Francia", value: "FR" },
  { label: "Guatemala", value: "GT" },
  { label: "Haití", value: "HT" },
  { label: "Honduras", value: "HN" },
  { label: "India", value: "IN" },
  { label: "Italia", value: "IT" },
  { label: "Japón", value: "JP" },
  { label: "México", value: "MX" },
  { label: "Nicaragua", value: "NI" },
  { label: "Panamá", value: "PA" },
  { label: "Paraguay", value: "PY" },
  { label: "Países Bajos", value: "NL" },
  { label: "Perú", value: "PE" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Reino Unido", value: "GB" },
  { label: "República Dominicana", value: "DO" },
  { label: "Rusia", value: "RU" },
  { label: "Singapur", value: "SG" },
  { label: "Suiza", value: "CH" },
  { label: "Uruguay", value: "UY" },
  { label: "Venezuela", value: "VE" },
];

export const mapCountries = () => {
  return countries.reduce(
    (acc, country) => {
      acc[country.value] = country.label;
      return acc;
    },
    {} as Record<string, string>
  );
};

export const dateFromNow = (date: Date) => {
  const dateFromNow = dayjs(date); // Puedes cambiar esto por la fecha que desees
  const now = dayjs();
  if (!date) return "no-data";
  return dateFromNow.from(now);
};

export function formatDate(date: Date) {
  return dayjs(date).format("DD/MM/YYYY");
}

export function formatTime(date: Date) {
  return dayjs(date).format("HH:mm");
}

export function formatFullDate(date: Date) {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export function simpleDate(date: Date) {
  return dayjs(date).format("DD MMM");
}

export function formatBytes(bytes: number) {
  if (!bytes) return "-";
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const validateRUT = (rut: string): boolean => {
  // Limpiar el RUT eliminando puntos y guión
  const cleanedRUT = rut.replace(/[.-]/g, "").toUpperCase();

  // Verificar si la longitud es adecuada (8 o 9 caracteres)
  if (cleanedRUT.length < 8 || cleanedRUT.length > 9) return false;

  const rutBody = cleanedRUT.slice(0, -1); // RUT sin el dígito verificador
  const rutDV = cleanedRUT.charAt(cleanedRUT.length - 1); // Dígito verificador

  // Calcular el dígito verificador
  let sum = 0;
  let factor = 2;

  // Realizar la multiplicación y sumatoria
  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += parseInt(rutBody.charAt(i)) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const mod = sum % 11;
  let calculatedDV = 11 - mod;

  // Verificar el dígito verificador
  if (calculatedDV === 11) calculatedDV = "0";
  if (calculatedDV === 10) calculatedDV = "K";

  // Comparar el dígito verificador calculado con el proporcionado
  return rutDV === String(calculatedDV);
};

export function stripHtmlAndTruncate(html: string, maxLength: number): string {
  // Elimina etiquetas HTML
  const plainText = html.replace(/<[^>]*>/g, "").trim();

  // Si el texto ya es más corto, simplemente devuélvelo
  if (plainText.length <= maxLength) return plainText;

  // Corta hasta el límite sin cortar palabras
  const truncated = plainText.slice(0, maxLength);

  // Busca el último espacio para evitar cortar palabras
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "…";
}

export function description(description: string, size = 50) {
  return stripHtmlAndTruncate(sanitize(description), size);
}