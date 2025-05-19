import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Cars2() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vehicles/")
      .then((response) => {
        // Assume response.data is an array of vehicles from DRF with nested images field
        const apiCars = response.data;

        // Sort vehicles descending by date_added and time_added.
        const sortedCars = apiCars.sort((a, b) => {
          const dateA = new Date(`${a.date_added}T${a.time_added}`);
          const dateB = new Date(`${b.date_added}T${b.time_added}`);
          return dateB - dateA; // Descending order
        });

        // Take the top 10 latest vehicles.
        const top10 = sortedCars.slice(0, 10);

        // Map API vehicle to structure expected by the slider.
        const mappedCars = top10.map((vehicle) => {
          const title = `${vehicle.brand || "Unknown Brand"} ${vehicle.model || "Unknown Model"}`;

          // Retrieve image from the vehicle.images array if available.
          let imageUrl = "/images/dummy-car.jpg"; // default fallback image
          if (vehicle.images && vehicle.images.length > 0) {
            imageUrl = vehicle.images[0].image; // using the first image
            // Prepend base URL if the image URL is relative.
            if (!imageUrl.startsWith("http")) {
              imageUrl = `http://127.0.0.1:8000${imageUrl}`;
            }
          }

          return {
            id: vehicle.vehicle_id,
            images: [imageUrl],
            badge: vehicle.status || "Latest",
            title: title,
            description: `Manufacture Year: ${vehicle.manufacture_year || "N/A"}`,
            specs: [
              {
                icon: "flaticon-gasoline-pump",
                text: vehicle.mileage
                  ? vehicle.mileage.toLocaleString() + " km"
                  : "(api placeholder)",
              },
              {
                icon: "flaticon-bookmark",
                text: "Available", // Dummy value; update if needed
              },
              {
                icon: "flaticon-pin",
                text: "Garage", // Dummy value; update if needed
              },
            ],
            price: vehicle.price
              ? "RM " + parseFloat(vehicle.price).toLocaleString()
              : "(api placeholder)",
            oldPrice: vehicle.price
              ? "RM " + parseFloat(vehicle.price).toLocaleString()
              : "",
            imgBoxClass: "image-box", // or "image-box two" based on your criteria
            alt: title,
          };
        });

        setCars(mappedCars);
      })
      .catch((error) => {
        console.error("Error fetching latest vehicles:", error);
      });
  }, []);

  const sliderSettings = {
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: true,
    className: "row car-slider-three",
  };

  return (
    <section className="cars-section-seven pt-0">
      <div className="prima-container">
        <div className="prima-title text-center wow fadeInUp">
          <h2>Latest Cars</h2>
        </div>
        <Slider {...sliderSettings}>
          {cars.map((car, index) => (
            <div key={index} className="box-car car-block-five col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box">
                <div className={`image-box ${car.badge === "Great Price" ? "two" : ""}`}>
                  <div className="slider-thumb">
                    <div className="image">
                      <Link to={`/vehicle-details/${car.id}`}>
                        <img
                          alt={car.alt}
                          src={car.images[0]}
                          style={{
                            width: "329px",
                            height: "220px",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  <Link to={`/vehicle-details/${car.id}`} title="" className="icon-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_601_1274)">
                        <path
                          d="M9.39062 12C9.15156 12 8.91671 11.9312 8.71128 11.8009L6.11794 10.1543C6.04701 10.1091 5.95296 10.1096 5.88256 10.1543L3.28869 11.8009C2.8048 12.1082 2.13755 12.0368 1.72722 11.6454C1.47556 11.4047 1.33685 11.079 1.33685 10.728V1.2704C1.33738 0.570053 1.90743 0 2.60778 0H9.39272C10.0931 0 10.6631 0.570053 10.6631 1.2704V10.728C10.6631 11.4294 10.0925 12 9.39062 12ZM6.00025 9.06935C6.24193 9.06935 6.47783 9.13765 6.68169 9.26743L9.27503 10.9135C9.31233 10.9371 9.35069 10.9487 9.39114 10.9487C9.48046 10.9487 9.61286 10.8788 9.61286 10.728V1.2704C9.61233 1.14956 9.51356 1.05079 9.39272 1.05079H2.60778C2.48642 1.05079 2.38817 1.14956 2.38817 1.2704V10.728C2.38817 10.7911 2.41023 10.8436 2.45384 10.8851C2.52582 10.9539 2.63563 10.9708 2.72599 10.9135L5.31934 9.2669C5.52267 9.13765 5.75857 9.06935 6.00025 9.06935Z"
                          fill="black"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_601_1274">
                          <rect width="12" height="12" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
                <div className="content-box">
                  <h6 className="title">
                    <Link to={`/vehicle-details/${car.id}`}>{car.title}</Link>
                  </h6>
                  <div className="text">{car.description}</div>
                  <ul>
                    {car.specs.map((spec, i) => (
                      <li key={i}>
                        <i className={spec.icon} /> {spec.text}
                      </li>
                    ))}
                  </ul>
                  <div className="btn-box">
                    <span></span>
                    <small>{car.price}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
