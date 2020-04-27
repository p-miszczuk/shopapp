import React from "react";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  spinnerStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  spinnerWrapperStyle: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgb(0,0,0,0.2)",
    height: "100vh",
    width: "100vw"
  }
}));

const Spinner = React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.spinnerWrapperStyle}>
      <div className={classes.spinnerStyle}>
        <Loader color="#f13456" height={80} width={80} type="ThreeDots" />
      </div>
    </div>
  );
});

export default Spinner;
