"use client";

import { withAuthentication } from '../components/authentication/authenticationLayout';
import { useAuthentication } from '../hooks/useAuthentication';

function Dashboard() {
  const { user, logout } = useAuthentication();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard, {user.user.username}!</p>
      <div>
        <p>Email: {user.user.email}</p>
        <p>ID: {user.user.id}</p>
        <p>Role: {user.user.role}</p>
      </div>
      <button 
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default withAuthentication(Dashboard);