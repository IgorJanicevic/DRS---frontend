// AdminHomePage.tsx
import { useState, useEffect } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { AdminProfilePage } from "./AdminProfilePage";
import { AdminBlockedUserPage } from "./AdminBlockedUserPage";
import { AdminPostPage } from "./AdminPostsPage";
import { CreateUserPage } from "./CreateUserPage";
import { AdminCreateUserPage } from "./AdminCreateUserPage";
import { io, Socket } from "socket.io-client";
import { DecodeToken } from "../components/ProtectRoutes";

export const AdminHomePage = () => {
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [adminSocket, setAdminSocket] = useState<Socket | null>(null);
  const decoded = DecodeToken();

  const socket = io("http://127.0.0.1:5000", {
    transports: ["polling", "websocket"],
    query: { user_id: decoded?.sub, role: decoded?.role } 
  });


  useEffect(() => {

    setAdminSocket(socket);

     return () => {
       console.log("Disconnecting socket from AdminHomePage...");
       socket.disconnect();
     };
  }, []);

  const renderContent = () => {
    switch (selectedPage) {
      case "Register":
        return <AdminCreateUserPage />;
      case "Profile":
        return <AdminProfilePage />;
      case "User":
        return <AdminBlockedUserPage />;
      case "Posts":
        return <AdminPostPage socket={adminSocket} />;
      case "Blocked":
        return <AdminBlockedUserPage />;
      default:
        return <AdminCreateUserPage />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div style={{ width: "250px" }}>
        <AdminNavbar onSelect={(page) => setSelectedPage(page)} />
      </div>
      <div
        style={{
          flex: "1",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
