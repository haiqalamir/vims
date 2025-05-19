import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import DealerSingle from "@/components/otherPages/DealerSingle";
import { dealers } from "@/data/dealers";

import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Dealer Single || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function DealerSinglePage() {
  let params = useParams();
  const dealerItem =
    dealers.map((elm, i) => elm.id == params.id)[0] || dealers[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <DealerSingle dealerItem={dealerItem} />

      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
