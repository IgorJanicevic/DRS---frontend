import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../assets/SearchedUsers.css";
import { Navbar } from "../components/Navbar";
import { HomeLeftSide } from "../components/HomeLeftSide";
import { HomeRightSide } from "../components/HomeRightSide";
import { BACKEND_URL } from "../services/serviceUtils";
import { Loader } from "../components/Loader";
import { UserCard } from "../components/UserCard";

export const SearchedUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const NavigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const query = searchParams.get("query");
      if (!query) {
        setError("No query provided.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/user/search?query=${query}`);
        if (!response.ok) {
          const errorMessage = await response.json();
          setError(errorMessage.message || "Error fetching search results.");
          setUsers([]);
          return;
        }

        const data = await response.json();
        setUsers(data);
        setError("");
      } catch (err) {
        setError("An error occurred while fetching search results.");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]);

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-layout">
        <div className="left-side">
          <HomeLeftSide />
        </div>
        <div className="main-content">
          <h1 style={{ marginLeft: '34%' }}>Search Results</h1>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            isLoading ? (
              <Loader />
            ) : (
              <div className="user-cards-container">
                {users.map((user: any) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onClick={() => NavigateToProfile(user._id)}
                    showUnblockButton={false}
                  />
                ))}
              </div>
            )
          )}
        </div>
        <div className="right-side">
          <HomeRightSide />
        </div>
      </div>
    </div>
  );
};
