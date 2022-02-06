import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const PostComment = ({addComment,postId}) => {

    const [text, setText] = useState();
  return (
    <div>
      {" "}
      <div className="post-form-header bg-primary p-1 m-1">
      <h3>Leave A Comment</h3>
      </div>
      <form className="form m-1" onSubmit ={e => {
          e.preventDefault();
          addComment(postId,{text});
          setText('');
      }}>
        <textarea
          name="text"
          id=""
          cols="30"
          rows="5"
          value={text}
          onChange={e =>setText(e.target.value)}
          placeholder="Leave a comment to the post..."
        
        ></textarea>
    <div><input type="submit" className="btn btn-dark my-1" value="Submit" /></div>
      </form>
    </div>
  );
};

PostComment.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(null,{addComment}) (PostComment);
