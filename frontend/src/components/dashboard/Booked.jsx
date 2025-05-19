import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Booked() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 8;

  useEffect(() => {
    // Fetch vehicles, vehicle statuses, and statuses concurrently
    Promise.all([
      axios.get("http://127.0.0.1:8000/vehicles/"),
      axios.get("http://127.0.0.1:8000/vehicle_statuses/"),
      axios.get("http://127.0.0.1:8000/statuses/")
    ])
      .then(([vehicleRes, vehicleStatusRes, statusRes]) => {
        const allVehicles = vehicleRes.data; // Array of vehicles
        const allVehicleStatuses = vehicleStatusRes.data; // Array of vehicle status records
        const allStatuses = statusRes.data; // Array of statuses

        // Build a mapping from status_id to status_type in lowercase
        const statusMap = {};
        allStatuses.forEach((status) => {
          statusMap[status.status_id] = status.status_type.toLowerCase();
        });

        // Filter vehicle statuses that have a status of "booked"
        const bookedVehicleStatuses = allVehicleStatuses.filter((vs) => {
          // vs.status is a primary key; use statusMap to retrieve the actual status type
          return statusMap[vs.status] === "booked";
        });

        // For each booked status record, find the corresponding vehicle
        const bookedVehicles = bookedVehicleStatuses
          .map((vs) => {
            const vehicle = allVehicles.find((v) => v.vehicle_id === vs.vehicle);
            if (vehicle) {
              return {
                ...vehicle,
                status: "Booked"
              };
            }
            return null;
          })
          .filter((v) => v !== null);

        setVehicles(bookedVehicles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  // Pagination logic: calculate indices for slicing the vehicles array
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="dashboard-widget-two">
      <div className="right-box">
        <Sidebar />
        <div className="right-box-two">
          <div className="title-box">
            <h3 className="title">Total Booked</h3>
            <span>List of all booked vehicles</span>
          </div>
          {/* Vehicles Section */}
          <div className="cars-section-four">
            <div className="row wow fadeInUp">
              {currentVehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicle_id}
                  className="car-block-four col-xl-3 col-md-6"
                >
                  <div className="inner-box">
                    <div className="img-box-class">
                      <figure className="image">
                        <Link to={`/vehicle-details/${vehicle.vehicle_id}`}>
                          {vehicle.images && vehicle.images.length > 0 ? (
                            <img
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              // Ensure the image URL is complete: if it doesn't start with "http", prepend the server URL.
                              src={
                                vehicle.images[0].image.startsWith("http")
                                  ? vehicle.images[0].image
                                  : `http://127.0.0.1:8000${vehicle.images[0].image}`
                              }
                              style={{
                                width: "329px",
                                height: "220px",
                                objectFit: "cover",
                                border: "1px solid #ccc"
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "329px",
                                height: "220px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ccc"
                              }}
                            >
                              No image available
                            </div>
                          )}
                        </Link>
                      </figure>
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link to={`/vehicle-details/${vehicle.vehicle_id}`}>
                          {vehicle.brand} {vehicle.model}
                        </Link>
                      </h6>
                      <div className="text">
                        {vehicle.description || "No description provided."}
                      </div>
                      <ul>
                        <li>
                          <i className="flaticon-speedometer" /> {vehicle.mileage} km
                        </li>
                        <li>
                          <i className="flaticon-bookmark" /> {vehicle.status}
                        </li>
                        <li>
                          <i className="flaticon-pin" /> {vehicle.location}
                        </li>
                      </ul>
                      <div className="btn-box">
                        <span></span>
                        <small>{vehicle.price}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Section */}
            <div className="pagination-sec">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </ul>
                <div className="text">
                  Showing results {indexOfFirstVehicle + 1}-
                  {Math.min(indexOfLastVehicle, vehicles.length)} of {vehicles.length}
                </div>
              </nav>
            </div>
          </div>
          {/* End Vehicles Section */}
        </div>
      </div>
    </section>
  );
}
