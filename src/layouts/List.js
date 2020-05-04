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
  list = [],
  handleChecked,
  handleEdit,
  handleShowInfo,
  handleDeleteList,
  checked
}) => {
  const classes = useStyles();

  const getDate = values => {
    if (values && !values.seconds) {
      return "";
    }
    const date = new Date(values.seconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <List>
      {list.map((item, index) => {
        return (
          <ListItem key={index}>
            <Checkbox
              edge="start"
              value={item.id}
              onClick={handleChecked}
              checked={checked.indexOf(item.id.toString()) !== -1}
            />
            <ListItemText
              value={item.name || item.task}
              id={item.name || item.id}
              primary={`${item.name || item.task}`}
              secondary={getDate(item.date)}
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
              value={item.id}
              onClick={handleDeleteList}
            >
              <DeleteIcon />
            </Fab>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListItems;
