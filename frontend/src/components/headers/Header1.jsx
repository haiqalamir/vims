import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

export default function Header1({
  headerClass = "header-style-v1 header-default",
  white = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleSearchList, setVehicleSearchList] = useState([]);
  const navigate = useNavigate();

  // Fetch vehicles from DRF API for search purposes
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vehicles/")
      .then((response) => {
        setVehicleSearchList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles for search:", error);
      });
  }, []);

  // Handlers for search box focus/blur remain unchanged
  const handleFocus = () => {
    const box = document.getElementById("box-content-search");
    if (box) {
      box.classList.add("active");
      const layout = box.closest(".layout-search");
      if (layout) layout.classList.add("active");
    }
  };

  const handleBlur = () => {
    const box = document.getElementById("box-content-search");
    if (box) {
      box.classList.remove("active");
      const layout = box.closest(".layout-search");
      if (layout) layout.classList.remove("active");
    }
  };

  // Filter vehicles based on search query (brand and model) and limit to max 5 results
  const filteredVehicles = vehicleSearchList
    .filter((vehicle) => {
      const title = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
      return title.includes(searchQuery.toLowerCase());
    })
    .slice(0, 5);

  // Logout handler: clear tokens from localStorage and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className={`prima-header ${headerClass}`}>
      <div className="header-inner">
        <div className="inner-container">
          {/* Main Box */}
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link to={`/`}>
                  {white ? (
                    <img
                      alt="Prima"
                      title="Prima"
                      src="/images/logo2.svg"
                      width="108"
                      height="26"
                    />
                  ) : (
                    <img
                      alt="Prima"
                      title="Prima"
                      src="/images/logo.svg"
                      width={108}
                      height={26}
                    />
                  )}
                </Link>
              </div>

              <div className="layout-search">
                <div className="search-box">
                  <svg
                    className="icon"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.29301 1.2876C3.9872 1.2876 1.29431 3.98048 1.29431 7.28631C1.29431 10.5921 3.9872 13.2902 7.29301 13.2902C8.70502 13.2902 10.0036 12.7954 11.03 11.9738L13.5287 14.4712C13.6548 14.5921 13.8232 14.6588 13.9979 14.657C14.1725 14.6552 14.3395 14.5851 14.4631 14.4617C14.5867 14.3382 14.6571 14.1713 14.6591 13.9967C14.6611 13.822 14.5947 13.6535 14.474 13.5272L11.9753 11.0285C12.7976 10.0006 13.293 8.69995 13.293 7.28631C13.293 3.98048 10.5988 1.2876 7.29301 1.2876ZM7.29301 2.62095C9.87824 2.62095 11.9584 4.70108 11.9584 7.28631C11.9584 9.87153 9.87824 11.9569 7.29301 11.9569C4.70778 11.9569 2.62764 9.87153 2.62764 7.28631C2.62764 4.70108 4.70778 2.62095 7.29301 2.62095Z"
                      fill="white"
                    />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search Cars eg. Audi Q7"
                    className="show-search"
                    name="name"
                    tabIndex={2}
                    autoComplete="off"
                    value={searchQuery}
                    aria-required="true"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="box-content-search" id="box-content-search">
                  <ul className="box-car-search">
                    {filteredVehicles.length > 0 ? (
                      filteredVehicles.map((vehicle) => {
                        const title = `${vehicle.brand} ${vehicle.model}`;
                        // Determine the image URL with fallback
                        let imageUrl = "/images/resource/default-car.jpg";
                        if (vehicle.images && vehicle.images.length > 0) {
                          imageUrl = vehicle.images[0].image;
                          if (!imageUrl.startsWith("http")) {
                            imageUrl = `http://127.0.0.1:8000${imageUrl}`;
                          }
                        }
                        return (
                          <li key={vehicle.vehicle_id}>
                            <Link
                              to={`/vehicle-details/${vehicle.vehicle_id}`}
                              className="car-search-item"
                            >
                              <div className="box-img">
                                <img
                                  alt={title}
                                  src={imageUrl}
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                  }}
                                />
                              </div>
                              <div className="info">
                                <p className="name">{title}</p>
                                <span className="price">
                                  {vehicle.price
                                    ? `RM ${parseFloat(vehicle.price).toLocaleString()}`
                                    : "N/A"}
                                </span>
                                <span className="year">
                                  {vehicle.manufacture_year || "N/A"}
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li>No matching vehicles found</li>
                    )}
                  </ul>
                  <Link to={`/inventory-list-01`} className="btn-view-search">
                    View more
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3114_6864)">
                        <path
                          d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                          fill="#405FF2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3114_6864">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* Nav Box */}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End */}
            </div>
            <div className="right-box">
              <Link to={`/login`} title="" className="box-account"></Link>

              <div className="btn">
                {/* Changed Logout link to a button that calls handleLogout */}
                <button
                  onClick={handleLogout}
                  className="header-btn-two"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
              <div className="mobile-navigation">
                {white ? (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="#050B20" />
                      <rect y={9} width={22} height={2} fill="#050B20" />
                    </svg>
                  </a>
                ) : (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="white" />
                      <rect y={9} width={22} height={2} fill="white" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
        </div>
      </div>
      {/* Header Search */}
      <div className="search-popup">
        <span className="search-back-drop" />
        <button className="close-search">
          <span className="fa fa-times" />
        </button>
        <div className="search-inner">
          <form onSubmit={(e) => e.preventDefault()} method="post">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                defaultValue=""
                placeholder="Search..."
                required
              />
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}
