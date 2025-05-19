import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectComponent from "../common/SelectComponent";

export default function AddListings() {
  // --- Images & Attachments State (Unchanged) ---
  const [images, setImages] = useState([
    "/images/resource/list2-1.png",

  ]);

// (Keep your existing state for image previews in "images")
const [mediaFiles, setMediaFiles] = useState([]);
// New state to hold the selected vehicle (as a string) for media uploads
const [mediaVehicleId, setMediaVehicleId] = useState("");

// Use your existing handleImageChange for media as well (or reuse the same if appropriate)
const handleMediaImageChange = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    const newImages = [...images];
    newImages[index] = reader.result;
    setImages(newImages);
  };
  reader.readAsDataURL(file);

  // Update mediaFiles array properly
  setMediaFiles(prev => [...prev, file]);

  useEffect(() => {
    console.log("Updated mediaFiles:", mediaFiles);
  }, [mediaFiles]);
};


const handleMediaSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting media files:", mediaFiles);
  console.log("Selected Vehicle ID:", mediaVehicleId);

  const vehicleId = Number(mediaVehicleId); 
  if (!vehicleId) {
    window.alert("Please select a valid vehicle.");
    return;
  }

  if (mediaFiles.length === 0) {
    window.alert("Please select at least one image.");
    return;
  }

  const formData = new FormData();
  formData.append("vehicle", vehicleId);

  mediaFiles.forEach(file => {
    formData.append("image", file);
  });

  console.log("Sending formData:", [...formData.entries()]);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/vehicle_images/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    window.alert("Images uploaded successfully!");
    console.log("Media upload response:", response.data);

    setMediaFiles([]);  // Clear state after successful upload
  } catch (error) {
    console.error("Error uploading images:", error.response?.data || error);
    window.alert("Error uploading images. Check console for details.");
  }
};

  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
  };

  const [images2, setImages2] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);

  const handleImageChange2 = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images2];
        newImages[index] = file.name;
        setImages2(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete2 = (index) => {
    const newImages = images2.filter((_, imgIndex) => imgIndex !== index);
    setImages2(newImages);
  };

  // --- Car Details State (Car Details Tab) ---
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    manufacture_year: "",
    mileage: "",
    price: "",
    location: "Garage",
  });

    // --- Previous Owner Tab State ---
    const [prevOwnerVehicleId, setPrevOwnerVehicleId] = useState("");
    const [prevOwnerDetails, setPrevOwnerDetails] = useState({
      grant_number: "",
      owner_name: "",
      race: "",
      address: "",
      ownership_end_date: "",
    });

    const handlePrevOwnerSubmit = (e) => {
      e.preventDefault();
      // Validate required fields
      if (!prevOwnerVehicleId || !prevOwnerDetails.grant_number || !prevOwnerDetails.owner_name) {
        window.alert("Please fill in the required previous owner details and select a vehicle.");
        return;
      }
      const payload = {
        grant_number: prevOwnerDetails.grant_number,
        vehicle: Number(prevOwnerVehicleId),
        ownership: {
          name: prevOwnerDetails.owner_name,
          race: prevOwnerDetails.race,
          address: prevOwnerDetails.address,
          ownership_end_date: prevOwnerDetails.ownership_end_date,
        },
      };
      axios
        .post("http://127.0.0.1:8000/grants/", payload)
        .then((response) => {
          window.alert("Previous owner details submitted successfully!");
          console.log("Previous owner response:", response.data);
        })
        .catch((error) => {
          window.alert("Error submitting previous owner details.");
          console.error("Error:", error.response ? error.response.data : error);
        });
    };

  const handleCarDetailChange = (field, value) => {
    setCarDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleCarDetailsSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...carDetails,
      manufacture_year: Number(carDetails.manufacture_year),
      mileage: Number(carDetails.mileage),
      price: Number(carDetails.price),
    };

    axios
      .post("http://127.0.0.1:8000/vehicles/", payload)
      .then((response) => {
        window.alert("Vehicle added successfully!");
        console.log("Vehicle added successfully:", response.data);
      })
      .catch((error) => {
        window.alert("Error adding vehicle. Please try again.");
        console.error("Error adding vehicle:", error);
      });
  };

  // --- Fetch Vehicle List for Price & Status Tabs ---
  const [vehicleList, setVehicleList] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vehicles/")
      .then((response) => {
        console.log("Fetched vehicles:", response.data);
        setVehicleList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);
  

    // Build options for vehicle dropdowns (as strings)
    const vehicleOptions = vehicleList.map((v) => ({
      value: v.vehicle_id, // return the vehicle id (a number)
      label: `${v.brand} ${v.model} (ID: ${v.vehicle_id})`
    }));
    
  // --- Price Tab State ---
  const [priceVehicleId, setPriceVehicleId] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    if (!priceVehicleId || !priceValue) {
      window.alert("Please select a vehicle and enter a price.");
      return;
    }
    // Using PATCH instead of PUT
    axios
      .patch(`http://127.0.0.1:8000/vehicles/${priceVehicleId}/`, {
        price: Number(priceValue),
      })
      .then((response) => {
        window.alert("Price updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating price:",
          error.response ? error.response.data : error
        );
        window.alert("Error updating price. Please check the console for details.");
      });
  };

  // --- Status Tab State ---
  const [statusVehicleId, setStatusVehicleId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // "1" = Available, "2" = Booked, "3" = Sold
  const [statusDescription, setStatusDescription] = useState("");

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!statusVehicleId || !selectedStatus) {
      window.alert("Please select a vehicle and choose a status.");
      return;
    }
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(" ")[0];  // HH:MM:SS

    // Note: Here we send the foreign keys with the names expected by the serializer.
    axios
      .post("http://127.0.0.1:8000/vehicle_statuses/", {
        vehicle: Number(statusVehicleId),   // Use the field name as defined in your model/serializer
        status: Number(selectedStatus),       // Use the field name as defined in your model/serializer
        description: statusDescription,
        date: date,
        time: time,
      })
      .then((response) => {
        window.alert("Status updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating status:",
          error.response ? error.response.data : error
        );
        window.alert("Error updating status. Please check the console for details.");
      });
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Add/Edit Listings</h3>
              <div className="text">
                Make sure all the data are correctly entered!
              </div>
            </div>
            <div className="form-box">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {/* Car Details Tab */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Car Details
                  </button>
                </li>
                {/* Price Tab */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Price
                  </button>
                </li>
                {/* Status Tab */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Status
                  </button>
                </li>
                {/* Media Tab */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="media-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#media"
                    type="button"
                    role="tab"
                    aria-controls="media"
                    aria-selected="false"
                  >
                    Media
                  </button>
                </li>
                {/* Previous Owner Tab */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="previous-owner-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#previous-owner"
                    type="button"
                    role="tab"
                    aria-controls="previous-owner"
                    aria-selected="false"
                  >
                    Previous Owner
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {/* --- Car Details Tab Content (Unchanged) --- */}
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <form onSubmit={handleCarDetailsSubmit} className="row">
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Brand</label>
                        <input
                          type="text"
                          value={carDetails.brand}
                          onChange={(e) =>
                            handleCarDetailChange("brand", e.target.value)
                          }
                          placeholder="Enter Brand"
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Model</label>
                        <input
                          type="text"
                          value={carDetails.model}
                          onChange={(e) =>
                            handleCarDetailChange("model", e.target.value)
                          }
                          placeholder="Enter Model"
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Manufacture Year</label>
                        <input
                          type="number"
                          value={carDetails.manufacture_year}
                          onChange={(e) =>
                            handleCarDetailChange("manufacture_year", e.target.value)
                          }
                          placeholder="Enter Year"
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Mileage</label>
                        <input
                          type="number"
                          value={carDetails.mileage}
                          onChange={(e) =>
                            handleCarDetailChange("mileage", e.target.value)
                          }
                          placeholder="Enter Mileage"
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Price</label>
                        <input
                          type="number"
                          value={carDetails.price}
                          onChange={(e) =>
                            handleCarDetailChange("price", e.target.value)
                          }
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Location</label>
                        <SelectComponent
  options={[{ value: "Garage", label: "Garage" }]}
  value={carDetails.location}
  onChange={(val) => handleCarDetailChange("location", val)}
/>

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Submit Vehicle
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* --- Price Tab Content (Modified) --- */}
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <form onSubmit={handlePriceSubmit} className="row">
                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Vehicle</label>
                        <SelectComponent
  options={[{ value: "", label: "Select Vehicle" }, ...vehicleOptions]}
  value={priceVehicleId}
  onChange={(val) => {
    console.log("Price dropdown selected:", val);
    setPriceVehicleId(val);
  }}
/>

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_boxes v2">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          value={priceValue}
                          onChange={(e) => setPriceValue(e.target.value)}
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Submit Price
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* --- Status Tab Content (Modified) --- */}
                <div
                  className="tab-pane fade cheak-box-sec style1"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >

                  <form onSubmit={handleStatusSubmit} className="row">
                  <div className="col-lg-12"> 
                  <div className="form_boxes">
                    <label>Vehicle</label>
                    <SelectComponent
  options={[{ value: "", label: "Select Vehicle" }, ...vehicleOptions]}
  value={statusVehicleId}
  onChange={(val) => {
    console.log("Status dropdown selected:", val);
    setStatusVehicleId(val);
  }}
/>

                  </div>
                  </div>
                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Status</label>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="1"
                              checked={selectedStatus === "1"}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                            />
                            Available
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="2"
                              checked={selectedStatus === "2"}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                            />
                            Booked
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="3"
                              checked={selectedStatus === "3"}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                            />
                            Sold
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Status Description</label>
                        <textarea
                          value={statusDescription}
                          onChange={(e) => setStatusDescription(e.target.value)}
                          placeholder="Enter status description"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Submit Status
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
              className="tab-pane fade gallery-sec style1"
              id="media"
              role="tabpanel"
              aria-labelledby="media-tab"
            >
              
              <div className="right-box-three">
                <h6 className="title">Photo Upload</h6>
                
                <form className="gallery-box" onSubmit={handleMediaSubmit}>
                <div className="form_boxes">
                  
  <label>Vehicle</label>
  <SelectComponent
    options={[{ value: "", label: "Select Vehicle" }, ...vehicleOptions ]}
    value={mediaVehicleId}
    onChange={(val) => {
      console.log("Media dropdown selected:", val);
      setMediaVehicleId(val);
    }}
  />
</div>
                  <div className="inner-box add-input-image">
                    {images.map((imgSrc, index) => (
                      <div className="image-box" key={index}>
                        <img
                          width={190}
                          height={167}
                          src={imgSrc}
                          alt={`Preview ${index}`}
                          className="uploaded-img"
                        />
                        <div className="content-box">
                          <ul className="social-icon">
                            <li>
                              <a onClick={() => handleDelete(index)}>
                                <img
                                  width={18}
                                  height={18}
                                  src="/images/resource/delet.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <label htmlFor={`file-upload-${index}`}>
                                <a>
                                  <img
                                    width={18}
                                    height={18}
                                    src="/images/resource/delet1-1.svg"
                                    alt="Upload"
                                  />
                                </a>
                              </label>
                              <input
                                id={`file-upload-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleMediaImageChange(e, index)
                                }
                                style={{ display: "none" }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                    {/* Upload Button */}
                    <div className="uplode-box">
                      <div className="content-box">
                        <label htmlFor="upload-new">
                          <img
                            width={34}
                            height={34}
                            src="/images/resource/uplode.svg"
                            alt="Upload"
                          />
                          <span>Upload</span>
                        </label>
                        <input
                          id="upload-new"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleMediaImageChange(e, images.length)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg &amp; .png
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      Submit Media
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_711_3214)">
                          <path
                            d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_711_3214">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
                  className="tab-pane fade"
                  id="previous-owner"
                  role="tabpanel"
                  aria-labelledby="previous-owner-tab"
                >
                  <form onSubmit={handlePrevOwnerSubmit} className="row">
                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Vehicle</label>
                        <SelectComponent
                          options={["Select Vehicle", ...vehicleOptions]}
                          value={prevOwnerVehicleId}
                          onChange={(val) => {
                            console.log("Previous Owner dropdown selected:", val);
                            setPrevOwnerVehicleId(val);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Grant Number</label>
                        <input
                          type="text"
                          value={prevOwnerDetails.grant_number}
                          onChange={(e) =>
                            setPrevOwnerDetails({
                              ...prevOwnerDetails,
                              grant_number: e.target.value,
                            })
                          }
                          placeholder="Enter Grant Number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Owner Name</label>
                        <input
                          type="text"
                          value={prevOwnerDetails.owner_name}
                          onChange={(e) =>
                            setPrevOwnerDetails({
                              ...prevOwnerDetails,
                              owner_name: e.target.value,
                            })
                          }
                          placeholder="Enter Owner Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Race</label>
                        <input
                          type="text"
                          value={prevOwnerDetails.race}
                          onChange={(e) =>
                            setPrevOwnerDetails({
                              ...prevOwnerDetails,
                              race: e.target.value,
                            })
                          }
                          placeholder="Enter Race"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Address</label>
                        <input
                          type="text"
                          value={prevOwnerDetails.address}
                          onChange={(e) =>
                            setPrevOwnerDetails({
                              ...prevOwnerDetails,
                              address: e.target.value,
                            })
                          }
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Ownership End Date</label>
                        <input
                          type="date"
                          value={prevOwnerDetails.ownership_end_date}
                          onChange={(e) =>
                            setPrevOwnerDetails({
                              ...prevOwnerDetails,
                              ownership_end_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Submit Previous Owner Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
