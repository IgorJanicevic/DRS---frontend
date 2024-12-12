import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DecodeToken } from "./components/ProtectRoutes";


interface SocketContextProps {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    const decode = DecodeToken();
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      query: { user_id: decode?.sub, role: decode?.role },
    });
    setSocket(newSocket);
    console.log('Uspesno ste se povezali: ',socket?.id);
  };

  const disconnectSocket = () => {
    socket?.disconnect();
    setSocket(null);
    console.log('Uspesno ste se odjavili: ',socket?.id);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socket?.on(event, callback);
    console.log('Soket slusa: ',socket?.id);

  };

  const off = (event: string, callback: (...args: any[]) => void) => {
    socket?.off(event, callback);
    console.log('Soket gasi: ',socket?.id);

  };

  

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket, on, off }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
