import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import history from "../../history";

const SideBar = ({ user, logout }) => {
  const location = history.location.pathname;
  return (
    <div className="user-details">
      <div className="user-info">
        <div className="user-name">{`Hello, ${user.data.spotID}`}</div>
      </div>
      <div className="user-choices">
        <Link to="/" className="user-choice" style={{color: location === "/" ? 'rgb(45, 185, 76)' : ''}}>
          Dashboard
        </Link>
        <Link to="/create" className="user-choice" style={{color: location === "/create" ? 'rgb(45, 185, 76)' : ''}}>
          Create
        </Link>
        <Link to="/playlists" className="user-choice" style={{color: location === "/playlists" ? 'rgb(45, 185, 76)' : ''}}>
          Playlists
        </Link>
        <div className="user-choice">Coming Soon</div>
        <div className="user-choice" onClick={logout}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export { SideBar };
