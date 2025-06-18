import { color } from "framer-motion";

export const customStyles = (isInvalid?: boolean) => ({
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '14px',
  }),
  control: (provided: any) => ({
    ...provided,
    border: isInvalid ? "1px solid red" : "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "none",
    fontSize: "14px",
  }),
  menu: (provided: any) => ({
    ...provided,
    color: "black",
  }),
});

export const theme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: '#f4f4f4',
    primary: 'var(--color-primary-500)',
  },
})
