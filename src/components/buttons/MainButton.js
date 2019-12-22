import React from "react";
import { Button } from "@material-ui/core";

const MainButton = ({ variant, color, onClick, fullWidth, text, type }) => (
  <Button
    variant={variant}
    color={color}
    onClick={onClick}
    fullWidth={fullWidth}
    type={type}
  >
    {text}
  </Button>
);

export default MainButton;
