import { Inter } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "./hooks/useAuthentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sisonke AI Powered Community Resources Navigator",
  description: "Sisonke AI Powered Community Resources Navigator",
};

export default function RootLayout({ children }) {
  return (
    <AuthenticationProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthenticationProvider>
  );
}
