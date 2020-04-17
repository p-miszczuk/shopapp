import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { signInByEmail } from "../reducers/auth/actions";
import MainButton from "../components/buttons/MainButton";
import MainInput from "../components/Inputs/Input";

const Login = ({ fakeAuth, history }) => {
  const [email, setEmail] = useState("shoppingapp@shop.pl");
  const [password, setPassword] = useState("shoppingapp");
  const dispatch = useDispatch();

  let login = () => {
    fakeAuth.in(() => {
      history.replace("/in");
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // !!name.trim().toLowerCase().length && login();
    dispatch(signInByEmail({ email, password }));
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
        <form data-test="login-form" onSubmit={handleSubmit}>
          <MainInput
            id={"email"}
            label={"Email"}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth={true}
            type={"text"}
          />
          <MainInput
            id={"pass"}
            label={"Password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth={true}
            type="password"
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

export default withRouter(Login);
