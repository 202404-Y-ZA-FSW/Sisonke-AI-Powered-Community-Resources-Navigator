import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/sections/NavBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
    <body>
    <Navbar/>
    </body>
    </html>
  );
}
