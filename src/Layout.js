// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <div className="flex flex-col min-h-screen mx-auto max-w-3xl px-4 pt-8 pb-16">
        <div className="flex-grow">
          <main className="my-0 py-16">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
