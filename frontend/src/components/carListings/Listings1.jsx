import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../common/Pagination";
import SelectComponent from "../common/SelectComponent";

// Define your status options mapping.
const statusOptions = [
  { value: "1", label: "Available" },
  { value: "2", label: "Booked" },
  { value: "3", label: "Sold" },
];

// Helper function to convert a numeric status to its text label.
const getStatusLabel = (statusValue) => {
  const found = statusOptions.find((opt) => opt.value === String(statusValue));
  return found ? found.label : "N/A";
};

// Helper function to fetch the latest status record for a vehicle.
const fetchLatestStatus = async (vehicleId) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/vehicle_statuses/?vehicle=${vehicleId}`
    );
    if (res.data && res.data.length > 0) {
      // Sort the statuses descending by date and time.
      const sortedStatuses = res.data.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      });
      const latestStatus = sortedStatuses[0];
      return {
        status: getStatusLabel(latestStatus.status),
        description: latestStatus.description || "N/A",
      };
    }
  } catch (error) {
    console.error("Error fetching status for vehicle", vehicleId, error);
  }
  // Fallback values if no status is returned
  return { status: "Available", description: "N/A" };
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
  }).format(price);
};

const formatMileage = (mileage) => {
  return new Intl.NumberFormat("en-MY").format(mileage) + " KM";
};

export default function Listings1() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const location = useLocation();

  useEffect(() => {
    const fetchVehiclesWithStatus = async () => {
      try {
        // Fetch all vehicles from DRF.
        const response = await axios.get("http://127.0.0.1:8000/vehicles/");
        let vehicles = response.data;

        // Read search query parameters.
        const params = new URLSearchParams(location.search);
        // Use these defaults.
        const queryBrand = params.get("brand") || "Any Brand";
        const queryModel = params.get("model") || "Any Model";
        const queryPrice = params.get("price") || "Any Price";
        const queryStatus = params.get("status") || "Any Status";
        const queryMileage = params.get("mileage") || "Any Mileage";

        // Filter by Brand (substring, case-insensitive)
        if (queryBrand !== "Any Brand") {
          vehicles = vehicles.filter((v) =>
            v.brand && v.brand.toLowerCase().includes(queryBrand.toLowerCase())
          );
        }
        // Filter by Model (substring, case-insensitive)
        if (queryModel !== "Any Model") {
          vehicles = vehicles.filter((v) =>
            v.model && v.model.toLowerCase().includes(queryModel.toLowerCase())
          );
        }
        // Filter by Price Range if not default.
        if (queryPrice !== "Any Price") {
          // Expecting format: "RMX - RMY" (e.g., "RM10,000 - RM49,999")
          const [minStr, maxStr] = queryPrice
            .replace("RM", "")
            .split("-")
            .map((s) => s.trim().replace(/,/g, ""));
          const minPrice = Number(minStr);
          const maxPrice = Number(maxStr);
          vehicles = vehicles.filter((v) => {
            const priceNum = Number(v.price);
            return priceNum >= minPrice && priceNum <= maxPrice;
          });
        }
        // Note: Do not filter by status or mileage here because raw vehicles do not have those fields.

        // Map vehicles to our desired structure.
        const mappedCarsPromises = vehicles.map(async (vehicle) => {
          const statusData = await fetchLatestStatus(vehicle.vehicle_id);
          return {
            id: vehicle.vehicle_id,
            imgSrc:
              vehicle.images && vehicle.images.length > 0
                ? `http://127.0.0.1:8000${vehicle.images[0].image}`
                : "/images/resource/shop3-1.jpg",
            alt: `${vehicle.brand} ${vehicle.model}`,
            imgBoxClass: "image-box",
            status: statusData.status, // e.g. "Available"
            statusDescription: statusData.description,
            location: vehicle.location || "Garage",
            title: `${vehicle.brand} ${vehicle.model}`,
            description: `Manufacture Year: ${vehicle.manufacture_year}`,
            mileage: formatMileage(vehicle.mileage),
            mileageNum: Number(vehicle.mileage), // for filtering purposes
            price: formatPrice(vehicle.price),
            discountPrice: "RM90,000",
            btnDetails: "View Details",
          };
        });

        let mappedCars = await Promise.all(mappedCarsPromises);

        // Now apply filtering on the mappedCars array.
        // Filter by Status if not default.
        if (queryStatus !== "Any Status") {
          mappedCars = mappedCars.filter(
            (v) =>
              v.status && v.status.toLowerCase() === queryStatus.toLowerCase()
          );
        }
        // Filter by Mileage if not default.
        if (queryMileage !== "Any Mileage") {
          // Expected formats: "<50000", "50000-100000", ">500000"
          if (queryMileage.startsWith("<")) {
            const maxMileage = Number(queryMileage.replace("<", ""));
            mappedCars = mappedCars.filter((v) => v.mileageNum < maxMileage);
          } else if (queryMileage.startsWith(">")) {
            const minMileage = Number(queryMileage.replace(">", ""));
            mappedCars = mappedCars.filter((v) => v.mileageNum > minMileage);
          } else if (queryMileage.includes("-")) {
            const [minStr, maxStr] = queryMileage.split("-").map(Number);
            mappedCars = mappedCars.filter(
              (v) => v.mileageNum >= minStr && v.mileageNum <= maxStr
            );
          }
        }

        setCars(mappedCars);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehiclesWithStatus();
  }, [location.search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section className="cars-section-four v1 layout-radius">
        <div className="prima-container">
          <div className="prima-title-three wow fadeInUp">
            <ul className="breadcrumb">
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>List of Cars</h2>
          </div>
          <div className="text-box">
            <div className="text">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, cars.length)} of {cars.length} vehicles
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form_boxes v3">
                <small>Sort by</small>
                <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
              </div>
            </form>
          </div>
          <div className="row wow fadeInUp">
            {currentCars.map((car) => (
              <div
                key={car.id}
                className="car-block-four col-xl-3 col-lg-4 col-md-6 col-sm-6"
                style={{ minWidth: "329px", maxWidth: "329px", marginBottom: "20px" }}
              >
                <div className="inner-box">
                  <div className={car.imgBoxClass}>
                    <figure className="image">
                      <Link to={`/vehicle-details/${car.id}`}>
                        <img
                          alt={car.alt}
                          src={car.imgSrc}
                          width={329}
                          height={220}
                          style={{
                            objectFit: "cover",
                            width: "329px",
                            height: "220px",
                          }}
                        />
                      </Link>
                    </figure>
                    {car.icon && <span>{car.icon}</span>}
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <Link to={`/vehicle-details/${car.id}`}>
                        {car.title}
                      </Link>
                    </h6>
                    <div className="text">{car.description}</div>
                    <ul>
                      <li style={{ whiteSpace: "nowrap" }}>
                        <i className="flaticon-speedometer" /> {car.mileage}
                      </li>
                      <li>
                        <i className="flaticon-bookmark" /> {car.status}
                      </li>
                      <li>
                        <i className="flaticon-pin" /> {car.location}
                      </li>
                    </ul>
                    <div className="btn-box">
                      <span></span>
                      <small>{car.price}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-sec">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <Pagination
                  currentPage={currentPage}
                  totalItems={cars.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </ul>
              <div className="text">
                Showing results {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, cars.length)} of {cars.length}
              </div>
            </nav>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .car-block-four {
            width: 100% !important;
            max-width: 329px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
          }
          .prima-container {
            padding-left: 0;
            padding-right: 0;
          }
          .row {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
}
