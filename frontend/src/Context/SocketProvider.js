import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

function SocketProvider(props) {
  const [id, setId] = useState(sessionStorage.getItem("uid"));

  useEffect(() => {
    setId(sessionStorage.getItem("uid"));
  });

  const socket = useMemo(
    () => io("http://localhost:4000", { auth: { serverOffset: 0, id: id } }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
