import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SelectComponent from "@/components/common/SelectComponent";

export default function Hero() {
  const navigate = useNavigate();

  // Set default values for each search field.
  const [brand, setBrand] = useState("Any Brand");
  const [model, setModel] = useState("Any Model");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [status, setStatus] = useState("Any Status");

  // When the form is submitted, build a query string and navigate to inventory-list-01.
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      brand: brand.trim(),
      model: model.trim(),
      price: priceRange,
      status: status,
    });
    console.log("Submitting with query:", params.toString());
    navigate({
      pathname: "/inventory-list-01",
      search: `?${params.toString()}`,
    });
  };

  // Inline style for centering inputs within their container.
  const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
  };

  // Inline style for the text inputs.
  const inputStyle = {
    width: "80%",
    textAlign: "center",
    padding: "10px",
    background: "transparent",
    outline: "none",
  };

  return (
    <section className="prima-banner-section-five">
      <div className="banner-content-three">
        <div className="prima-container">
          <div className="banner-content">
            <span className="wow fadeInUp">Welcome Back Sales Agent!</span>
            <h2 className="wow fadeInUp" data-wow-delay="100ms">
              Search For Cars
            </h2>
            <div className="form-tabs wow fadeInUp" data-wow-delay="200ms">
              <div className="form-tab-pane current" id="tab-1">
                <form onSubmit={handleSubmit}>
                  <div className="form_boxes" style={inputContainerStyle}>
                    {/* Text input for Brand */}
                    <input
                      type="text"
                      placeholder="Brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div className="form_boxes" style={inputContainerStyle}>
                    {/* Text input for Model */}
                    <input
                      type="text"
                      placeholder="Model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div className="form_boxes">
                    {/* Dropdown for Price Range */}
                    <SelectComponent
                      options={[
                        "Any Price",
                        "RM0 - RM9,999",
                        "RM10,000 - RM49,999",
                        "RM50,000 - RM99,999",
                      ]}
                      value={priceRange}
                      onChange={(val) => setPriceRange(val)}
                    />
                  </div>
                  <div className="form_boxes">
                    {/* Dropdown for Status */}
                    <SelectComponent
                      options={["Any Status", "Available", "Booked", "Sold"]}
                      value={status}
                      onChange={(val) => setStatus(val)}
                    />
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      <i className="flaticon-search" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="image-column">
              <div className="image-box">
                <figure className="image">
                  <Link to={`/inventory-list-01`}>
                    <img
                      alt=""
                      src="/images/banner/mazda.png"
                      width={1216}
                      height={738}
                    />
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
