import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { title, company, location, from, to, description },
}) => {
  return (
    <Fragment>
    <h3><strong>Company:</strong> {company}</h3>
    <p> 
    <strong>Date:</strong> <Moment format="DD/MM/YYYY">{from}</Moment>-
      {to ? "Till Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      
    </p>
    <p>
      <strong>Status:</strong> {title}
    </p>
    {description && (
      <p>
        <strong>Description: </strong> {description}
      </p>
    )}
    {location && (
      <p>
        <strong>Location: </strong> {location}
      </p>
    )}
    
</Fragment>        
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
