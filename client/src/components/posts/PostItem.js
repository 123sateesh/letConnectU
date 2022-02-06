import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { likePost, unlikePost, deletePost } from "../../actions/post";

const PostItem = ({
  showAction,
  deletePost,
  likePost,
  unlikePost,
  auth,
  post: { _id, user, name, avatar, date, likes, comments, text, },
}) => {
  return (
    <div className="post bg-dark p-1  m-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} className="round-img" alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
        </p>
        {showAction && (
          <Fragment>
            <button onClick={(e) => likePost(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button onClick={(e) => unlikePost(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>{" "}
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};
PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
  PostItem
);
