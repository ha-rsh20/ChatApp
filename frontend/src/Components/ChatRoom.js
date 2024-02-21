import React, { useEffect, useState } from "react";
import { useSocket } from "../Context/SocketProvider";
import "./message.css";
import axios from "axios";
import {
  Button,
  CssBaseline,
  Input,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useSelector } from "react-redux";

function ChatRoom(props) {
  const [rid, setRId] = useState(0);
  const [sendA, setSendA] = useState(rid === 0 ? true : false);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [theme, setTheme] = useState(useSelector((state) => state.users.mode));
  const [uid, setUId] = useState(sessionStorage.getItem("uid"));
  const socket = useSocket();

  const darkButtonStyle = {
    background: "white",
    color: "black",
  };
  const lightButtonStyle = {
    background: "black",
    color: "white",
  };

  const handleOnClickContact = (id) => {
    socket.emit("getContactMessages", id);
  };

  const getContact = () => {
    axios
      .get("http://localhost:4000/user/getContact/" + uid)
      .then((data) => {
        setContacts(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getMessage = () => {
    axios
      .get("http://localhost:4000/user/getMessage/" + uid)
      .then((data) => {
        setMessages(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getContactMessage = (rid) => {
    setRId(rid);
    setSendA(false);
    axios
      .get("http://localhost:4000/user/getContactMessage/" + uid + "/" + rid)
      .then((data) => {
        setMessages(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newMessage = (msg, serverOffset) => {
    // const item = document.createElement("message");
    // item.textContent = msg;
    // const messages = document.getElementById("messages");
    // messages.appendChild(item);
    // messages.scrollTo(0, document.body.scrollHeight);
    // window.scrollTo(0, document.body.scrollHeight);
    console.log(messages);
    // setMessages(
    //   messages.push({
    //     mid: messages[messages.length - 1].mid + 1,
    //     message: msg,
    //   })
    // );
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
    console.log(sendA);
    setUId(sessionStorage.getItem("uid"));
    getContact();
    socket.on("new-message", newMessage);
    //socket.on("u-contacts", getContact);

    return () => {
      socket.off("new-message", newMessage);
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
            <div key={item.mid}>{<message>{item.message}</message>}</div>
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
