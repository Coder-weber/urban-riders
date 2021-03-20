import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Urban Riders.png";
const Header = () => {
  return (
    <div className="header">
      <nav className="nav">
        <ul>
            <li>
                 <img className="logo" src={logo} alt=""/>
            </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/destination">Destination</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
