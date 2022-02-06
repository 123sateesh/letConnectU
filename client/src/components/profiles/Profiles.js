import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import UserProfile from "./UserProfile";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large head-primary">
            {" "}
            <i className="fas fa-check-square"></i>  Developers 
          </h1>
          <p className="paraStyle">Connect with Developers</p>
          <div className="profiles  ">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <UserProfile key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No profile found... </h4>
            )}
          </div>
          </Fragment>
          )}
        
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

Profiles.propTypes = {};
const mapStateProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateProps, { getProfiles })(Profiles);


 

