import { Inter } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "./hooks/useAuthentication";
import { I18nProvider } from "./next.config/i18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sisonke AI Powered Community Resources Navigator",
  description: "Sisonke AI Powered Community Resources Navigator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticationProvider>
          <I18nProvider>  
            {children}
          </I18nProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
} 