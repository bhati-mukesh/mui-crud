import { TextField } from "@material-ui/core";
import React from "react";

const Input = (props) => {
  const { name, label, value, onChange, error = null, ...others } = props;
  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...others}
    />
  );
};

export default Input;
