// AdminHomePage.tsx
import { useState, useEffect } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import { AdminProfilePage } from "./AdminProfilePage";
import { AdminBlockedUserPage } from "./AdminBlockedUserPage";
import { AdminPostPage } from "./AdminPostsPage";
import { AdminCreateUserPage } from "./AdminCreateUserPage";

export const AdminHomePage = () => {
  const [selectedPage, setSelectedPage] = useState<string>("");



  const renderContent = () => {
    switch (selectedPage) {
      case "Register":
        return <AdminCreateUserPage />;
      // case "Profile":
      //   return <AdminProfilePage />;
      case "User":
        return <AdminBlockedUserPage />;
      case "Posts":
        return <AdminPostPage/>;
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
