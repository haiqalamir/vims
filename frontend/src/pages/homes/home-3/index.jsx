import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Facts from "@/components/homes/home-1/Facts";
import Blogs from "@/components/homes/home-3/Blogs";
import Brands from "@/components/homes/home-3/Brands";
import Cars from "@/components/homes/home-3/Cars";
import Cars2 from "@/components/homes/home-3/Cars2";
import Features from "@/components/homes/home-3/Features";
import Features2 from "@/components/homes/home-3/Features2";
import FooterBanner from "@/components/homes/home-3/FooterBanner";
import Hero from "@/components/homes/home-3/Hero";
import Testimonials from "@/components/homes/home-3/Testimonials";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Home 3 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function HomePage3() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div id="nav-mobile"></div>
      <Hero />
      <Cars />
      <Cta />
      <Features />
      <Cars2 />
      <Testimonials />
      <Brands />
      <Features2 />
      <Facts />
      <Blogs />
      <FooterBanner />
      <Footer1 parentClass="prima-footer footer-style-one" />
    </>
  );
}
