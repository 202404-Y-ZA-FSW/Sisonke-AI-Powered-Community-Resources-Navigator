<<<<<<< HEAD
"use client"
import LoginPage from "../app/account/login/page";
import Register from "../app/account/register/page";

export default function Home() {
  return (
    <>
    <LoginPage />
    <Register />
    </>
=======
import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
    </React.Fragment>
>>>>>>> 3ad839b2970a59f819bddb0ca1dab3fb9189ac8d
  );
}
