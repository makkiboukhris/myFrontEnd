import { Avatar, Badge, ClickAwayListener } from "@material-ui/core";
import React, { useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import SideBar_Room from "./sideBar_Room";

function SideBar(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <div className="sideBar">
      <div className="sidebar__header">
        <div>
          <Avatar alt={props.userName} src="">
            {" "}
            {props.userName[0].toUpperCase()}{" "}
          </Avatar>
        </div>
        <div>
          <Badge color="secondary" badgeContent={0} showZero>
            <NotificationsIcon style={{ fontSize: "2vw", color: "grey" }} />
          </Badge>
        </div>
      </div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="search_container">
          <div className="sidebar__search">
            <SearchIcon
              style={{ fontSize: "1.8vw", color: "grey", paddingLeft: "5%" }}
            />
            <input
              onClick={handleClick}
              type="text"
              placeholder="chercher ou commencer une conversation"
            />
          </div>
          {open?(
            <div className="sidebar__search_collapse">
              <h1>haha</h1>
            </div>
          ): null}
        </div>
      </ClickAwayListener>
      <div className="sidebar__rooms">
        <div
          onClick={() => {
            props.setRoomData({ messageRoomName: props.messageRoomName });
          }}
        >
          <SideBar_Room messageRoomName={props.messageRoomName} />
        </div>
        <SideBar_Room messageRoomName={props.messageRoomName} />
      </div>
    </div>
  );
}

export default SideBar;
