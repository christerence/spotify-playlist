import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const NavBarH = ({ paths }) => (
  <div className="nav-container h">
    {paths.map(val => {
      return (
        <Link className={`nav-item`} to={val.link}>
          {val.name}
        </Link>
      );
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

const NavBar = ({ paths, vertical }) => {
  
  return vertical ? <NavBarV paths={paths} /> : <NavBarH paths={paths} /> ;
};

export { NavBar };
