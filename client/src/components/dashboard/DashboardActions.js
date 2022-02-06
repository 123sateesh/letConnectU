import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {

  return  <div className="dash-button my-3">
  <Link to="/edit-profile" className="btn" ><i className="fas fa-user-circle head-primary"></i> Edit Profile</Link>
  <Link to="/add-experience" className="btn" ><i className="fas fa-user-tie head-primary"></i>  Add Experience </Link>
  <Link to="/add-education" className="btn" ><i className="fas fa-graduation-cap head-primary"></i>  Add Education</Link> 
</div>;
};

export default DashboardActions;
