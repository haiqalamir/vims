import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/headers/Header1";
import Features3 from "@/components/homes/home-1/Features3";
import Brands from "@/components/homes/home-3/Brands";
import Blogs from "@/components/homes/home-4/Blogs";
import Calculator from "@/components/homes/home-4/Calculator";
import Cars from "@/components/homes/home-4/Cars";
import Collections from "@/components/homes/home-4/Collections";
import Features from "@/components/homes/home-4/Features";
import Hero from "@/components/homes/home-4/Hero";
import Services from "@/components/homes/home-4/Services";
import Team from "@/components/homes/home-4/Team";
import Testimonials from "@/components/homes/home-4/Testimonials";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Home 4 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function HomePage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header hheader-style-v4 style-1" />
      <Hero />
      <Cars />
      <Features />
      <Collections />
      <Features3 />
      <Brands />
      <Calculator />
      <Testimonials />
      <Team />
      <Services />
      <Blogs />
      <Footer2 />
    </>
  );
}
