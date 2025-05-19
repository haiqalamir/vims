import Blogs3 from "@/components/blogs/Blogs3";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Blog List 3 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function BlogListingPage3() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <Blogs3 />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
