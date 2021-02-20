import { Avatar } from '@material-ui/core'
import React from 'react'

function SideBar_Room(props) {
    return (
        <div className="sidebar__conversations">
        <Avatar alt={props.messageRoomName} src="">
            {" "}
            {props.messageRoomName[0].toUpperCase()}{" "}
        </Avatar>
        <div className="sidebar__conversations_info">
        <h2> {props.messageRoomName} </h2>
        <span className="sidebar__last_message"> {"this is the last message..."} </span>
        <br/>
        <span className="viewed-message"> {"vu"} </span>
        </div>
      </div>
    )
}

export default SideBar_Room
