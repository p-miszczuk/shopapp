import React, { useState } from "react";
import { Grid, ListSubheader } from "@material-ui/core";
import { connect } from "react-redux";
import Header from "./Header";
import List from "./List";
import { deleteList } from "../reducers/tasks/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const Content = ({ list, deleteList }) => {
  const [checked, setChecked] = useState([]);
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
    const findItem = list.find(item => item.name === event.currentTarget.value);
    deleteList(findItem.id);
  };

  return (
    <Grid
      container
      spacing={0}
      justify={"center"}
      alignItems={"center"}
      stye={{ minHeight: "100vh" }}
    >
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
