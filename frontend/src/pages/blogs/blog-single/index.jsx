import BlogsSingle from "@/components/blogs/BlogsSingle";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Blog Single || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function BlogSinglePage() {
  let params = useParams();
  const blogItem =
    allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <BlogsSingle blogItem={blogItem} />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
