"use client";
import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";
import Jobs from "./components/sections/Jobs";
import Subscriber from "./components/sections/Subscribe";
import FAQs from "./components/sections/FAQs";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
      <Jobs/>
      <FAQs/>
      <Subscriber/>
      <Footer/>
    </React.Fragment>
  );
}