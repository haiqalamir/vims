import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Define your status options mapping
const statusOptions = [
  { value: "1", label: "Available" },
  { value: "2", label: "Booked" },
  { value: "3", label: "Sold" },
];

// Helper function: converts numeric status to its text label.
const getStatusLabel = (statusValue) => {
  const found = statusOptions.find((opt) => opt.value === String(statusValue));
  return found ? found.label : "N/A";
};

export default function StatusOverview() {
  const { id } = useParams(); // e.g., /vehicle-details/2 → id = "2"

  // Default details if no status record is found.
  const defaultDetails = {
    "Current Status": "N/A",
    "Status Description": "N/A",
  };

  const [statusDetails, setStatusDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statuses filtered by vehicle id
    axios
      .get(`http://127.0.0.1:8000/vehicle_statuses/?vehicle=${id}`)
      .then((response) => {
        const statuses = response.data;
        if (!statuses || statuses.length === 0) {
          setStatusDetails(defaultDetails);
          setLoading(false);
          return;
        }
        // Sort statuses by date and time descending so that the latest comes first.
        const sortedStatuses = statuses.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB - dateA;
        });
        const latestStatus = sortedStatuses[0];
        const detailsObject = {
          "Current Status": getStatusLabel(latestStatus.status),
          "Status Description": latestStatus.description || "N/A",
        };
        setStatusDetails(detailsObject);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle status:", error);
        setStatusDetails(defaultDetails);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  // Convert the details object into an array for easier rendering.
  const detailsArray = Object.entries(statusDetails).map(([label, value]) => ({
    label,
    value,
  }));

  // Split details into two columns.
  const midIndex = Math.ceil(detailsArray.length / 2);
  const leftDetails = detailsArray.slice(0, midIndex);
  const rightDetails = detailsArray.slice(midIndex);

  return (
    <>
      <h4 className="title">
        <br />
        Status
      </h4>
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
