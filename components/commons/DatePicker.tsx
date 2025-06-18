import React, { useState } from "react";
import DatePicker, { DatePickerProps, registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/commons/css/datepicker.css";
import { es } from "date-fns/locale/es";
registerLocale("es", es);

type Props = {
  value?: Date;
  onChange?: (date: Date | null) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  hintError?: string;
  isInvalid?: boolean;
};

const CustomDatePicker: React.FC<DatePickerProps & Props> = ({
  value,
  onChange,
  disabled,
  className,
  showTimeSelect,
  label,
  isInvalid,
  hintError,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange && date) {
      onChange(date);
    }
  };

  return (
    <div className={`${isInvalid ? "input-invalid" : ""} ${className}`}>
      {label && (
        <label
          className={`block mb-1 text-sm ${disabled ? "text-gray-500" : ""}`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        selected={selectedDate}
        locale="es"
        showTimeSelect={showTimeSelect}
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        onChange={handleDateChange}
        {...props}
      />
      {hintError && (
        <p className="text-red-500 text-xs mt-1">{hintError}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;
