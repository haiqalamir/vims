import Single1 from "@/components/carSingles/Single1";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { allCars } from "@/data/cars";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Inventory Single 1 || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function InventorySinglePage1() {
  let params = useParams();
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <Single1 carItem={carItem} />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
