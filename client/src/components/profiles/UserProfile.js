import React, { Fragment, } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserProfile = ({ profile }) => {
  const {
    user: { name, _id, avatar },
    skills,
    status,
    company,
    location,
  } = profile;

  return (
    <Fragment>
      <div className="profile bg-light my-3 ">
        <img src={avatar} alt=" " className="round-img" />
        <div>
          <h1>{name}</h1>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className="my-1">{location}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary m">
          <i className="fas fa-eye"></i>  See Profile 
          </Link>
           
        </div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li className="head-primary" key={index}>
              <i className="fas fa-chess-queen"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

UserProfile.propType = {
  profile: PropTypes.object.isRequired,
};

export default UserProfile;
 
