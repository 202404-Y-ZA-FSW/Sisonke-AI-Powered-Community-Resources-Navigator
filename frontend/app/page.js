"use client";
import React from "react";
import Navbar from "./components/sections/NavBar";
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";
import Jobs from "./components/sections/Jobs";
import Subscriber from "./components/sections/Subscribe";
import FAQs from "./components/sections/FAQs";
import Services from "./components/sections/Services";
import Events from "./components/sections/Event";
import Blogs from "./components/sections/Blogs";
export default function Home() {
  return (
    <React.Fragment>
      <Navbar/>
      <Hero/>
      <Services/>
      <Events/>
      <Jobs/>
      <FAQs/>
      <Blogs/>
      <Subscriber/>
      <Footer/>
    </React.Fragment>
  );
}