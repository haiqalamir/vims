import Sidebar from "./Sidebar";
import Pagination from "../common/Pagination";
import SelectComponent from "../common/SelectComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Added toast import
import 'react-toastify/dist/ReactToastify.css';

// Define status options for converting numeric values to text
const statusOptions = [
  { value: "1", label: "Available" },
  { value: "2", label: "Booked" },
  { value: "3", label: "Sold" },
];

export default function MyListings() {
  const [vehicleList, setVehicleList] = useState([]);
  const [statusMap, setStatusMap] = useState({}); // { vehicle_id: { status, description } }
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const itemsPerPage = 10;

  // Fetch vehicles from DRF API when component mounts
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/vehicles/");
      setVehicleList(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // When vehicleList is fetched, fetch status for each vehicle
  useEffect(() => {
    if (vehicleList.length > 0) {
      const fetchStatuses = async () => {
        try {
          // Create an array of promises, one per vehicle
          const requests = vehicleList.map((v) =>
            axios
              .get(`http://127.0.0.1:8000/vehicle_statuses/?vehicle=${v.vehicle_id}`)
              .then((res) => ({ vehicle_id: v.vehicle_id, data: res.data }))
              .catch((err) => {
                console.error(`Error fetching status for vehicle ${v.vehicle_id}:`, err);
                return { vehicle_id: v.vehicle_id, data: [] };
              })
          );

          // Wait for all requests to complete
          const results = await Promise.all(requests);

          // Build a new status map from the results
          const newStatusMap = {};
          results.forEach((result) => {
            if (result.data && result.data.length > 0) {
              const statusRecord = result.data[0]; // Use the first record
              newStatusMap[result.vehicle_id] = {
                status: statusRecord.status, // numeric value
                description: statusRecord.description || "N/A",
              };
            } else {
              newStatusMap[result.vehicle_id] = {
                status: "N/A",
                description: "N/A",
              };
            }
          });

          setStatusMap(newStatusMap);
        } catch (error) {
          console.error("Error fetching statuses:", error);
        }
      };

      fetchStatuses();
    }
  }, [vehicleList]);

  // Delete vehicle with confirmation popup using toast for notifications
  const handleDelete = (vehicleId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this vehicle? This will delete all related data as well.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/vehicles/${vehicleId}/`);
              toast.success("Vehicle deleted successfully!");
              fetchVehicles();
            } catch (error) {
              console.error("Error deleting vehicle:", error);
              toast.error("Error deleting vehicle. Please check the console for details.");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  // Helper: Convert numeric status to text label
  const getStatusLabel = (statusValue) => {
    const found = statusOptions.find(opt => opt.value === String(statusValue));
    return found ? found.label : "N/A";
  };

  // --- Filtering and Sorting ---
  // Filter vehicles by search term (brand & model combined)
  const filteredVehicles = vehicleList.filter(vehicle => {
    const term = searchTerm.toLowerCase();
    const combined = `${vehicle.brand} ${vehicle.model}`.toLowerCase();
    return combined.includes(term);
  });

  // Sort vehicles based on "Newest" or "Oldest" using date_added and time_added
  const sortedVehicles = filteredVehicles.sort((a, b) => {
    const dateA = new Date(`${a.date_added}T${a.time_added}`);
    const dateB = new Date(`${b.date_added}T${b.time_added}`);
    if (sortOption === "Newest") {
      return dateB - dateA; // descending
    } else {
      return dateA - dateB; // ascending
    }
  });

  // Calculate pagination for sorted vehicles
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = sortedVehicles.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Vehicles Listing</h3>
              <div className="text">List of all vehicles in the database</div>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="cart-table">
                <div className="title-listing">
                  <div className="box-ip-search">
                    <span className="icon">
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.29301 0.287598C2.9872 0.287598 0.294312 2.98048 0.294312 6.28631C0.294312 9.59211 2.9872 12.2902 6.29301 12.2902C7.70502 12.2902 9.00364 11.7954 10.03 10.9738L12.5287 13.4712C12.6548 13.5921 12.8232 13.6588 12.9979 13.657C13.1725 13.6552 13.3395 13.5851 13.4631 13.4617C13.5867 13.3382 13.6571 13.1713 13.6591 12.9967C13.6611 12.822 13.5947 12.6535 13.474 12.5272L10.9753 10.0285C11.7976 9.00061 12.293 7.69995 12.293 6.28631C12.293 2.98048 9.59882 0.287598 6.29301 0.287598ZM6.29301 1.62095C8.87824 1.62095 10.9584 3.70108 10.9584 6.28631C10.9584 8.87153 8.87824 10.9569 6.29301 10.9569C3.70778 10.9569 1.62764 8.87153 1.62764 6.28631C1.62764 3.70108 3.70778 1.62095 6.29301 1.62095Z"
                          fill="#050B20"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search Cars eg. Audi Q7"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <div className="text-box v1">
                    <div className="form_boxes v3">
                      <small>Sort by</small>
                      <SelectComponent
                        options={["Newest", "Oldest"]}
                        value={sortOption}
                        onChange={(option) => {
                          setSortOption(option);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Brand & Model with Price</th>
                      <th>Manufacture Year</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Status Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVehicles.map((vehicle) => (
                      <tr key={vehicle.vehicle_id}>
                        {/* Image */}
                        <td>
                          <div className="shop-cart-product">
                            <div className="shop-product-cart-img">
                            <img
  alt={vehicle.brand}
  src={
    vehicle.images && vehicle.images.length > 0
      ? `http://127.0.0.1:8000${vehicle.images[0].image}`
      : "/images/resource/default-car.jpg"
  }
  width={120}
  height={105}
  style={{
    transition: "transform 0.3s",
    objectFit: "cover",
    transform: "scale(1.3)", // default zoomed in
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.transform = "scale(1.8)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.transform = "scale(1.3)")
  }
/>


                            </div>
                          </div>
                        </td>
                        {/* Brand & Model with Price */}
                        <td>
                          <div className="shop-cart-product">
                            <div className="shop-product-cart-info">
                              <h3>
                                <a href="#" title={vehicle.brand}>
                                  {vehicle.brand} {vehicle.model}
                                </a>
                              </h3>
                              <div className="price">
                                <span>{vehicle.price ? `RM${vehicle.price}` : ""}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Manufacture Year */}
                        <td>
                          <span>{vehicle.manufacture_year}</span>
                        </td>
                        {/* Location */}
                        <td>
                          <span>{vehicle.location}</span>
                        </td>
                        {/* Status */}
                        <td>
                          <span>
                            {statusMap[vehicle.vehicle_id]
                              ? getStatusLabel(statusMap[vehicle.vehicle_id].status)
                              : "N/A"}
                          </span>
                        </td>
                        {/* Status Description */}
                        <td>
                          <span>
                            {statusMap[vehicle.vehicle_id]
                              ? statusMap[vehicle.vehicle_id].description
                              : "N/A"}
                          </span>
                        </td>
                        {/* Action */}
                        <td>
                          <button 
                            onClick={() => handleDelete(vehicle.vehicle_id)}
                            className="remove-cart-item"
                            style={{ background: "none", border: "none" }}
                          >
                            <img
                              alt="Remove item"
                              src="/images/icons/remove.svg"
                              width={18}
                              height={18}
                            />
                          </button>
                          <Link 
                            to={`/edit-listings/${vehicle.vehicle_id}`}
                            className="remove-cart-item"
                          >
                            <img
                              alt="Edit item"
                              src="/images/icons/edit.svg"
                              width={18}
                              height={18}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-sec">
                  <nav aria-label="Page navigation example">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={sortedVehicles.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                    <div className="text">
                      Showing results {indexOfFirstItem + 1}-
                      {Math.min(indexOfLastItem, sortedVehicles.length)} of {sortedVehicles.length}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer for toast popups */}
      <ToastContainer />
    </section>
  );
}
