import React from "react";
import Navbar from "../components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
