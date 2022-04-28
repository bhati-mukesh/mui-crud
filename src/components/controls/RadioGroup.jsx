import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";
import React from "react";

const RadioGroup = ({ name, label, value, onChange, options }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {options?.map((radio) => (
          <FormControlLabel
            key={radio.label}
            value={radio.value}
            control={<Radio />}
            label={radio.label}
          />
        ))}
        {/* <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
