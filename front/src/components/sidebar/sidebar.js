import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const SideBar = ({ user, logout }) => (
  <div className="user-details">
    <span
      className="user-info"
      style={{ background: `url(${user.data.profilePhoto}) center` }}
    >
      <div className="user-name">{user.data.spotID}</div>
    </span>
    <div className="user-choices">
      <Link to="/" className="user-choice">
        Dashboard
      </Link>
      <Link to="/create" className="user-choice">
        Create
      </Link>
      <Link to="/playlists" className="user-choice">
        Playlists
      </Link>
      <div className="user-choice">
        Coming Soon
      </div>
      <div className="user-choice"onClick={logout}>Sign Out</div>
    </div>
  </div>
);

export { SideBar };
