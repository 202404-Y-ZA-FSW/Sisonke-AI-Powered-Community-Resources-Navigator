"use client";
import React, { useEffect } from "react";
import Script from 'next/script';
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
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div id="google_translate_element"></div> 
      <Hero />
      <Services />
      <Events />
      <Services/>
      <Events/>
      <Jobs />
      <FAQs />
      <Blogs />
      <Subscriber />
      <Footer />

      {/* Load the Google Translate script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive" // Ensures it loads after the page has loaded
      />
    </React.Fragment>
  );
}
