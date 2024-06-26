import AdminNavBoll from "@/components/AdminNavBoll";
import "./globals.css";
import NextUiProvider from "./NextUiProvider";
import AuthProvider from "@/lib/utils/AuthProvider";
// import { Provider } from "react-redux";
// import store from "@/redux/store";

export const metadata = {
  title: "Ease ERP Solutions",
  description:
    "Entrprise Resource Planning Software for Enterprise created using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
        <body>
          <NextUiProvider>
            <main>
              <AdminNavBoll />
              {children}
            </main>
          </NextUiProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
