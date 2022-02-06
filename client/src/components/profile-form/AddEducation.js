import { connect } from "react-redux";
import React, { Fragment, useState } from "react";
import {  addEducation } from "../../actions/profile";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
 

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree:"",
    stream: "",
    from: "",
    to: "",
    description: "",
    current: "",
  });
  
  const [toggle, setToggle] = useState(false);

  const {
      school,
      degree,
      stream,
      from,
      current,
      to,
      description,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    addEducation(formData ,useNavigate);
  };

  return (
    <Fragment>
      <h1 className="large head-primary">Add Education to Your Profile</h1>
      <p className="paraStyle">
        <i className="fas fa-user-plus"></i> Let's collect yours information to
        look your profile batter.
      </p>
      <small>* Reqiured fields</small>

      <form className="form" onSubmit={(e) => onSubmitData(e)}>
        <div className="form-items">
          <input
          type="text" placeholder="* School" name="school"
             
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <input
          type="text" placeholder="* Degree or Certificate" name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <input
          type="text" placeholder="Study Field" name="stream" 
            value={stream}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
        <p>
          <input
            type="checkbox"
            name="current"
            checked={current}
            value={current}
            onChange={(e) => {
              setFormData({...formData,current:!current});
              setToggle(!toggle)
            }}
          />{" "}
          Current School
        </p>
      </div>
        <div className="form-items">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <textarea
          name="description" cols="30" rows="5" placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}
          > </textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-dark my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
