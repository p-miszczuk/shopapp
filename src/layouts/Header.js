import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

const options = [
  { name: "New list", key: "newList" },
  { name: "Delete checked", key: "deleteChecked" },
  { name: "Select all", key: "selectAll" },
  { name: "Deselect all", key: "deselectAll" },
  { name: "Log out", key: "logOut" }
];

const useStyles = makeStyles(theme => ({
  headerMenu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid black"
  },
  title: {
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontSize: "18px"
  }
}));

const Header = ({ isTasks, handleSelect, addNewTask, returnToList, valuesLength }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    setAnchorEl(null);
    typeof value === "string" && handleSelect(value);
  };

  const setDisabled = option => {
    if ((option === options[1].key || option === options[3].key) && valuesLength[0] === 0) {
      return true;
    } else if (option === options[2].key && valuesLength[0] === valuesLength[1]) {
      return true;
    }
    return;
  }

  return (
    <div className={classes.headerMenu}>
      {isTasks && (
        <div>
          <Fab
            size={"small"}
            color={"primary"}
            onClick={returnToList}
            style={{ marginRight: "15px" }}
          >
            <ArrowBackIcon />
          </Fab>
          <Fab size={"small"} color={"secondary"} onClick={addNewTask}>
            <AddIcon />
          </Fab>
        </div>
      )}
      <div className={classes.title}>{isTasks ? "Tasks" : "Shopping"}</div>
      <div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map(option => {
            if (option.key === "newList" && isTasks) return null;
            return (
              <MenuItem
                key={option.key}
                onClick={() => handleClose(option.key)}
                disabled={setDisabled(option.key)}
              >
                {option.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};
export default Header;
