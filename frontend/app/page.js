import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
    </React.Fragment>
  );
}
