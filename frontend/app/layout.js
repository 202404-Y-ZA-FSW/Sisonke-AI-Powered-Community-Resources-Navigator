import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/sections/NavBar";
import JobCard from "./components/JobCard";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
    <body>
    <Navbar/>
    <JobCard/>
    
    </body>
    </html>
  );
}
