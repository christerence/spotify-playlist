import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const NavBarH = ({ paths, logout }) => (
  <div className="nav-container h">
    {paths.map((val,key) => {
      if (!val.logout) {
        return (
          <Link key={key} className={`nav-item`} to={val.link}>
            {val.name}
          </Link>
        );
      } else {
        return (
          <div key={key} className={`nav-item`} onClick={logout}>
            {val.name}
          </div>
        );
      }
      
    })}
  </div>
);

const NavBarV = ({ paths }) => (
  <div className="nav-container v">
    {paths.map((val, key) => {
      return (
        <Link key={key} className={`nav-item`} to={val.link}>
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
