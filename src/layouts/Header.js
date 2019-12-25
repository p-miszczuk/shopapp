import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

const Header = ({ handleSelect }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    setAnchorEl(null);
    handleSelect(value);
  };

  return (
    <div className={classes.headerMenu}>
      <div className={classes.title}>Shopping</div>
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
          {options.map(option => (
            <MenuItem key={option.key} onClick={() => handleClose(option.key)}>
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};
export default Header;
