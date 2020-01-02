import React from "react";
import { List, ListItem, Checkbox, ListItemText, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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
        <ListItem key={item.name || item.id}>
          <Checkbox
            edge="start"
            value={item.name || item.task}
            onClick={handleChecked}
            checked={checked.indexOf(item.name || item.task) !== -1}
          />
          <ListItemText
            value={item.name || item.task}
            id={item.name || item.id}
            primary={`${item.name || item.task}`}
            secondary={`${item.date || ""}`}
            className={classes.textEdit}
            onClick={handleEdit}
          />
          {!!item.task && (
            <Fab
              style={{ marginRight: "10px" }}
              size={"small"}
              color={"secondary"}
              value={item.id}
              // onClick={handleEditList}
            >
              <EditIcon />
            </Fab>
          )}
          <Fab
            size={"small"}
            color={"secondary"}
            value={item.name || item.id}
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
