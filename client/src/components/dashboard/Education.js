import { connect } from "react-redux";
import React, { Fragment } from "react";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";
import PropTypes from 'prop-types';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td> {edu.school}</td>
      <td> {edu.degree}</td>
      <td className="hide-sm"> {edu.stream}</td>
      <td>
        {" "}
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Till Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}{" "}
      </td>

    <td> <button
    className="btn btn-danger"
    onClick={(e) => deleteEducation(edu._id)}
  >
    Delete
  </button></td>
    </tr>
  ));
  return (
    <Fragment>
      <h1 className="my-2">Education Section</h1>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="">Degree</th>
            <th className="hide-sm">Field Of Study</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
