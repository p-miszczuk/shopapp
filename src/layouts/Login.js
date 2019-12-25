import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MainButton from "../components/buttons/MainButton";
import MainInput from "../components/Inputs/Input";

const Login = ({ fakeAuth, useHistory }) => {
  const [name, setName] = useState("");

  let history = useHistory();

  let login = () => {
    fakeAuth.in(() => {
      history.replace("/in");
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    !!name.trim().toLowerCase().length && login();
  };

  const handleChange = event => {
    event.preventDefault();
    setName(event.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems={"center"}
      justify={"center"}
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={10} sm={9} lg={7}>
        <form onSubmit={handleSubmit}>
          <MainInput
            id={"name"}
            label={"Name"}
            value={name}
            onChange={handleChange}
            fullWidth={true}
          />
          <MainButton
            type={"submit"}
            variant={"contained"}
            color={"secondary"}
            fullWidth={true}
            text={"Login in"}
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
