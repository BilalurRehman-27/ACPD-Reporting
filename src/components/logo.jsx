import React from "react";
import logo from "../images/accountingcpd.png"; // relative path to image
const Logo = () => {
  return (
    <>
      <img
        src={logo}
        alt="lgogo"
        style={{ width: "30%", height: "100%", float: "left" }}
      />
    </>
  );
};

export default Logo;
