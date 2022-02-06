import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, stream, from, to, description },
}) => {
  return (
    <Fragment>
    <h3> <strong>School:</strong> {school}</h3>
    <p>
    <strong>Degree:</strong> {degree}
  </p>
  {stream && (
    <p>
      <strong>Feild of Intrest: </strong> {stream}
    </p>
  )}
    <p>
      <strong>Date:</strong>{" "}
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {to ? "Till Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
    {description && (
      <p>
        <strong>Description: </strong> {description}
      </p>
    )}
</Fragment>        
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
