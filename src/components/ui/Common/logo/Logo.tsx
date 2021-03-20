import React from "react";
import { Link } from "react-router-dom";
import image from "../../../../assets/images/header_logo.png";

export const Logo = () => {
  return (
    <Link to="/">
      <img src={image} alt="" loading="lazy" decoding="async" />
    </Link>
  );
};
