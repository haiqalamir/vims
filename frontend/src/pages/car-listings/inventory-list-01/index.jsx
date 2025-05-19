import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DropdownFilter from "@/components/carListings/DropdownFilter";
import Listings1 from "@/components/carListings/Listings1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MetaComponent from "@/components/common/Metacomonent";

const metadata = {
  title: "Inventory List 1 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};

export default function InventoryListPage1() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Check for session (JWT token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If token doesn't exist, redirect to login page.
      navigate("/login");
    } else {
      // Token exists, allow access.
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <DropdownFilter />
      <Sidebar />
      <Listings1 />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
