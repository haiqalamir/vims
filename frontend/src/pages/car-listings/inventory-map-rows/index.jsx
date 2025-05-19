import Listings4 from "@/components/carListings/Listings4";
import Sidebar from "@/components/carListings/Sidebar";

import Header1 from "@/components/headers/Header1";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Inventory Map Rows || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function InventoryMapRowsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <Sidebar />
      <Listings4 />
    </>
  );
}
