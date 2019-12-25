import React, { useState } from "react";
import { List, ListItem, Checkbox, ListItemText, Fab } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textEdit: {
    cursor: "pointer",
    marginRight: "15px"
  }
}));

const ListItems = ({
  list,
  handleChecked,
  handleEdit,
  handleDeleteList,
  checked
}) => {
  const classes = useStyles();
  return (
    <List>
      {list.map(item => (
        <ListItem key={item.name}>
          <Checkbox
            edge="start"
            value={item.name}
            onClick={handleChecked}
            checked={checked.indexOf(item.name) !== -1}
          />
          <ListItemText
            value={item.name}
            id={item.name}
            primary={`${item.name}`}
            secondary={`${item.date}`}
            className={classes.textEdit}
            onClick={handleEdit}
          />
          <Fab
            size={"small"}
            color={"secondary"}
            value={item.name}
            onClick={handleDeleteList}
          >
            <DeleteIcon />
          </Fab>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
