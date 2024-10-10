"use client";
import React from "react";
import Hero from "./components/sections/Hero";
import Footer from "./components/sections/Footer";
import Jobs from "./components/sections/Jobs";
import Subscriber from "./components/sections/Subscribe";
import FAQs from "./components/sections/FAQs";
import Services from "./components/sections/Services";
import Events from "./components/sections/Event";
import Blogs from "./components/sections/Blogs";
import Navigation from "./components/sections/Navigation";
import SisonkeX from "./components/SisonkeX";

export default function Home() {
  return (
    <React.Fragment>
      <Navigation/>
      <Hero />
      <Services />
      <Events />
      <Jobs/>
      <FAQs/>
      <Blogs/>
      <Subscriber/>
      <Footer/>
      <SisonkeX/>
    </React.Fragment>
  );
}
