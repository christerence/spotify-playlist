import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const NavBarH = ({ paths, logout }) => (
  <div className="nav-container h">
    {paths.map(val => {
      if (!val.logout) {
        return (
          <Link className={`nav-item`} to={val.link}>
            {val.name}
          </Link>
        );
      } else {
        return (
          <div className={`nav-item`} onClick={logout}>
            {val.name}
          </div>
        );
      }
      
    })}
  </div>
);

const NavBarV = ({ paths }) => (
  <div className="nav-container v">
    {paths.map(val => {
      return (
        <Link className={`nav-item`} to={val.link}>
          {val.name}
        </Link>
      );
    })}
  </div>
);

const NavBar = ({ paths, vertical, logout }) => {
  return vertical ? <NavBarV paths={paths} /> : <NavBarH paths={paths} logout={logout} /> ;
};

export { NavBar };
