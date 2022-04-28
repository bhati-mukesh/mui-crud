import { Button as MuiButton, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (props) => {
  const {
    text,
    size = "large",
    color = "primary",
    variant = "contained",
    onClick,
    ...others
  } = props;
  const classes = useStyles();
  return (
    <MuiButton
      size={size}
      variant={variant}
      onClick={onClick}
      color={color}
      {...others}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
