import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2)
  }
}));

const MainInput = ({ id, label, value, onChange, fullWidth = false }) => {
  const classes = useStyles();

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      fullWidth={fullWidth}
      onChange={onChange}
      className={classes.margin}
    />
  );
};

export default MainInput;
