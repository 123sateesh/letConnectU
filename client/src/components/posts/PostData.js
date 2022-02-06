import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostData = ({ addPost }) => {
       const [text,setText] = useState('');
  return (
    <div>
      {" "}
      <div className="post-form-header bg-primary p-1 m-1">
        <h3>Create A Post !</h3>
      </div>
      <form className="form m-1" onSubmit ={e => {
          e.preventDefault();
          addPost({text});
          setText('');
      }}>
        <textarea
          name="text"
          id=""
          cols="30"
          rows="5"
          value={text}
          onChange={e =>setText(e.target.value)}
          placeholder="Say Somthing... "
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostData.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostData);
