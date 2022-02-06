import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGitRepos } from "../../actions/profile";
 

const ProfileGihubRepo = ({ username, getGitRepos, profile:{repos} }) => {
  useEffect(() => {
    getGitRepos(username);
  }, [getGitRepos,username]);

    return <Fragment> { repos === null ? '':repos.map((repo) => (
    <div className="repo bg-light p-1 m-1" key={repo._id}>
      <div>
        <h4>
          <a href={repo.html_url} target="_blank">
            {repo.name}
          </a>
        </h4>
        <p>{repo.description}</p>
      </div>

      <div>
        <ul>
          <li className="badge badge-primary">
            {" "}
            <i className="far fa-star"></i> Stars:{repo.stars_count}
          </li>
          <li className="badge badge-dark">
            <i className="fas fa-eye"></i> Watch:{repo.watchers_count}
          </li>
          <li className="badge badge-success">
            {" "}
            <i className="fas fa-code-branch"></i> Forks:{repo.forks_count}
          </li>
        </ul>
      </div>
    </div>
  ))}
  </Fragment>
   
};

ProfileGihubRepo.propTypes = {
  getGitRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGitRepos })(ProfileGihubRepo);

  
