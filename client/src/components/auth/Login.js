import React, { Fragment, useState } from "react";
import { Link,Navigate } from "react-router-dom";
import{ connect} from 'react-redux';
import PropTypes from 'prop-types'
import { login } from "../../actions/auth";

// import axios from 'axios';

function Login({login,isAuthenticate}) {

  // let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;
  const onChange = (data) =>
    setFormData({
      ...formData,
      [data.target.name]: data.target.value,
    });
  const onSubmit = async (data) => {
    data.preventDefault();
    login({email,password});
  };
  if(isAuthenticate){
    // return navigate('/dashboard');
    return <Navigate to ='/dashboard'/>
  }
  return (
    <Fragment>
      <h1 className="large head-primary">Login !</h1>
      <p className="paraStyle">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>

      <form className="form" onSubmit={(data) => onSubmit(data)}>
        <div className="form-items">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(data) => onChange(data)}
            placeholder="Your Email"
          
          />
        </div>
        <div className="form-items">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(data) => onChange(data)}
            placeholder="Your Password"
            
            minLength="6"
          />
        </div>
        <div className="form-items">
           
          <input
            type="submit"
            value="Login Now"
            className="btn btn-primary"
          />
        </div>
      </form>
      <p className="my-1">
         Don't have an account? 
         <strong> click to</strong><br />
        <Link to="/register">
            
          <i className="fas fa-arrow-circle-right"></i> Register 
        </Link>
      </p>
    </Fragment>
  );
}
Login.propTypes = {
  login:PropTypes.func.isRequired
}

const mapStoreToProps =  state =>( {
  isAuthenticate:state.auth.isAuthenticate
})

export default  connect(mapStoreToProps,{login}) (Login);
