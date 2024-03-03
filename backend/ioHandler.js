const { Server } = require("socket.io");
const message = require("./Schemas/messageSchema");
const { postMessage } = require("./Controllers/messagePost");
const { getContacts } = require("./Controllers/getContacts");

const Handler = async (server) => {
  const idToSocket = new Map();

  const io = new Server(server, {
    cors: true,
    connectionStateRecovery: {},
  });

  io.on("connection", async (socket) => {
    console.log("socket connected!");

    socket.on("con-id", (socketId, userId) => {
      idToSocket.set(userId, socket.id);
      console.log(idToSocket);
    });

    socket.on("new-message", async (msg, sid, rid) => {
      let newMessage = await postMessage(msg, sid, rid);
      const senderSocketId = idToSocket.get(sid);
      let receiverSocketId;
      idToSocket.forEach((val, key) => {
        if (key == rid) {
          receiverSocketId = val;
          return;
        }
      });

      io.to(senderSocketId).emit("new-message", newMessage, newMessage.mid);
      io.to(receiverSocketId).emit(
        "new-message-from-receiver",
        newMessage,
        newMessage.mid,
        sid
      );
    });

    socket.on("get-contacts", async (uid) => {
      console.log("fetching contacts!");
      let contact = await getContacts(uid);
      console.log(contact);
      socket.emit("u-contacts", contact);
    });

    socket.on("getContactMessages", (id) => {
      console.log("Fetching messages of receiver id:" + id);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // if (!socket.recovered) {
    //   console.log("chat recovery");
    //   let dbData;
    //   try {
    //     await message
    //       .find({
    //         mid: {
    //           $gt: socket.handshake.auth.serverOffset || 0,
    //         },
    //         sid: socket.handshake.auth.id,
    //       })
    //       .then((data) => {
    //         dbData = data;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     if (dbData) {
    //       for (let i = 0; i < dbData.length; i++) {
    //         socket.emit("new-message", dbData[i].message, dbData[i].mid);
    //       }
    //     }
    //   } catch (e) {}
    // }
  });
};

module.exports = { Handler };
