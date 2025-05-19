import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Overview() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/vehicles/${id}/`)
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
      });
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  // Map the API fields into a simple array of details.
  // The API is assumed to return: vehicle_id, brand, model, manufacture_year, mileage, price, status, location.
  const details = [
    { label: "Brand", value: vehicle.brand || "N/A" },
    { label: "Model", value: vehicle.model || "N/A" },
    { label: "Manufacture Year", value: vehicle.manufacture_year || "N/A" },
    { label: "Mileage", value: vehicle.mileage ? vehicle.mileage.toLocaleString() + " km" : "N/A" },
    { label: "Price", value: vehicle.price ? "RM " + parseFloat(vehicle.price).toLocaleString() : "N/A" },

    { label: "Location", value: vehicle.location || "N/A" },
  ];

  // Split the details into two columns for a balanced layout.
  const midIndex = Math.ceil(details.length / 2);
  const leftDetails = details.slice(0, midIndex);
  const rightDetails = details.slice(midIndex);

  return (
    <>
      <h4 className="title">Car Overview</h4>
      <div className="row">
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {leftDetails.map((detail, index) => (
                <li key={index}>
                  <span>{detail.label}</span> {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {rightDetails.map((detail, index) => (
                <li key={index}>
                  <span>{detail.label}</span> {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
