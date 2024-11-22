import { useState } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { AdminProfilePage } from "./AdminProfilePage";
import { AdminBlockedUserPage } from "./AdminBlockedUserPage";
import { AdminPostPage } from "./AdminPostsPage";


export const AdminHomePage = () => {
  const [selectedPage, setSelectedPage] = useState<string>("");

  const renderContent = () => {
    switch (selectedPage) {
      case "Profile":
        return <AdminProfilePage />;
      case "User":
        return <AdminBlockedUserPage />;
      case "Posts":
        return <AdminPostPage/>;
      case "Blocked":
        return <AdminBlockedUserPage/>
      default:
        return <AdminPostPage/>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
