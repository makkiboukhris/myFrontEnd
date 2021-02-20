import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";



function MessageMain(props) {


  const [writtenMessage, setWrittenMessage] = useState("")
  const sendMessage =(e)=>{
    e.preventDefault();
    console.log('writtenMessage', writtenMessage)
    setWrittenMessage("")
  }



  return (
    <div>
      {props.noData ? (
        <div className="no__Data">
          <span>commencer une conversation</span>
        </div>
      ) : (
        <div className="main__conversations">
          <div className="messageMain-Header">
            <Avatar alt={props.messageRoomName} src="">
              {" "}
              {props.messageRoomName[0].toUpperCase()}{" "}
            </Avatar>
            <div className="main__conversations_info">
              <h2> {props.messageRoomName} </h2>
              <span className="viewed-message">vu</span>
            </div>
          </div>
          <div className="chat__body">
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message chat__reciever">
              {" "}
              <span className="chat__name">Makki</span> hello{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
            <p className="chat__message ">
              {" "}
              <span className="chat__name">Makki</span> heluvulhv luhvluiyvliu
              vhhvmhvuyvuyvljhvluy hvluhvbluhvluhvluhjvluhv
              luyvluihyvluyvluhvluyhvluyhvllo{" "}
              <span className="chat__timestamp">10:30</span>
            </p>
          </div>
          <div className="main__textInput">
            <IconButton aria-label="delete">
              <EmojiEmotionsIcon />
            </IconButton>
            <form action="">
              <input value={writtenMessage} type="text" placeholder="écrire un message ici" onChange={(e)=>setWrittenMessage(e.target.value)} />
              <IconButton type="submit" color="primary" onClick={sendMessage} >
                <SendIcon color="primary" />
              </IconButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageMain;
