import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  FormControl
} from "@material-ui/core";
import MainButton from "../components/buttons/MainButton";

const useStyles = makeStyles(theme => ({
  inputInfo: {
    marginTop: "10px",
    minHeight: "80px"
  }
}));

const DialogWindow = ({
  dialog,
  checked,
  handleCloseDialog,
  handleAddList,
  handleAddTasks,
  handleEditItem,
  item
}) => {
  const [input, setInput] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (item) {
      setInput(item.task);
      item.info && setInfo(item.info);
    }
  }, [item]);

  const handleClick = (item, id, e) => {
    item === "add_task"
      ? handleAddTasks(input, info)
      : item === "edit_task"
      ? handleEditItem(input, info, id)
      : item === "newList"
      ? handleAddList(input)
      : handleCloseDialog(e);
  };

  const setText = item => {
    return item === "add_task"
      ? "Add new task"
      : item.info === "show_info"
      ? "Additional info"
      : item === "newList"
      ? "Add new list"
      : dialog.value === "edit_task"
      ? "Edit task"
      : "Confirm window";
  };

  const classes = useStyles();
  const addTask = dialog.value === "add_task" ? true : false;
  const editItem = dialog.value === "edit_task" ? true : false;
  const showInfo = dialog.value.info === "show_info" ? true : false;
  const dialogValue = dialog.value;
  const itemId = item && item.id ? item.id : null;

  return (
    <Dialog open={true} onClose={handleCloseDialog}>
      <DialogTitle>{setText(dialog.value)}</DialogTitle>
      <FormControl>
        <DialogContent style={{ minWidth: "250px" }}>
          {dialog.value === "newList" || addTask || editItem ? (
            <>
              <Input
                fullWidth
                id={dialog.value}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={addTask ? "Task's name" : "List's name"}
              />
              {(addTask || dialog.value === "edit_task") && (
                <Input
                  className={classes.inputInfo}
                  fullWidth
                  id={"info"}
                  value={info}
                  onChange={e => setInfo(e.target.value)}
                  placeholder={"Add adding info"}
                />
              )}
            </>
          ) : (
            <DialogContentText>
              {showInfo
                ? dialog.value.task
                : `Do you want to delete ${
                    checked.length > 1 ? "items" : "item"
                  }?`}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <MainButton
            autoFocus
            onClick={handleCloseDialog}
            color={"primary"}
            text={showInfo ? "Close" : "Disagree"}
            value={"disagree"}
          />
          {!showInfo && (
            <MainButton
              autoFocus
              onClick={e => handleClick(dialogValue, itemId, e)}
              color={"primary"}
              text={addTask || editItem ? "Add" : "Agree"}
              value={"agree"}
            />
          )}
        </DialogActions>
      </FormControl>
    </Dialog>
  );
};

export default DialogWindow;
