import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  contactItems,
  navItems,
  socialMediaLinks,
} from "@/data/footerLinks";

export default function Footer1({
  parentClass = "prima-footer footer-style-one cus-st-1",
}) {
  // State for dynamic brands
  const [brands, setBrands] = useState([]);

  // Fetch vehicles from DRF to extract unique brands
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vehicles/")
      .then((response) => {
        const vehicles = response.data;
        // Extract unique brands (filtering out falsy values)
        const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.brand).filter(Boolean)));
        // Limit to 8 brands
        setBrands(uniqueBrands.slice(0, 8));
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  // Fixed statuses for vehicles
  const statuses = [
    { name: "Available", link: "/inventory-list-01?status=Available" },
    { name: "Booked", link: "/inventory-list-01?status=Booked" },
    { name: "Sold", link: "/inventory-list-01?status=Sold" },
  ];

  // Fixed mileage ranges
  const mileageRanges = [
    { name: "< 50,000 KM", link: "/inventory-list-01?mileage=<50000" },
    { name: "50,000 KM - 100,000 KM", link: "/inventory-list-01?mileage=50000-100000" },
    { name: "100,001 KM - 200,000 KM", link: "/inventory-list-01?mileage=100001-200000" },
    { name: "200,001 KM - 300,000 KM", link: "/inventory-list-01?mileage=200001-300000" },
    { name: "300,001 KM - 400,000 KM", link: "/inventory-list-01?mileage=300001-400000" },
    { name: "400,001 KM - 500,000 KM", link: "/inventory-list-01?mileage=400001-500000" },
    { name: "> 500,000 KM", link: "/inventory-list-01?mileage=>500000" },
  ];

  return (
    <footer className={parentClass}>
      <div className="footer-top">
        <div className="prima-container">
          <div className="right-box">
            {/* Other content if any */}
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="prima-container">
          <div className="row">
            {/* Footer Column Two */}
            <div className="footer-column-two col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                {/* Useful Links */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Useful Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Quick Links */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp" data-wow-delay="100ms">
                    <h4 className="widget-title">Quick Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {contactItems.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Brands */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp" data-wow-delay="200ms">
                    <h4 className="widget-title">Brands</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {brands.map((brand, i) => (
                          <li key={i}>
                            <Link to={`/inventory-list-01?brand=${encodeURIComponent(brand)}`}>
                              {brand}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Vehicles Status */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp" data-wow-delay="300ms">
                    <h4 className="widget-title">Vehicles Status</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {statuses.map((s, i) => (
                          <li key={i}>
                            <Link to={s.link}>{s.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Vehicle Mileage Column */}
            <div className="footer-column col-lg-3 col-md-12 col-sm-12">
              <div className="footer-widget links-widget wow fadeInUp" data-wow-delay="400ms">
                <h4 className="widget-title">Vehicle Mileage</h4>
                <div className="widget-content">
                  <ul className="user-links style-two">
                    {mileageRanges.map((m, i) => (
                      <li key={i}>
                        <Link to={m.link}>{m.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="prima-container">
          <div className="inner-container">
            <div className="copyright-text wow fadeInUp">
              © 2024{" "}
              <a
                href="https://themeforest.net/user/Prima Autoworld"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                Prima Autoworld
              </a>{" "}
              . All rights reserved.
            </div>
            <ul className="footer-nav wow fadeInUp" data-wow-delay="200ms">
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Notice</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
