import Header5 from "@/components/headers/Header5";
import Brands from "@/components/homes/home-8/Brands";
import Cars from "@/components/homes/home-8/Cars";
import CarType from "@/components/homes/home-8/CarType";
import Features from "@/components/homes/home-8/Features";

import Footer4 from "@/components/footers/Footer4";
import Blogs from "@/components/homes/home-4/Blogs";
import Cars2 from "@/components/homes/home-8/Cars2";
import Facts from "@/components/homes/home-8/Facts";
import Hero from "@/components/homes/home-8/Hero";
import NewsLetter from "@/components/homes/home-8/NewsLetter";
import Testimonials from "@/components/homes/home-8/Testimonials";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Home 8 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function HomePage8() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header5 />
      <Hero />
      <CarType />
      <Brands />
      <Cars />
      <Features />
      <Facts />
      <div className="mt-5"></div>
      <Cars2 />
      <Testimonials />
      <Blogs />
      <NewsLetter />
      <Footer4 />
    </>
  );
}
