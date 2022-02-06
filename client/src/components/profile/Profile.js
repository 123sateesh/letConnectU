import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGihubRepo from "./ProfileGihubRepo";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById,id]);

  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large head-primary">
            <i className="fas fa-check-square"></i> Developer
          </h1>
          <Link to="/profiles" className="btn">
            <h3>
              {" "}
              <i className="fas fa-arrow-alt-circle-left"></i> Back to Profiles
            </h3>
          </Link>
          {auth.isAuthenticate &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                {" "}
                Edit Profile
              </Link>
            )}

          <div className="profile-grid p-1  my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-light  p-2">
              <h2 className="head-primary">Experiences</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4> No Experience Added yet. </h4>
              )}
            </div>
            <div className="profile-edu bg-light  p-2">
              <h2 className="head-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                 
                </Fragment>
              ) : (
                <h4> No Education Details Added yet. </h4>
              )}
            </div>
            <div className="profile-github bg-light">
            <h2 className="head-primary m-1 p-1"> <i className="fab fa-github-square "></i>
                GitHub Repos</h2>
                <ProfileGihubRepo  username = {profile.githubusername}/>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
