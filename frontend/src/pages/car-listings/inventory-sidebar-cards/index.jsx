import Listings6 from "@/components/carListings/Listings6";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Inventory Sidebar Cards || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function InventorySidebarCardsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <Sidebar />
      <Listings6 />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
