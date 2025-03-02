import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.type !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;