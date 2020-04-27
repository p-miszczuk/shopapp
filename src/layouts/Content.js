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
  list,
  listRequest,
  logout,
  updateTask
}) => {
  const [checked, setChecked] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    value: null
  });
  const [showTasks, setShowTasks] = useState(null);
  const [item, setItem] = useState(null);
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
            item.list.forEach(elem => newChecked.push(elem.id.toString()));
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
    const getTask = getTasksList().find(task => task.id === Number(id));

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
      if (!!showTasks) {
        const currentList = list.find(item => item.id === showTasks);
        let tasks = null;
        if (typeof dialog.value === "string") {
          tasks = currentList.list.filter(
            item => item.id !== Number(dialog.value)
          );
        } else {
          tasks = currentList.list.filter(
            item => !dialog.value.includes(item.id.toString())
          );
        }
        setChecked([]);
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

  const handleAddTasks = (task, info) => {
    if (!!task.trim() && task.length > 2) {
      const findList = list.find(item => item.id === showTasks);
      const tasks = findList.list;
      let id = null;
      if (tasks.length > 0) {
        const taskId = tasks[tasks.length - 1];
        id = taskId.id + 1;
      } else {
        id = 1;
      }
      const taskObject = {
        id,
        task,
        info
      };
      addTask({ idList: findList.id, task: taskObject });
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
    const taskInfo = getTasksList().find(
      task => task.id === Number(e.currentTarget.value)
    );

    setDialog({
      open: true,
      value: { info: "show_info", task: taskInfo.info }
    });
  };

  const getTasksList = () => {
    const currentList = list.find(item => item.id === showTasks);

    if (currentList.list.length > 0) {
      return currentList.list;
    }

    return [];
  };

  const handleEditItem = (input, info, id) => {
    updateTask({ input, info, id, listId: showTasks });
    setDialog({ open: false, value: null });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Grid container spacing={0} justify={"center"} alignItems={"center"}>
      <Grid item xs={11} md={10} lg={9} xl={7} className={classes.margin}>
        <Header
          handleSelect={handleSelect}
          addNewTask={handleAddNewTask}
          tasks={!!showTasks}
          returnToList={handleReturn}
          isTasks={!!showTasks}
        />
        <List
          list={!!showTasks ? getTasksList() : list}
          handleEdit={!!showTasks ? handeEditTask : handleEdit}
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
      {listRequest && <Spinner />}
    </Grid>
  );
};

const mapStateToProps = ({ tasksReducer: { list, listRequest } }) => ({
  list,
  listRequest
});

const mapDispatchToProps = {
  addList,
  addTask,
  deleteList,
  deleteTask,
  logout,
  updateTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
