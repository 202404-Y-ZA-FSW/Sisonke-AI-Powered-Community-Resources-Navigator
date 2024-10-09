import React from "react";
import { useAuthentication } from "@/app/hooks/useAuthentication";
import AuthNav from "./AuthNav";
import Navbar from "./NavBar";

export default function Navigation() {
  const { user } = useAuthentication();
  return <React.Fragment>{user ? <AuthNav /> : <Navbar />}</React.Fragment>;
}
