import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css"
import "bootstrap/dist/css/bootstrap.min.css";







class NavBar extends Component {
  clearSession = () => {
    sessionStorage.clear()
  }
  render() {
    return (
      <div className="navBar">
      <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/issues">
              Problems
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              New Issue
            </Link>
          </li>
          <li>
            <Link className="nav-link" onClick={this.clearSession} to="/">
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    );
  }
}

export default NavBar;
