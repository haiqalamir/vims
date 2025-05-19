import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      <li className={pathname === "/" ? "menuActive" : ""}>
        <Link to="/">Home</Link>
      </li>
      <li className={pathname === "/inventory-list-01" ? "menuActive" : ""}>
        <Link to="/inventory-list-01">Vehicle List</Link>
      </li>
      <li className={pathname === "/dashboard" ? "menuActive" : ""}>
        <Link to="/dashboard">Admin Panel</Link>
      </li>
    </>
  );
}
