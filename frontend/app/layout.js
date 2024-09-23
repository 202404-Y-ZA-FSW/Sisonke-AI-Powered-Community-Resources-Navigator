import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/sections/NavBar";
import Blog from "../app/blog/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
    <body>
    <Navbar/>
    <Blog/>
    </body>
    </html>
  );
}
