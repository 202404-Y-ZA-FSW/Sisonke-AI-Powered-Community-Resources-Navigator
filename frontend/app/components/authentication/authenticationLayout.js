"use client";
import { useAuthentication } from "../../hooks/useAuthentication";

export function withAuthentication(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuthentication();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      window.location.href = "/account/login";
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
