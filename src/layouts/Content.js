import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import List from "./List";
import DialogWindow from "./Dialog";
import Spinner from "../components/Spinner";
import {
  addList,
  addTask,
  deleteList,
  deleteTask,
  updateTask
} from "../reducers/tasks/actions";
import { logout } from "../reducers/auth/actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const Content = ({
  addList,
  addTask,
  deleteList,
  deleteTask,
  list = [],
  request,
  logout,
  updateTask,
  userId = 0
}) => {
  const [checked, setChecked] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    value: null
  });
  const [showTasks, setShowTasks] = useState(null);
  const [item, setItem] = useState(null);
  const classes = useStyles();

  useFirestoreConnect(() =>
    showTasks
      ? [
          {
            collection: "tasks",
            doc: userId,
            subcollections: [
              {
                collection: "tasks",
                where: [["listId", "==", showTasks]],
                orderBy: ["date", "desc"]
              }
            ],
            storeAs: "list"
          }
        ]
      : [
          {
            collection: "tasks",
            doc: userId,
            subcollections: [{ collection: "list" }],
            orderBy: ["date", "desc"],
            storeAs: "list"
          }
        ]
  );

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
      const newChecked = list.map(item => item.id);
      setChecked(newChecked);
    } else if (value === "deselectAll") {
      setChecked([]);
    } else if (value === "deleteChecked") {
      setDialog({ open: true, value: checked });
    } else if (value === "newList") {
      setDialog({ open: true, value: value });
    } else if (value === "logOut") {
      handleLogout();
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

  const handeEditTask = e => {
    const id = e.currentTarget.id;
    const getTask = list.find(task => task.id === id);
    setItem(getTask);
    setDialog({ open: true, value: "edit_task" });
  };

  const handleDeleteList = event => {
    // console.log("You want to delete: ", event.currentTarget.value);
    setDialog({ open: true, value: event.currentTarget.value });
  };

  const handleCloseDialog = event => {
    const target = event.currentTarget.value;
    if (target === "agree") {
      if (showTasks) {
        const value =
          typeof dialog.value === "string" ? [dialog.value] : dialog.value;
        deleteTask(value);
      } else if (typeof dialog.value === "string") {
        deleteList([dialog.value]);
      } else {
        deleteList(dialog.value);
      }
    }
    setChecked([]);
    setDialog({ open: false, value: null });
  };

  const handleAddTasks = (task, info) => {
    if (!!task.trim() && task.length > 2) {
      const taskObject = {
        listId: showTasks,
        task,
        info
      };
      addTask(taskObject);
    } else {
      alert("too short task's name");
      return;
    }
    setDialog({ open: false, value: null });
  };

  //add new list
  const handleAddList = value => {
    if (value.trim()) {
      addList(value);
    }

    setDialog({ open: false, value: null });
  };

  const handleReturn = () => {
    checked.length && setChecked([]);
    setShowTasks(null);
  };

  const handleAddNewTask = () => {
    setDialog({ open: true, value: "add_task" });
  };

  const handleShowInfo = e => {
    const taskInfo = list.find(task => task.id === e.currentTarget.value);

    taskInfo &&
      setDialog({
        open: true,
        value: { info: "show_info", task: taskInfo.info }
      });
  };

  const handleEditItem = (input, info, id) => {
    updateTask({ input, info, id });
    setDialog({ open: false, value: null });
  };

  const handleLogout = () => logout();

  return (
    <Grid container spacing={0} justify={"center"} alignItems={"center"}>
      <Grid item xs={11} md={10} lg={9} xl={7} className={classes.margin}>
        <Header
          handleSelect={handleSelect}
          addNewTask={handleAddNewTask}
          tasks={showTasks}
          returnToList={handleReturn}
          isTasks={showTasks}
        />
        <List
          list={list}
          handleEdit={showTasks ? handeEditTask : handleEdit}
          handleShowInfo={handleShowInfo}
          handleChecked={handleChecked}
          handleDeleteList={handleDeleteList}
          checked={checked}
        />
      </Grid>
      {dialog.open && (
        <DialogWindow
          dialog={dialog}
          handleCloseDialog={handleCloseDialog}
          handleAddList={handleAddList}
          handleAddTasks={handleAddTasks}
          handleEditItem={handleEditItem}
          checked={checked}
          item={item}
        />
      )}
      {request && <Spinner />}
    </Grid>
  );
};

const mapStateToProps = ({
  tasksReducer: { listRequest, tasksRequest },
  firestore: { ordered },
  firebase: { auth }
}) => {
  return {
    list: ordered.list,
    request: listRequest || tasksRequest,
    userId: auth.uid
  };
};

const mapDispatchToProps = {
  addList,
  addTask,
  deleteList,
  deleteTask,
  logout,
  updateTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
