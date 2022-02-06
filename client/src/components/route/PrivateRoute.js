import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// import Dashboard from '../dashboard/Dashboard'

function PrivateRoute({
  children,
  redirectTo,
  auth: { isAuthenticate},
}) {
  return isAuthenticate ? children : <Navigate to={redirectTo} />;
}
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStoreToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStoreToProps)(PrivateRoute);
