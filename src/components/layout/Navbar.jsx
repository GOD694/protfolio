import React, { useState } from "react";
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { useAuth } from "../store/auth";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedin } = useAuth();

  return (
    <div className="nav-wrapper">
      <nav className="navbar">

        {/* Logo */}
        <div className="logo"> ARSLAN</div>

        {/* Center Links */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><NavLink className={(e) => {
            return [e.isActive ? "bg-red-500" : "", "px-2 py-1 rounded"].join(" ")
          }} onClick={() => setMenuOpen(false)} to="/">Home</NavLink></li>
          <li><NavLink className={(e) => {
            return [e.isActive ? "bg-red-500" : "", "px-2 py-1 rounded"].join(" ")

          }} onClick={() => setMenuOpen(false)} to="/about">About</NavLink></li>
          <li> <NavLink className={(e) => {
            return [e.isActive ? "bg-red-500" : "", "px-2 py-1 rounded"].join(" ")

          }} onClick={() => setMenuOpen(false)} to="/project">Projects</NavLink></li>
          <li> <NavLink className={(e) => {
            return [e.isActive ? "bg-red-500" : "", "px-2 py-1 rounded"].join(" ")

          }} onClick={() => setMenuOpen(false)} to="/services">Services</NavLink></li>

          {/* Mobile Auth Buttons */}
          <div className="mobile-auth">
            {isLoggedin ?
              <NavLink className="logout-btn" onClick={() => setMenuOpen(false)} to="/logout">logout</NavLink> :
              (<> <NavLink className="login-btn" onClick={() => setMenuOpen(false)} to="/login">Login</NavLink>
                <NavLink className="register-btn" onClick={() => setMenuOpen(false)} to="/register">Register</NavLink></>)}
          </div>
        </ul>

        {/* Right Auth Buttons (Desktop) */}
        <div className="auth-buttons">
          {isLoggedin ?
            <NavLink className="logout-btn" onClick={() => setMenuOpen(false)} to="/logout">logout</NavLink> :
            (<> <NavLink className="login-btn" onClick={() => setMenuOpen(false)} to="/login">Login</NavLink>
              <NavLink className="register-btn" onClick={() => setMenuOpen(false)} to="/register">Register</NavLink></>)}
        </div>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </nav>
    </div>
  );
};

export default Navbar;