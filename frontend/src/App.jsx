import FilterSidebar from "@/components/common/FilterSidebar";

import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import WOW from "wow.js";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import HomePage1 from "./pages";
import BlogListingPage1 from "./pages/blogs/blog-list-01";
import BlogListingPage2 from "./pages/blogs/blog-list-02";
import BlogListingPage3 from "./pages/blogs/blog-list-03";
import BlogSinglePage from "./pages/blogs/blog-single";
import InventoryListPage1 from "./pages/car-listings/inventory-list-01";
import InventoryListPage2 from "./pages/car-listings/inventory-list-02";
import InventoryMapCardsPage from "./pages/car-listings/inventory-map-cards";
import InventoryMapRowsPage from "./pages/car-listings/inventory-map-rows";
import InventorySidebarCardsPage from "./pages/car-listings/inventory-sidebar-cards";
import InventorySidebarRowsPage from "./pages/car-listings/inventory-sidebar-rows";
import InventorySinglePage2 from "./pages/car-singles/inventory-page-single-v2";
import InventorySinglePage3 from "./pages/car-singles/inventory-page-single-v3";
import InventorySinglePage4 from "./pages/car-singles/inventory-page-single-v4";
import InventorySinglePage5 from "./pages/car-singles/inventory-page-single-v5";
import InventorySinglePage1 from "./pages/car-singles/vehicle-details";
import AccountListsPage from "./pages/dashboard/account-lists";
import AddAccountsPage from "./pages/dashboard/add-accounts";
import AddListingsPage from "./pages/dashboard/add-listings";
import BookedPage from "./pages/dashboard/booked";
import DashboardPage from "./pages/dashboard/dashboard";
import EditAccountsPage from "./pages/dashboard/edit-accounts";
import EditListingsPage from "./pages/dashboard/edit-listings";
import MessagesPage from "./pages/dashboard/messages";
import MyListingsPage from "./pages/dashboard/my-listings";
import ProfilePage from "./pages/dashboard/profile";
import SavedPage from "./pages/dashboard/saved";
import HomePage10 from "./pages/homes/home-10";
import HomePage2 from "./pages/homes/home-2";
import HomePage3 from "./pages/homes/home-3";
import HomePage4 from "./pages/homes/home-4";
import HomePage5 from "./pages/homes/home-5";
import HomePage6 from "./pages/homes/home-6";
import HomePage7 from "./pages/homes/home-7";
import HomePage8 from "./pages/homes/home-8";
import HomePage9 from "./pages/homes/home-9";
import NotFoundPage from "./pages/not-found";
import AboutPage from "./pages/otherPages/about";
import ComparePage from "./pages/otherPages/compare";
import ContactPage from "./pages/otherPages/contact";
import DealerPage from "./pages/otherPages/dealer";
import DealerSinglePage from "./pages/otherPages/dealer-single";
import FaqPage from "./pages/otherPages/faq";
import InvoicePage from "./pages/otherPages/invoice";
import LoanCalculatorPage from "./pages/otherPages/loan-calculator";
import LoginPage from "./pages/otherPages/login";
import PricingPage from "./pages/otherPages/pricing";
import TeamListPage from "./pages/otherPages/team-list";
import TeamSinglePage from "./pages/otherPages/team-single";
import TermsPage from "./pages/otherPages/terms";
import UIElementsPage from "./pages/otherPages/ui-elements";
import CartPage from "./pages/shop/cart";
import CheckoutPage from "./pages/shop/checkout";
import ShopListPage from "./pages/shop/shop-list";
import ShopSinglePage from "./pages/shop/shop-single";
import "./styles/style.css";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    new WOW({
      live: false,
    }).init();
  }, [pathname]);

  return (
    <>
      <Context>
        <MobileMenu />
        <div className="prima-wrapper">
          <Routes>
            <Route path="/">
            <Route index element={<HomePage5 />} />
              <Route path="home-1" element={<HomePage1 />} />
              <Route path="home-2" element={<HomePage2 />} />
              <Route path="home-3" element={<HomePage3 />} />
              <Route path="home-4" element={<HomePage4 />} />
              <Route path="home-5" element={<HomePage5 />} />
              <Route path="home-6" element={<HomePage6 />} />
              <Route path="home-7" element={<HomePage7 />} />
              <Route path="home-8" element={<HomePage8 />} />
              <Route path="home-9" element={<HomePage9 />} />
              <Route path="home-10" element={<HomePage10 />} />

              <Route
                path="inventory-list-01"
                element={<InventoryListPage1 />}
              />
              <Route
                path="inventory-list-02"
                element={<InventoryListPage2 />}
              />
              <Route
                path="inventory-map-cards"
                element={<InventoryMapCardsPage />}
              />
              <Route
                path="inventory-map-rows"
                element={<InventoryMapRowsPage />}
              />
              <Route
                path="inventory-sidebar-rows"
                element={<InventorySidebarRowsPage />}
              />
              <Route
                path="inventory-sidebar-cards"
                element={<InventorySidebarCardsPage />}
              />

              <Route
                path="vehicle-details/:id"
                element={<InventorySinglePage1 />}
              />
              <Route
                path="inventory-page-single-v2"
                element={<InventorySinglePage2 />}
              />
              <Route
                path="inventory-page-single-v3"
                element={<InventorySinglePage3 />}
              />
              <Route
                path="inventory-page-single-v4"
                element={<InventorySinglePage4 />}
              />
              <Route
                path="inventory-page-single-v5"
                element={<InventorySinglePage5 />}
              />

              <Route path="blog-list-01" element={<BlogListingPage1 />} />
              <Route path="blog-list-02" element={<BlogListingPage2 />} />
              <Route path="blog-list-03" element={<BlogListingPage3 />} />
              <Route path="blog-single/:id" element={<BlogSinglePage />} />

              <Route path="shop-list" element={<ShopListPage />} />
              <Route path="shop-single/:id" element={<ShopSinglePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="my-listings" element={<MyListingsPage />} />
              <Route path="account-lists" element={<AccountListsPage />} />
              <Route path="add-listings" element={<AddListingsPage />} />
              <Route path="add-accounts" element={<AddAccountsPage />} />
              <Route path="edit-listings/:vehicle_id" element={<EditListingsPage />} />
              <Route path="edit-accounts/:id" element={<EditAccountsPage />} />
              <Route path="booked" element={<BookedPage />} />
              <Route path="saved" element={<SavedPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="profile" element={<ProfilePage />} />

              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="team-list" element={<TeamListPage />} />
              <Route path="team-single/:id" element={<TeamSinglePage />} />
              <Route path="dealer" element={<DealerPage />} />
              <Route path="dealer-single/:id" element={<DealerSinglePage />} />
              <Route path="loan-calculator" element={<LoanCalculatorPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="ui-elements" element={<UIElementsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>{" "}
        <FilterSidebar />{" "}
      </Context>
      <BackToTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
