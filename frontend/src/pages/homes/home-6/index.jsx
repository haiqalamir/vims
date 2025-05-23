import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Brands from "@/components/homes/home-1/Brands";
import Facts from "@/components/homes/home-1/Facts";
import Cars from "@/components/homes/home-6/Cars";
import Dealership from "@/components/homes/home-6/Dealership";
import Features from "@/components/homes/home-6/Features";
import Features2 from "@/components/homes/home-6/Features2";
import Hero from "@/components/homes/home-6/Hero";
import Inspiration from "@/components/homes/home-6/Inspiration";
import MapSection from "@/components/homes/home-6/MapSection";
import Team from "@/components/homes/home-6/Team";
import Testimonials from "@/components/homes/home-6/Testimonials";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Home 6 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function HomePage6() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header3 />
      <Hero />
      <Brands />
      <Dealership />
      <Features />
      <Facts />
      <Cars />
      <Inspiration />
      <Features2 />
      <Testimonials />
      <Team />
      <MapSection />
      <Footer3 parenttClass="prima-footer footer-style-five v6" />
    </>
  );
}
