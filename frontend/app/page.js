"use client"
import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";
import Jobs from "./components/sections/Jobs";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
      <Jobs/>
      <Footer/>
    </React.Fragment>
  );
}
