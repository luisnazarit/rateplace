import Checkbox from "@mui/material/Checkbox";

import { FormControlLabel } from "@mui/material";

export default function CheckboxField({ ...props }) {
  return (
    <div className={props.className}>
      <FormControlLabel
        sx={{
          margin: 0,
        }}
        className={props.disabled ? 'text-gray-500' : ''}
        control={
          <Checkbox
            checked={props.checked}
            disabled={props.disabled}
            sx={{
              color: "rgb(0 21 255)",
              padding: "2px",
              "&.Mui-checked": {
                color: "rgb(0 21 255)",
              },
            }}
            size={props.size}
            onChange={props.onChange}
          />
        }
        label={props.label}
      />
    </div>
  );
}
