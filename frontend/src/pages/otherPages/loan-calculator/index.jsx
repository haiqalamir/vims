import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import LoanCalculator from "@/components/otherPages/LoanCalculator";


import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Loan Calculator || Prima - Reactjs Car Template",
  description: "Prima - Reactjs Car Template",
};
export default function LoanCalculatorPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="prima-header header-style-v1 style-two inner-header cus-style-1" />
      <LoanCalculator />
      <Footer1 parentClass="prima-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
