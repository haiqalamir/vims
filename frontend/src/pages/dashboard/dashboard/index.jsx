import Dashboard from "@/components/dashboard/Dashboard";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Dashboard || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function DashboardPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <Dashboard />
        <Footer1 parentClass="prima-footer footer-style-one v2" />
      </div>
    </>
  );
}
