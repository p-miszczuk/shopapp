import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import List from "./List";
import DialogWindow from "./Dialog";
import { addList, deleteList, deleteTask } from "../reducers/tasks/actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const Content = ({ list, deleteList, addList, deleteTask }) => {
  const [checked, setChecked] = useState([]);
  const [dialog, setDialog] = useState({ open: false, value: null });
  const [showTasks, setShowTasks] = useState(null);
  const classes = useStyles();

  const handleChecked = event => {
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
      if (!!showTasks) {
        list.map(item => {
          if (item.id === showTasks) {
            item.list.forEach(elem => newChecked.push(elem.id));
          }
          return item;
        });
      } else {
        list.forEach(item => newChecked.push(item.name));
      }
      setChecked(newChecked);
    } else if (value === "deselectAll") {
      setChecked([]);
    } else if (value === "deleteChecked") {
      setDialog({ open: true, value: checked });
    } else if (value === "newList") {
      setDialog({ open: true, value: value });
    }
  };

  const handleEdit = event => {
    const name = event.currentTarget.attributes.value.value;
    const findTasksList = list.find(item => item.name === name);
    if (!!findTasksList) {
      setChecked([]);
      setShowTasks(findTasksList.id);
    }
  };

  const handleDeleteList = event => {
    // console.log("You want to delete: ", event.currentTarget.value);
    setDialog({ open: true, value: event.currentTarget.value });
  };

  const handleCloseDialog = event => {
    const target = event.currentTarget.value;
    if (target === "agree") {
      if (!!showTasks) {
        const currentList = list.find(item => item.id === showTasks);
        let tasks = null;
        if (typeof dialog.value === "string") {
          tasks = currentList.list.filter(
            item => item.id !== Number(dialog.value)
          );
        } else {
          tasks = currentList.list.filter(
            item => !dialog.value.includes(item.id)
          );
        }
        console.log(tasks, dialog.value);
        deleteTask({ tasks, listId: showTasks });
      } else if (typeof dialog.value === "string") {
        const findItem = list.find(item => item.name === dialog.value);
        deleteList([findItem.id]);
      } else {
        const findItems = list
          .filter(item => dialog.value.includes(item.name))
          .map(item => item.id);
        deleteList(findItems);
      }
    }
    setDialog({ open: false, value: null });
  };

  //add new list
  const handleAddList = value => {
    if (typeof value === "string" && !!value) {
      const lastIndex = list[list.length - 1];

      const newListObject = {
        id: Number(lastIndex.id) + 1,
        name: value,
        list: [],
        date: setDate()
      };

      addList(newListObject);
    }

    setDialog({ open: false, value: null });
  };

  const setDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullDate =
      (day < 9 ? "0" + day : day) +
      "/" +
      (month < 9 ? "0" + month : month) +
      "/" +
      year;
    return fullDate;
  };

  const handleReturn = () => {
    checked.length && setChecked([]);
    setShowTasks(null);
  };

  const getTasksList = () => {
    const currentList = list.find(item => item.id === showTasks);

    if (currentList.list.length > 0) {
      return currentList.list;
    }

    return [];
  };

  return (
    <Grid container spacing={0} justify={"center"} alignItems={"center"}>
      <Grid item xs={11} md={10} lg={9} xl={7} className={classes.margin}>
        <Header
          handleSelect={handleSelect}
          tasks={!!showTasks}
          returnToList={handleReturn}
        />
        <List
          list={!!showTasks ? getTasksList() : list}
          handleEdit={handleEdit}
          handleChecked={handleChecked}
          handleDeleteList={handleDeleteList}
          checked={checked}
        />
      </Grid>
      <DialogWindow
        dialog={dialog}
        handleCloseDialog={handleCloseDialog}
        handleAddList={handleAddList}
        checked={checked}
      />
    </Grid>
  );
};

const mapStateToProps = ({ reducer: { list } }) => ({
  list
});

const mapDispatchToProps = {
  deleteList,
  addList,
  deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
