import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link,useNavigate } from "react-router-dom";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({createProfile}) => {

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    status: "",
    skills: "",
    location: "",
    githubusername: "",
    bio: "",
    maritalStatus: "",
    youtube: "",
    twitter: "",
    linkedIn: "",
    facebook: "",
    instagram: "",
    
  });

  const [displaySocialInput, toggleSocialInput] = useState(false);

  const {
    company,
    website,
    status,
    skills,
    location,
    githubusername,
    bio,
    maritalStatus,
    youtube,
    twitter,
    linkedIn,
    facebook,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    createProfile(formData ,useNavigate)
  };

  return (
    <div>
      <h1 className="large head-primary">Create Your Profile</h1>
      <p className="paraStyle">
        <i className="fas fa-user-plus"></i> Let's collect yours information to
        look your profile batter.
      </p>
      <small>* Reqiured fields</small>

      <form className="form" onSubmit={(e) => onSubmitData(e)}>
        <div className="form-items 1">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select> 
        </div>
        <div className="form-items 1">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Your own company or one you work for
          </small>
        </div>
        <div className="form-items 1">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text"> Your own or a company website</small>
        </div>
        <div className="form-items 1 ">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">City & state suggested</small>
        </div>
        <select
          name="maritalStatus"
          value={maritalStatus}
          onChange={(e) => onChange(e)}
        >
          <option value="0"> Select marital Status</option>
          <option value="married">married</option>
          <option value="unmarried">unmarried</option>
          <option value="Other">Other</option>
        </select>
        <div className="form-items 2">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-items 2">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-items 1">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInput(!displaySocialInput)}
          >
            Add Social Network Links
          </button>
          <span> Optional</span>
        </div>
        {displaySocialInput && (
          <Fragment>
            <div className="social">
              <div className="form-items social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-items social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-items social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-items social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedIn}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-items social-input">
                <i className="fab fa-instagram fa-2x"></i>{" "}
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-dark my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};
export default connect(null, { createProfile })(CreateProfile);
