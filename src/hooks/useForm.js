import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useForm = (initialFValues, onChangeValidate = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
    if (onChangeValidate) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    handleInputChange,
    values,
    errors,
    setErrors,
    resetForm,
    setValues,
  };
};

export default useForm;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const Form = (props) => {
  const classes = useStyles();
  const { children, ...others } = props;
  return (
    <form className={classes.root} autoComplete="off" {...others}>
      {children}
    </form>
  );
};
