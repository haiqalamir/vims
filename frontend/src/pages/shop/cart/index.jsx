import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Cart from "@/components/shop/Cart";


import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Cart || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function CartPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <Cart />

      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
