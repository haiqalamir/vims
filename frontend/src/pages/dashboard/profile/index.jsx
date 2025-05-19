import Profile from "@/components/dashboard/Profile";
import Footer1 from "@/components/footers/Footer1";

import HeaderDashboard from "@/components/headers/HeaderDashboard";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Profile || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function ProfilePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <Profile />
        <Footer1 parentClass="prima-footer footer-style-one v2" />
      </div>
    </>
  );
}
