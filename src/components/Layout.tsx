import React from "react";

import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">
        <div className=" row m-2">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
