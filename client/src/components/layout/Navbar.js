import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Navbar({ logout, auth: { isAuthenticate, loadding } }) {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers </Link>
      </li>
      <li>
        <Link to="/posts">Posts </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guessLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers </Link>
      </li>
      <li>
        <Link to="/register">Register </Link>
      </li>
      <li>
        <Link to="/login"> Login </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-laptop-code"></i> LetsConnect - U
        </Link>
      </h1>
      {!loadding && (
        <Fragment>{isAuthenticate ? authLinks : guessLinks}</Fragment>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
