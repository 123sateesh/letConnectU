import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import PropTypes from 'prop-types';


const Experience = ({ experience ,deleteExperience }) => {


  const experiences = experience.map(exp => (
    <tr key={exp._id} >
      <td> {exp.company}</td>
      <td className=""> {exp.title}</td>
      <td className="hide-sm"> {exp.location}</td>
      <td>
        {" "}
        
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Till Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}{" "}
      </td>
       <td> <button className="btn btn-danger" onClick={e => deleteExperience(exp._id)}>Delete</button></td>
    </tr>
  ));
  return (
    <Fragment>
      <h1 className="my-2">Experience Section</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="">Title</th>
            <th className="hide-sm">Location</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
           {experiences}
        </tbody>
      </table>
    </Fragment>
  );
};

  Experience.propTypes = {
      experience :PropTypes.array.isRequired,
      deleteExperience:PropTypes.func.isRequired,
  }
export default connect(null,{deleteExperience})(Experience);
