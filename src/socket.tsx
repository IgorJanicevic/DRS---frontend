 import { io } from "socket.io-client";
 import { DecodeToken } from "./components/ProtectRoutes";

 const decoded = DecodeToken();


 export const socket = io("http://localhost:5000", {
     transports: ["websocket"],
     query: {user_id: decoded?.sub, role: decoded?.role},
   });
