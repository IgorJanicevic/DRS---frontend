import React, { useState, useEffect } from "react";
import { UserProfile } from "../models/userModel";
import { DecodeToken } from "./ProtectRoutes";
import { getSuggestedFriends } from "../services/friendshipService";
import { get } from "http";
import { getUserByUsername } from "../services/authService";

export const HomeRightSide = () => {
    const [suggestedFriends, setSuggestedFriends] = useState<UserProfile[]>([]);
    const decoded = DecodeToken();

    const getSuggestedFriend = async () => {
        if (decoded?.sub) {
            try {
                const friends = await getSuggestedFriends(decoded?.sub);
                setSuggestedFriends(friends);
            } catch (error) {
                console.error("Error fetching suggested friends:", error);
            }
        }
    };

    const onSuggestedFriend = async (username:string) => {
        var friend = await getUserByUsername(username);
        console.log("Friend:", friend);

        if (friend) {
            window.location.href = `/profile/${friend._id}`;
        } else {
            console.error("Friend not found");
        }
    };

    useEffect(() => {
        getSuggestedFriend();
    }, []);

    return (
        <div className="right-side">

            <div className="ads">
                <h4 style={{ marginTop: "0px" }}>Sponsored Ads</h4>
                <div className="ad-card">
                    <img
                        src="https://picsum.photos/id/26/367/267"
                        alt="Ad 1"
                        className="ad-image"
                    />
                    <p>Check out our latest product!</p>
                </div>
                <div className="ad-card">
                    <img
                        src="https://picsum.photos/id/21/3008/2008"
                        alt="Ad 2"
                        className="ad-image"
                    />
                    <p>Discover amazing deals today!</p>
                </div>
            </div>

            <hr className="divider" />

            <div className="suggested-friends">
                <h4>Suggested Friends</h4>
                <ul className="suggested-friends-list">
                    {suggestedFriends.map((friend) => (
                        <li key={friend.username} onClick={() =>onSuggestedFriend(friend.username)} className="suggested-friend-item">
                            <img
                                src={friend.profile_img || "https://via.placeholder.com/150"}
                                alt={friend.username}
                                className="friend-avatar"
                            />
                            <span>{friend.first_name}</span>
                        </li>
                    ))}
                </ul>
            </div>


            <hr className="divider" />

            <div className="widgets">
                <h4>Widgets</h4>
                <ul>
                    <li><a href="https://www.accuweather.com/">Weather Widget</a></li>
                    <li><a href="https://calendar.google.com/calendar/u/0/r">Calendar Widget</a></li>
                </ul>
            </div>

        </div>
    );
};
