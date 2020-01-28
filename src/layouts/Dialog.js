import React, { useState } from "react";
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
  handleAddTasks
}) => {
  const [input, setInput] = useState("");
  const [info, setInfo] = useState("");

  const classes = useStyles();
  const addTask = dialog.value === "add_task" ? true : false;
  const showInfo = dialog.value.info === "show_info" ? true : false;

  return (
    <Dialog open={dialog.open} onClose={handleCloseDialog}>
      <DialogTitle>
        {addTask
          ? "Add new task"
          : showInfo
          ? "Additional info"
          : dialog.value === "newList"
          ? "Add new list"
          : "Confirm window"}
      </DialogTitle>
      <FormControl>
        <DialogContent style={{ minWidth: "250px" }}>
          {dialog.value === "newList" || addTask ? (
            <>
              <Input
                fullWidth
                id={dialog.value}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={addTask ? "Task's name" : "List's name"}
              />
              {addTask && (
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
              onClick={e =>
                addTask
                  ? handleAddTasks(input, info)
                  : dialog.value === "newList"
                  ? handleAddList(input)
                  : handleCloseDialog(e)
              }
              color={"primary"}
              text={addTask ? "Add" : "Agree"}
              value={"agree"}
            />
          )}
        </DialogActions>
      </FormControl>
    </Dialog>
  );
};

export default DialogWindow;
