import React from "react";
import { List, ListItem, Checkbox, ListItemText, Fab } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
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
  handleShowInfo,
  handleDeleteList,
  checked
}) => {
  const classes = useStyles();

  return (
    <List>
      {list.map((item, index) => (
        <ListItem key={index}>
          <Checkbox
            edge="start"
            value={item.name || item.id}
            onClick={handleChecked}
            checked={checked.indexOf(item.name || item.id.toString()) !== -1}
          />
          <ListItemText
            value={item.name || item.task}
            id={item.name || item.id}
            primary={`${item.name || item.task}`}
            secondary={`${item.date || ""}`}
            className={classes.textEdit}
            onClick={handleEdit}
          />
          {!!item.task && item.info && (
            <Fab
              style={{ marginRight: "10px" }}
              size={"small"}
              color={"secondary"}
              value={item.id}
              onClick={handleShowInfo}
            >
              <InfoIcon />
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
