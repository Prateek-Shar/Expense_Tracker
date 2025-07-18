import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();


  const path = location.pathname;

  const noHeaderFooterRoutes = ["/signup", "/verify", "/signin", "/header", "/footer", "/"];
  const bothHeaderFooterRoutes = ["/home", "/report"]; // Add any other routes as needed

  const showBoth = bothHeaderFooterRoutes.includes(path) && !noHeaderFooterRoutes.includes(path);

  const showNavbar = showBoth;
  const showFooter = showBoth;

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
