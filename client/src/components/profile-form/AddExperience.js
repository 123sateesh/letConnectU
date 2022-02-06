import { connect } from "react-redux";
import React, { Fragment, useState } from "react";
import { addExperience } from "../../actions/profile";
import PropTypes from "prop-types";
import { Link ,useNavigate} from "react-router-dom";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: "",
    title:"",
    location: "",
    from: "",
    to: "",
    description: "",
    current: "",
  });

  const [toggle, setToggle] = useState(false);
  const {
      title,
      company,
      location,
      from,
      to,
      description,
      current,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    addExperience(formData ,useNavigate);
  };

  return (
    <Fragment>
      <h1 className="large head-primary">Add Experience to Your Profile</h1>
      <p className="paraStyle">
        <i className="fas fa-user-plus"></i> Let's collect yours information to
        look your profile batter.
      </p>
      <small>* Reqiured fields</small>

      <form className="form" onSubmit={(e) => onSubmitData(e)}>
        <div className="form-items">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
             
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <input
            type="text"
            placeholder="* Company"
            name="company"
           
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-items">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
          </p>
        </div>
        <div className="form-items">
        <h4>To Date</h4>
        <input
          type="date"
          name="to"
          value={to}
          onChange={(e) => onChange(e)}
          disabled ={ toggle ? 'disabled' : ''}
        />
      </div>
        <div className="form-items">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-dark my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
