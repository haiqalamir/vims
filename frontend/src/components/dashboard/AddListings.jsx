import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectComponent from "../common/SelectComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddListings() {
  // --- Images & Attachments State (Unchanged) ---
  const [images, setImages] = useState([
    "/images/resource/list2-1.png",
  ]);
  const [mediaFiles, setMediaFiles] = useState([]);

  // We no longer need mediaVehicleId since vehicle id is created on the fly.
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
    setMediaFiles(prev => [...prev, file]);
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
    location: "Garage",
  });
  // --- Price State (Price Tab) ---
  const [priceValue, setPriceValue] = useState("");
  // --- Status State (Status Tab) ---
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const [statusDescription, setStatusDescription] = useState("");
  // --- Previous Owner State (Previous Owner Tab) ---
  const [prevOwnerDetails, setPrevOwnerDetails] = useState({
    grant_number: "",
    owner_name: "",
    race: "",
    address: "",
    ownership_end_date: "",
  });

  // --- Vehicle List for Dropdown Options (if needed) ---
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
  const vehicleOptions = vehicleList.map((v) => ({
    value: v.vehicle_id,
    label: `${v.brand} ${v.model} (ID: ${v.vehicle_id})`
  }));

  // --- Options for Status Dropdown ---
  const statusOptions = [
    { value: "1", label: "Available" },
    { value: "2", label: "Booked" },
    { value: "3", label: "Sold" },
  ];

  // --- Unified Submit Handler ---
  const handleUnifiedSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation of required fields:
    if (
      !carDetails.brand ||
      !carDetails.model ||
      !carDetails.manufacture_year ||
      !carDetails.mileage ||
      !carDetails.location
    ) {
      toast.error("Please fill in all Car Details fields!");
      return;
    }
    if (!priceValue) {
      toast.error("Please enter Price!");
      return;
    }
    if (!selectedStatus || !statusDescription) {
      toast.error("Please fill in all Status fields!");
      return;
    }
    if (mediaFiles.length === 0) {
      toast.error("Please upload at least one image in Media section!");
      return;
    }
    if (
      !prevOwnerDetails.grant_number ||
      !prevOwnerDetails.owner_name ||
      !prevOwnerDetails.race ||
      !prevOwnerDetails.address ||
      !prevOwnerDetails.ownership_end_date
    ) {
      toast.error("Please fill in all Previous Owner fields!");
      return;
    }

    try {
      // 1. Create Vehicle with Car Details payload (price set to 0 as placeholder)
      const vehiclePayload = {
        ...carDetails,
        manufacture_year: Number(carDetails.manufacture_year),
        mileage: Number(carDetails.mileage),
        price: 0, // placeholder; will update below if provided
      };
      const vehicleRes = await axios.post("http://127.0.0.1:8000/vehicles/", vehiclePayload);
      const vehicleId = vehicleRes.data.vehicle_id;
      console.log("Vehicle created:", vehicleRes.data);

      // 2. Update Price if provided
      if (priceValue) {
        await axios.patch(`http://127.0.0.1:8000/vehicles/${vehicleId}/`, {
          price: Number(priceValue),
        });
        console.log("Price updated");
      }

      // 3. Submit Status if provided
      if (selectedStatus) {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        const time = now.toTimeString().split(" ")[0];
        await axios.post("http://127.0.0.1:8000/vehicle_statuses/", {
          vehicle: vehicleId,
          status: Number(selectedStatus),
          description: statusDescription,
          date: date,
          time: time,
        });
        console.log("Status submitted");
      }

      // 4. Upload Media if any images selected
      if (mediaFiles.length > 0) {
        const formData = new FormData();
        formData.append("vehicle", vehicleId);
        mediaFiles.forEach(file => {
          formData.append("image", file);
        });
        await axios.post("http://127.0.0.1:8000/vehicle_images/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log("Media uploaded");
      }

      // 5. Submit Previous Owner Details
      if (prevOwnerDetails.grant_number && prevOwnerDetails.owner_name) {
        const prevOwnerPayload = {
          grant_number: prevOwnerDetails.grant_number,
          vehicle: vehicleId,
          ownership: {
            name: prevOwnerDetails.owner_name,
            race: prevOwnerDetails.race,
            address: prevOwnerDetails.address,
            ownership_end_date: prevOwnerDetails.ownership_end_date,
          },
        };
        await axios.post("http://127.0.0.1:8000/grants/", prevOwnerPayload);
        console.log("Previous owner details submitted");
      }

      toast.success("Vehicle added successfully with all details!");
      // Refresh page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error during unified submit:", error.response ? error.response.data : error);
      toast.error("Error adding vehicle. Please check the console for details.");
    }
  };

  const handleCarDetailChange = (field, value) => {
    setCarDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Add Vehicles</h3>
              <div className="text">
                Make sure all the data are correctly entered!
              </div>
            </div>
            <div className="form-box">
              {/* Navigation Tabs remain outside the form */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
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
              {/* Unified Form Starts Here, below the nav tabs */}
              <form onSubmit={handleUnifiedSubmit}>
                <div className="tab-content" id="myTabContent">
                  {/* --- Car Details Tab Content --- */}
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>
                            Brand <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Model <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Manufacture Year <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Mileage <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Location <span style={{ color: "red" }}>*</span>
                          </label>
                          <SelectComponent
                            options={[{ value: "Garage", label: "Garage" }]}
                            value={carDetails.location}
                            onChange={(val) => handleCarDetailChange("location", val)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --- Price Tab Content --- */}
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes v2">
                          <label>
                            Price (RM) <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            value={priceValue}
                            onChange={(e) => setPriceValue(e.target.value)}
                            placeholder="Enter Price"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --- Status Tab Content --- */}
                  <div
                    className="tab-pane fade cheak-box-sec style1"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>
                            Status <span style={{ color: "red" }}>*</span>
                          </label>
                          <SelectComponent
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={(val) => setSelectedStatus(val)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>
                            Status Description <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            value={statusDescription}
                            onChange={(e) => setStatusDescription(e.target.value)}
                            placeholder="Enter status description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --- Media Tab Content --- */}
                  <div
                    className="tab-pane fade gallery-sec style1"
                    id="media"
                    role="tabpanel"
                    aria-labelledby="media-tab"
                  >
                    <div className="right-box-three">
                      <h6 className="title">Photo Upload</h6>
                      <div className="gallery-box">
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
                                      onChange={(e) => handleMediaImageChange(e, index)}
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
                                onChange={(e) => handleMediaImageChange(e, images.length)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text">
                          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg &amp; .png
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* --- Previous Owner Tab Content --- */}
                  <div
                    className="tab-pane fade"
                    id="previous-owner"
                    role="tabpanel"
                    aria-labelledby="previous-owner-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>
                            Grant Number <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Owner Name <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Race <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Address <span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label>
                            Ownership End Date <span style={{ color: "red" }}>*</span>
                          </label>
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
                    </div>
                  </div>
                </div>
                {/* Unified Submit Button */}
                <div className="col-lg-12">
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      Submit All
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
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
