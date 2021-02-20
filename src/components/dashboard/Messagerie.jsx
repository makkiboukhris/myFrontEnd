import React, { useState } from 'react'
import MessageMain from './messageMain'
import SideBar from './sideBar'

function Messagerie(props) {
    const [messageRoomName, setMessageRoomName] = useState("messageRoomName");
    const [roomData, setRoomData] = useState(null)
    return (
        <>
        <SideBar userName={props.userName} messageRoomName={"messageRoomName"} setRoomData={setRoomData}  />
        {
            roomData?
        <MessageMain messageRoomName={roomData.messageRoomName} noData={false} />  :  
        <MessageMain noData={true} />

        }

        </>
    )
}

export default Messagerie
