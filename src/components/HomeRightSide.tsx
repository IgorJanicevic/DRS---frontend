import React from "react";

export const HomeRightSide = () => {
    return (
      <div className="right-side">
  
        <div className="ads">
          <h4 style={{marginTop:"0px"}}>Sponsored Ads</h4>
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
          <ul>
            <li>
              <img
                src="https://picsum.photos/id/27/367/267"
                alt="Friend 1"
                className="friend-avatar"
              />
              <span>John Doe</span>
            </li>
            <li>
              <img
                src="https://picsum.photos/id/64/367/267"
                alt="Friend 2"
                className="friend-avatar"
              />
              <span>Jane Smith</span>
            </li>
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
  