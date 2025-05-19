import { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./Charts";
import Sidebar from "./Sidebar";
import SelectComponent from "../common/SelectComponent";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    available: 0,
    sold: 0,
    booked: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch vehicles, vehicle statuses, and statuses concurrently from DRF
    Promise.all([
      axios.get("http://127.0.0.1:8000/vehicles/"),
      axios.get("http://127.0.0.1:8000/vehicle_statuses/"),
      axios.get("http://127.0.0.1:8000/statuses/"),
    ])
      .then(([vehiclesRes, vsRes, statusesRes]) => {
        const vehicles = vehiclesRes.data;
        const vsRecords = vsRes.data;
        const statuses = statusesRes.data;

        // Total vehicles count from the vehicles endpoint
        const total = vehicles.length;

        // Build a mapping from status_id to its status_type (converted to lowercase)
        const statusMap = {};
        statuses.forEach((s) => {
          statusMap[s.status_id] = s.status_type.toLowerCase();
        });

        // Count the vehicle statuses based on the mapping.
        // This assumes that each vehicle has a status record.
        let sold = 0,
          booked = 0,
          available = 0;
        vsRecords.forEach((record) => {
          const type = statusMap[record.status];
          if (type === "sold") {
            sold++;
          } else if (type === "booked") {
            booked++;
          } else if (type === "available") {
            available++;
          }
        });

        setCounts({
          total,
          sold,
          booked,
          available,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Build the listing items array dynamically using counts from DRF
  const listingItems = [
    {
      label: "Total Vehicles in Database",
      value: counts.total,
      imgSrc: "/images/icons/cv1.svg",
      imgWidth: 34,
      imgHeight: 34,
      iconClass: "v3",
    },
    {
      label: "Total Vehicles Available",
      value: counts.available,
      imgSrc: "/images/icons/lob1.svg",
      imgWidth: 28,
      imgHeight: 28,
      iconClass: "v3",
    },
    {
      label: "Total Vehicles Sold",
      value: counts.sold,
      imgSrc: "/images/icons/cart1.svg",
      imgWidth: 30,
      imgHeight: 30,
      iconClass: "v3",
    },
    {
      label: "Total Booked",
      value: counts.booked,
      imgSrc: "/images/icons/cart4.svg",
      imgWidth: 24,
      imgHeight: 24,
      iconClass: "v3",
    },
  ];

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Dashboard</h3>
              <div className="text">Overview of the data in the system</div>
            </div>
            <div className="row">
              {listingItems.map((item, index) => (
                <div className="col-xl-3 col-lg-12" key={index}>
                  <div className="uii-item">
                    <span>{item.label}</span>
                    <h3>{item.value}</h3>
                    <div className={`ui-icon ${item.iconClass}`}>
                      <img
                        alt={item.label}
                        width={item.imgWidth}
                        height={item.imgHeight}
                        src={item.imgSrc}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="graph-content">
              <div className="row">
                <div className="col-xl-12">
                  <div className="widget-graph">
                    <div className="graph-head">
                      <h3>Sold Vehicles Statistic</h3>
                    </div>
                    <div className="widget-content">
                      <LineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
