import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Loading from '../components/Loading';

// Wrap any private page with this so it redirects to /login when logged out,
// but NEVER redirects on reload while a user is still logged in / auth is loading.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
