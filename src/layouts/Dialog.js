import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input
} from "@material-ui/core";
import MainButton from "../components/buttons/MainButton";

const DialogWindow = ({
  dialog,
  checked,
  handleCloseDialog,
  handleAddList
}) => {
  const [input, setInput] = useState("");
  return (
    <Dialog open={dialog.open} onClose={handleCloseDialog}>
      <DialogTitle>
        {dialog.value === "newList" ? "Add new list" : "Confirm window"}
      </DialogTitle>
      <DialogContent style={{ minWidth: "250px" }}>
        {dialog.value === "newList" ? (
          <Input
            fullWidth
            id={dialog.value}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={"List's name"}
          />
        ) : (
          <DialogContentText>
            Do you want to delete {checked.length > 1 ? "items" : "item"}?
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <MainButton
          autoFocus
          onClick={
            dialog.value === "newList" ? handleAddList : handleCloseDialog
          }
          color={"primary"}
          text={"Disagree"}
          value={"disagree"}
        />
        <MainButton
          autoFocus
          onClick={e =>
            dialog.value === "newList"
              ? handleAddList(input)
              : handleCloseDialog(e)
          }
          color={"primary"}
          text={"Agree"}
          value={"agree"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
