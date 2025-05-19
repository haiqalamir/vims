import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PreviousOwnerOverview() {
  const { id } = useParams(); // For example: /vehicle-details/2 → id = "2"
  
  // Default details object when no matching data is found.
  const defaultDetails = {
    "Grant Number": "N/A",
    "Owner Name": "N/A",
    "Race": "N/A",
    "Address": "N/A",
    "Ownership End Date": "N/A",
  };

  // Helper function to format date strings.
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    // Options to display: numeric day, long month name, numeric year.
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateObj.toLocaleDateString("en-GB", options);
  };

  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Instead of relying on backend filtering, fetch all grants and then filter in the frontend.
    axios
      .get(`http://127.0.0.1:8000/grants/`)
      .then((grantResponse) => {
        const allGrants = grantResponse.data;
        // Filter grants by comparing the vehicle field with the id from the URL.
        const matchingGrants = allGrants.filter(
          (grant) => grant.vehicle === Number(id)
        );
        if (!matchingGrants || matchingGrants.length === 0) {
          // No matching grant record found for this vehicle.
          setOwnerDetails(defaultDetails);
          setLoading(false);
          return;
        }
        // For simplicity, take the first matching grant record.
        const grant = matchingGrants[0];
        
        // Check if grant.ownership is already an object
        if (grant.ownership && typeof grant.ownership === "object") {
          const detailsObject = {
            "Grant Number": grant.grant_number || "N/A",
            "Owner Name": grant.ownership.name || "N/A",
            "Race": grant.ownership.race || "N/A",
            "Address": grant.ownership.address || "N/A",
            "Ownership End Date": formatDate(grant.ownership.ownership_end_date),
          };
          setOwnerDetails(detailsObject);
          setLoading(false);
        } else {
          // Otherwise, assume it's an ID and fetch the ownership details.
          axios
            .get(`http://127.0.0.1:8000/ownerships/${grant.ownership}/`)
            .then((ownershipResponse) => {
              let owner = ownershipResponse.data;
              // If the ownership endpoint returns an array, take the first item.
              if (Array.isArray(owner)) {
                owner = owner[0];
              }
              const detailsObject = {
                "Grant Number": grant.grant_number || "N/A",
                "Owner Name": owner?.name || "N/A",
                "Race": owner?.race || "N/A",
                "Address": owner?.address || "N/A",
                "Ownership End Date": formatDate(owner?.ownership_end_date),
              };
              setOwnerDetails(detailsObject);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching ownership details:", error);
              setOwnerDetails(defaultDetails);
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching grant records:", error);
        setOwnerDetails(defaultDetails);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  // Convert the details object into an array.
  const details = Object.entries(ownerDetails).map(([label, value]) => ({
    label,
    value,
  }));

  // Split the details array into two columns.
  const midIndex = Math.ceil(details.length / 2);
  const leftDetails = details.slice(0, midIndex);
  const rightDetails = details.slice(midIndex);

  return (
    <>
      <h4 className="title">
        <br />Previous Owner Details
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
