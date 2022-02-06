import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (loading && profile === null) ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large head-primary">Dashboard</h1>
      <p className="paraStyle">
        <i className="fas fa-user"></i> Welcome { user && <strong>{user.name.toUpperCase()}</strong>}
      </p>
      { profile !==null  ? (
        <Fragment> 
        <DashboardActions/>
        <Experience experience ={profile.experience}/> 
        <Education education ={profile.education}/>
        <div className="my-3">
        <button className="btn btn-danger" onClick={e =>{deleteAccount()}} > <i className="fas fa-user-minus head-primary"></i>{' '} Delete Account </button>
       </div>
        </Fragment>
      ) : (
        <Fragment>
          <small>
            Your  profile have not been created yet. Please add some
            information.
          </small>
         <Link  to ="/create-profile" className="btn btn-primary my-2"> Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
