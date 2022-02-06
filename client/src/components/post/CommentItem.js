import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CommentItem = ({
  deleteComment,
  postId,
  auth,
  comment: { _id, user, text, name, avatar, date },
}) => {
  return (
    <div className="post bg-light p-1 m-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} className="round-img" alt="" />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          > <i className="fas fa-times"></i> </button>
        )}
         
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
