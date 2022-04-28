import {
  FormControl,
  Checkbox as MiuCheckbox,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";

const CheckBox = ({ name, label, value, onChange }) => {
  const convertToDefaultParameters = (name, value) => ({
    target: { name, value },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MiuCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultParameters(name, e.target.checked))
            }
          />
        }
        label={label}
      ></FormControlLabel>
    </FormControl>
  );
};

export default CheckBox;
