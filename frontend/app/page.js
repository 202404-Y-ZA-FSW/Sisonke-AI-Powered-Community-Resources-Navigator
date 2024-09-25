"use client";
import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
      <Footer/>
    </React.Fragment>
  );
}