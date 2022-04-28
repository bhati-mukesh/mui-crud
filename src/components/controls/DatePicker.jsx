import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = ({ name, label, value, onChange }) => {
  const convertToDefaultParameters = (name, value) => ({
    target: { name, value },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        value={value}
        onChange={(date) => onChange(convertToDefaultParameters(name, date))}
        name={name}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
