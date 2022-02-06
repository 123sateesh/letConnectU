import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  const {
    user: { name },
    bio,
    skills,
  } = profile;

  return (
    <Fragment>
      <div className="profile-about bg-light p-2">
        {bio && (
          <Fragment>
            <h1 className="head-primary">{name.trim().split(" ")[0]}'s Bio </h1>
            <p>{bio}</p>
            
          </Fragment>
        )}
        <div className="line"></div>
        <h2 className="head-primary">Skills</h2>
        <div className="skill">
          {skills.map((skill, index) => (
            <div key={index} className="p-1">
              {" "}
              <p>
                <i className="fas fa-check-circle"></i> {skill}
              </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
