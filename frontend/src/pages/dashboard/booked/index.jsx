import Booked from "@/components/dashboard/Booked";
import Footer1 from "@/components/footers/Footer1";

import HeaderDashboard from "@/components/headers/HeaderDashboard";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Favorite || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function BookedPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <Booked />
        <Footer1 parentClass="prima-footer footer-style-one v2" />
      </div>
    </>
  );
}
