import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import List from "./List";
import MainButton from "../components/buttons/MainButton";
import { deleteList } from "../reducers/tasks/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  dialogSize: {
    width: "250px"
  }
}));

const Content = ({ list, deleteList }) => {
  const [checked, setChecked] = useState([]);
  const [dialog, setDialog] = useState({ open: false, value: null });
  const classes = useStyles();

  const handleChecked = event => {
    console.log(event.target.value);
    const findIndex = checked.indexOf(event.target.value);
    const newChecked = [...checked];

    findIndex === -1
      ? newChecked.push(event.target.value)
      : newChecked.splice(findIndex, 1);
    setChecked(newChecked);
  };

  const handleSelect = value => {
    if (value === "selectAll") {
      let newChecked = [];
      list.forEach(item => newChecked.push(item.name));
      setChecked(newChecked);
    } else if (value === "deselectAll") {
      setChecked([]);
    }
  };

  const handleEdit = event => {
    const aa = event.currentTarget.attributes.value.value;
    console.log({ aa });
  };

  const handleDeleteList = event => {
    console.log("You want to delete: ", event.currentTarget.value);
    setDialog({ open: true, value: event.currentTarget.value });
  };

  const handleCloseDialog = event => {
    const target = event.currentTarget.value;
    if (target === "agree") {
      const findItem = list.find(item => item.name === dialog.value);
      deleteList([findItem.id]);
    }
    setDialog({ open: false, value: null });
  };

  return (
    <Grid container spacing={0} justify={"center"} alignItems={"center"}>
      <Grid item xs={11} md={10} lg={9} xl={7} className={classes.margin}>
        <Header handleSelect={handleSelect} />
        <List
          list={list}
          handleEdit={handleEdit}
          handleChecked={handleChecked}
          handleDeleteList={handleDeleteList}
          checked={checked}
        />
      </Grid>
      <Dialog open={dialog.open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm window</DialogTitle>
        <DialogContent className={classes.dialogSize}>
          <DialogContentText>Dialog Content</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MainButton
            autoFocus
            onClick={handleCloseDialog}
            color={"primary"}
            text={"Disagree"}
            value={"disagree"}
          />
          <MainButton
            autoFocus
            onClick={handleCloseDialog}
            color={"primary"}
            text={"Agree"}
            value={"agree"}
          />
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapStateToProps = ({ reducer: { list } }) => ({
  list
});

const mapDispatchToProps = {
  deleteList
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
