import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cta from "@/components/common/Cta";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Inspiration from "@/components/homes/home-2/Inspiration";
import Blogs from "@/components/homes/home-4/Blogs";
import Brands from "@/components/homes/home-5/Brands";
import Brands2 from "@/components/homes/home-5/Brands2";
import Cars from "@/components/homes/home-5/Cars";
import Cars2 from "@/components/homes/home-5/Cars2";
import Features from "@/components/homes/home-5/Features";
import Hero from "@/components/homes/home-5/Hero";
import Team from "@/components/homes/home-5/Team";
import Testimonials from "@/components/homes/home-5/Testimonials";

import MetaComponent from "@/components/common/Metacomonent";

const metadata = {
  title: "Home 5 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};

export default function HomePage5() {
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

  // Optionally, show a loading indicator while checking the session.
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header hheader-style-v4 five" white />
      <Hero />
      <Brands />
      {/* <Cta /> */}
      {/* <Cars /> */}
      {/* <Features /> */}
      <Cars2 />
      {/* <Inspiration /> */}
      {/* <Testimonials /> */}
      {/* <Team /> */}
      {/* <Blogs /> */}
      {/* <Brands2 /> */}
      <Footer3 />
    </>
  );
}
