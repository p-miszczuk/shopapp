import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { signInByEmail } from "../reducers/auth/actions";
import { connect } from "react-redux";
import MainButton from "../components/buttons/MainButton";
import MainInput from "../components/Inputs/Input";

const Login = ({ loading, signInByEmail }) => {
  const [email, setEmail] = useState("shoppingapp@shop.pl");
  const [password, setPassword] = useState("shoppingapp");

  const handleSubmit = event => {
    event.preventDefault();
    email.trim().length &&
      password.trim().length &&
      signInByEmail({ email, password });
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
            color={"secondary"}
            disabled={loading}
            fullWidth={true}
            text={loading ? "Loading..." : "Login in"}
            type={"submit"}
            variant={"contained"}
          />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ authReducer }) => ({ loading: authReducer.request });

const mapDispatchToProps = {
  signInByEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
