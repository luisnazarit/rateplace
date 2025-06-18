import useFetch from "@/hooks/useFetch";
import Select from "react-select";
import { customStyles, theme } from "./custom/react-select";
import SelectLoader from "../loaders/SelectLoader";

type Item = {
  value: string;
  label: string;
};

type Props = {
  hint?: string;
  label?: string;
  value?: any;
  labelName?: string;
  className?: string;
  name?: string;
  isInvalid?: boolean;
  isMulti?: boolean;
  hintError?: string;
  placeholder?: string;
  url: string;
  firstOption?: boolean;
  disabled?: boolean;
  firstOptionLabel?: string;
  firstOptionValue?: string;
  onChange?: (items: Item[] | Item | null) => void;  // Cambié el tipo a Item[] | Item | null para manejar el caso de selección vacía
}

interface ItemWithId {
  id: string;
  label: string;
};

export default function SimpleSelectAsync<T>({
  onChange,
  value,
  className,
  placeholder,
  isInvalid,
  name,
  isMulti = false,  // Default a false si no se especifica
  url,
  label,
  disabled,
  labelName,
  hintError,
  hint,
  firstOption = true,
  firstOptionLabel = "Todos",
  firstOptionValue,
}: Props) {

  const { data, loading } = useFetch<T & ItemWithId[]>({ url });

  if (loading || !data) {
    return (
      <div className={className}>
        {label && <label className="block mb-1 text-sm">{label}</label>}
        <SelectLoader />
      </div>
    );
  }

  const filtered: Item[] = data.map((e) => ({
    value: e.id,
    label: labelName ? e?.[labelName] : e?.name,
  }));

  // Transformar el `value` para manejar el caso de `isMulti`
  const mappedValue = isMulti
    ? (value || []).map((v: string) => filtered.find((option) => option.value === v)) // Devolver un array de opciones
    : filtered.find((option) => option.value === value); // Devolver una sola opción

  return (
    <div className={`${className}`}>
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <Select
        placeholder={placeholder}
        styles={customStyles(isInvalid)}
        isMulti={isMulti}
        isDisabled={disabled}
        name={name}
        value={mappedValue}
        theme={theme}
        onChange={(selectedOption: Item[] | Item | null) => {
          if (onChange) {
            if (isMulti) {
              onChange(selectedOption || []);
            } else {
              onChange(selectedOption || null);
            }
          }
        }}
        defaultValue={
          value && value !== "" && isMulti
            ? filtered.filter((e) => value.includes(e.value)) // Si es multi, se debe pasar un array
            : filtered.find((e) => e.value === value) // Si no es multi, se pasa una sola opción
        }
        options={[
          ...(firstOption ? [{ value: firstOptionValue || "", label: firstOptionLabel }] : []),
          ...(filtered || []),
        ]}
      />
      {hintError && <p className="my-2 text-sm text-red-500">{hintError}</p>}
      <small className="block text-gray-500">{hint}</small>
    </div>
  );
}
