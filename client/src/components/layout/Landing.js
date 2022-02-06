import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

function Landing({isAuthenticate}) {
 
  if(isAuthenticate){
   return  <Navigate to ='/dashboard'/>
  }
  return (
    <section className="landing my-1">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Lets we connect Developers</h1>
          <p className="paraStyle">
            This is the great platfrom for connecting Developers.Everything
            about Developers
          </p>
          <div className="button my-3">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
            Login 
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
Landing.propTypes={
   isAuthenticate:PropTypes.bool, 
}

const mapStateToProps = state =>({
  isAuthenticate : state.auth.isAuthenticate,
})

export default  connect(mapStateToProps) (Landing);
