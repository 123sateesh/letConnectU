import React,{Fragment} from "react";
import PropTypes from "prop-types";

const ProfileTop = ({ profile }) => {
  const {
    company,
    status,
    location,
    social,
    website,
    user: { name, avatar },
  } = profile;
  return (
    <Fragment>
      <div className="profile-top bg-primary  p-2 ">
        <img src={avatar} alt="" className="round-img my-2" />
        <h1 className="large">{name}</h1>
        <p className="paraStyle">
          {" "}
          {status} {company && <span>at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1 p-1">
          <div>
            {website && (
              <a href={website} target="_blank">
                <i className="fab fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="nooperner noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="nooperner noreferrer"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="nooperner noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="nooperner noreferrer"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="nooperner noreferrer"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
