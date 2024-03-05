import React, { useEffect, useState } from "react";
import { useSocket } from "../Context/SocketProvider";
import "./message.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateMessage } from "../state/slice/messageSlice";
import { updateUserReceiver } from "../state/slice/userSlice";

function ChatRoom(props) {
  const [rid, setRId] = useState("0");
  const [sendA, setSendA] = useState(rid === 0 ? true : false);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [uid, setUId] = useState(sessionStorage.getItem("uid"));
  const dispatch = useDispatch();
  const socket = useSocket();

  const getContact = () => {
    axios
      .get("http://localhost:4000/user/getContact/" + uid)
      .then((data) => {
        setContacts(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getContactMessage = (receiverid) => {
    setRId(receiverid);
    dispatch(updateUserReceiver(receiverid));
    sessionStorage.setItem("rid", receiverid);
    setSendA(false);
    axios
      .get(
        "http://localhost:4000/user/getContactMessage/" + uid + "/" + receiverid
      )
      .then((data) => {
        setMessages(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to pop message in sender side
  const NewMessage = (newMessage, serverOffset) => {
    setMessages((msgs) => [...msgs, newMessage]);

    socket.auth.id = uid;
    socket.auth.serverOffset = serverOffset;
  };

  //to block another live message from popping in another chat
  const NewMessageFrom = (newMessage, serverOffset, nid) => {
    console.log("new message");
    let zid = sessionStorage.getItem("rid");
    setRId((id) => (zid = id));
    if (nid == zid) {
      setMessages((msgs) => [...msgs, newMessage]);
    }

    socket.auth.id = uid;
    socket.auth.serverOffset = serverOffset;
  };

  const sendNewMessage = (e) => {
    e.preventDefault();
    const msg = document.getElementById("messageBox");
    socket.emit("new-message", msg.value, uid, rid);
    msg.value = "";
  };

  useEffect(() => {
    const messagesBlock = document.getElementById("messages");
    messagesBlock.scrollTo(0, messagesBlock.scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.emit("con-id", socket.id, uid);
    setUId(sessionStorage.getItem("uid"));
    getContact();
    socket.on("new-message", NewMessage);
    socket.on("new-message-from-receiver", NewMessageFrom);

    return () => {
      socket.off("new-message", NewMessage);
      socket.off("new-message-from-receiver", NewMessageFrom);
    };
  }, []);
  return (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          id="contacts"
          style={{
            width: "30%",
            height: "600px",
            overflow: "auto",
            backgroundColor: "#a4a4a4",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          contacts
          {contacts.map((item) => (
            <div
              key={item.id}
              style={{ width: "100%" }}
              onClick={() => {
                getContactMessage(item.id);
              }}
            >
              <contact>{item.firstname}</contact>
            </div>
          ))}
        </div>
        <div
          id="messages"
          style={{
            padding: 5,
            width: "100%",
            height: "600px",
            overflow: "auto",
            backgroundColor: "#888888",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          Messages
          {messages.map((item) => (
            <div key={item.mid} style={{ width: "100%" }}>
              <div
                style={
                  item.sid == uid
                    ? { display: "flex", flexWrap: "wrap", float: "right" }
                    : { display: "flex", flexWrap: "wrap" }
                }
              >
                <message>{item.message}</message>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form>
        <div
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            position: "fixed",
            height: "55px",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <TextField
            variant="outlined"
            type="text"
            id="messageBox"
            autoComplete="off"
            style={{
              marginRight: 10,
              width: "100%",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={sendNewMessage}
            disabled={sendA}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoom;
