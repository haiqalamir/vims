import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectComponent from "../common/SelectComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function EditListings() {
  // Get vehicle_id from URL parameters
  const { vehicle_id } = useParams();

  // --- Images & Attachments State ---
  // Store an array of objects { id, url }
  const [images, setImages] = useState([]);
  // For newly added media files (not yet saved in backend)
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleMediaImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      // For new images, add an object with id null and temporary URL
      setImages((prev) => [...prev, { id: null, url: reader.result }]);
      setMediaFiles((prev) => [...prev, file]);
    };
    reader.readAsDataURL(file);
  };

  // Delete an existing image by ID (for images already saved in backend)
  const handleDeleteMedia = async (imageId, index) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/vehicle_images/${imageId}/`);
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    }
  };

  // Edit an existing image (replace with a new file)
  const handleEditMedia = async (imageId, file, index) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/vehicle_images/${imageId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const updatedUrl = `http://127.0.0.1:8000${response.data.image}`;
      const newImages = [...images];
      newImages[index] = { ...newImages[index], url: updatedUrl };
      setImages(newImages);
      toast.success("Image updated successfully");
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Error updating image");
    }
  };

  // --- Car Details State (Prepopulated from DRF) ---
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    manufacture_year: "",
    mileage: "",
    location: "Garage",
  });
  // --- Price State ---
  const [priceValue, setPriceValue] = useState("");
  // --- Status State ---
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusDescription, setStatusDescription] = useState("");
  // --- Previous Owner State ---
  const [prevOwnerDetails, setPrevOwnerDetails] = useState({
    grant_number: "",
    owner_name: "",
    race: "",
    address: "",
    ownership_end_date: "",
  });
  // --- Store Existing Grant ID (if any) ---
  const [existingGrantId, setExistingGrantId] = useState(null);
  // --- Store Existing Vehicle Status ID (if any) ---
  const [existingStatusId, setExistingStatusId] = useState(null);

  // --- Options for Status Dropdown ---
  const statusOptions = [
    { value: "1", label: "Available" },
    { value: "2", label: "Booked" },
    { value: "3", label: "Sold" },
  ];

  // --- Fetch Existing Data ---
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/vehicles/${vehicle_id}/`);
        const vehicle = response.data;
        setCarDetails({
          brand: vehicle.brand || "",
          model: vehicle.model || "",
          manufacture_year: vehicle.manufacture_year || "",
          mileage: vehicle.mileage || "",
          location: vehicle.location || "Garage",
        });
        setPriceValue(vehicle.price || "");
        if (vehicle.images && vehicle.images.length > 0) {
          const imgs = vehicle.images.map((img) => ({
            id: img.id,
            url: `http://127.0.0.1:8000${img.image}`,
          }));
          setImages(imgs);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        toast.error("Error fetching vehicle data.");
      }
    };

    const fetchPreviousOwner = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/grants/?vehicle=${vehicle_id}`);
        if (response.data && response.data.length > 0) {
          const grant = response.data[0];
          setExistingGrantId(grant.grant_id);
          setPrevOwnerDetails({
            grant_number: grant.grant_number || "",
            owner_name: grant.ownership?.name || "",
            race: grant.ownership?.race || "",
            address: grant.ownership?.address || "",
            ownership_end_date: grant.ownership?.ownership_end_date || "",
          });
        }
      } catch (error) {
        console.error("Error fetching previous owner details:", error);
      }
    };

    const fetchVehicleStatus = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/vehicle_statuses/?vehicle=${vehicle_id}`);
        if (response.data && response.data.length > 0) {
          // Sort records descending by date and time
          const sortedStatuses = response.data.sort((a, b) => {
            const dateTimeA = new Date(`${a.date} ${a.time}`);
            const dateTimeB = new Date(`${b.date} ${b.time}`);
            return dateTimeB - dateTimeA;
          });
          const latestStatus = sortedStatuses[0];
          setExistingStatusId(latestStatus.vehicle_status_id);
          setSelectedStatus(String(latestStatus.status));
          setStatusDescription(latestStatus.description || "");
        }
      } catch (error) {
        console.error("Error fetching vehicle status:", error);
      }
    };

    if (vehicle_id) {
      fetchVehicle();
      fetchPreviousOwner();
      fetchVehicleStatus();
    }
  }, [vehicle_id]);

  // --- Unified Submit Handler for Updating ---
  const handleUnifiedSubmit = async (e) => {
    e.preventDefault();

    // Validation checks (adjust as needed)
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
    if (images.length === 0 && mediaFiles.length === 0) {
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
      // 1. Update vehicle details (car details and price)
      const updatedPayload = {
        ...carDetails,
        manufacture_year: Number(carDetails.manufacture_year),
        mileage: Number(carDetails.mileage),
        price: Number(priceValue),
      };
      await axios.patch(`http://127.0.0.1:8000/vehicles/${vehicle_id}/`, updatedPayload);
      console.log("Vehicle details updated");

      // 2. Update status:
      // If an existing status record exists, delete it first
      if (existingStatusId) {
        await axios.delete(`http://127.0.0.1:8000/vehicle_statuses/${existingStatusId}/`);
        console.log("Existing status record deleted");
      }
      // Create a new status record with the updated info
      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const time = now.toTimeString().split(" ")[0];
      await axios.post("http://127.0.0.1:8000/vehicle_statuses/", {
        vehicle: vehicle_id,
        status: Number(selectedStatus),
        description: statusDescription,
        date: date,
        time: time,
      });
      console.log("New status record created");

      // 3. Upload new media files (if any new files were added)
      if (mediaFiles.length > 0) {
        const formData = new FormData();
        formData.append("vehicle", vehicle_id);
        mediaFiles.forEach((file) => {
          formData.append("image", file);
        });
        await axios.post("http://127.0.0.1:8000/vehicle_images/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("New media uploaded");
      }

      // 4. Update or create previous owner details
      const prevOwnerPayload = {
        grant_number: prevOwnerDetails.grant_number,
        vehicle: vehicle_id,
        ownership: {
          name: prevOwnerDetails.owner_name,
          race: prevOwnerDetails.race,
          address: prevOwnerDetails.address,
          ownership_end_date: prevOwnerDetails.ownership_end_date,
        },
      };
      if (existingGrantId) {
        await axios.put(`http://127.0.0.1:8000/grants/${existingGrantId}/`, prevOwnerPayload);
        console.log("Previous owner details updated");
      } else {
        await axios.post("http://127.0.0.1:8000/grants/", prevOwnerPayload);
        console.log("Previous owner details created");
      }

      toast.success("Vehicle updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error during update:", error.response ? error.response.data : error);
      toast.error("Error updating vehicle. Please check the console for details.");
    }
  };

  const handleCarDetailChange = (field, value) => {
    setCarDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Edit Listings</h3>
              <div className="text">
                Update the vehicle details below. Existing data are preloaded – you may erase them manually and enter correct data.
              </div>
            </div>
            <div className="form-box">
              {/* Navigation Tabs */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                    Car Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    Price
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                    Status
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="media-tab" data-bs-toggle="tab" data-bs-target="#media" type="button" role="tab" aria-controls="media" aria-selected="false">
                    Media
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="previous-owner-tab" data-bs-toggle="tab" data-bs-target="#previous-owner" type="button" role="tab" aria-controls="previous-owner" aria-selected="false">
                    Previous Owner
                  </button>
                </li>
              </ul>
              {/* Unified Form */}
              <form onSubmit={handleUnifiedSubmit}>
                <div className="tab-content" id="myTabContent">
                  {/* Car Details Tab */}
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Brand <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={carDetails.brand} onChange={(e) => handleCarDetailChange("brand", e.target.value)} placeholder="Enter Brand" />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Model <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={carDetails.model} onChange={(e) => handleCarDetailChange("model", e.target.value)} placeholder="Enter Model" />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Manufacture Year <span style={{ color: "red" }}>*</span></label>
                          <input type="number" value={carDetails.manufacture_year} onChange={(e) => handleCarDetailChange("manufacture_year", e.target.value)} placeholder="Enter Year" />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Mileage <span style={{ color: "red" }}>*</span></label>
                          <input type="number" value={carDetails.mileage} onChange={(e) => handleCarDetailChange("mileage", e.target.value)} placeholder="Enter Mileage" />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Location <span style={{ color: "red" }}>*</span></label>
                          <SelectComponent options={[{ value: "Garage", label: "Garage" }]} value={carDetails.location} onChange={(val) => handleCarDetailChange("location", val)} />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Current Vehicle Image</label>
                          <img src={images[0]?.url || "/images/resource/default-car.jpg"} alt="Vehicle" width={120} height={105} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Price Tab */}
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes v2">
                          <label>Price ($) <span style={{ color: "red" }}>*</span></label>
                          <input type="number" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} placeholder="Enter Price" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Status Tab */}
                  <div className="tab-pane fade cheak-box-sec style1" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>Status <span style={{ color: "red" }}>*</span></label>
                          <SelectComponent options={statusOptions} value={selectedStatus} onChange={(val) => setSelectedStatus(val)} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>Status Description <span style={{ color: "red" }}>*</span></label>
                          <textarea value={statusDescription} onChange={(e) => setStatusDescription(e.target.value)} placeholder="Enter status description" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Media Tab */}
                  <div className="tab-pane fade gallery-sec style1" id="media" role="tabpanel" aria-labelledby="media-tab">
                    <div className="right-box-three">
                      <h6 className="title">Photo Upload</h6>
                      <div className="gallery-box">
                        <div className="inner-box add-input-image">
                          {images.map((imgObj, index) => (
                            <div className="image-box" key={index}>
                              <img width={190} height={167} src={imgObj.url} alt={`Preview ${index}`} className="uploaded-img" />
                              <div className="content-box">
                                <ul className="social-icon">
                                  <li>
                                    <a onClick={() => handleDeleteMedia(imgObj.id, index)}>
                                      <img width={18} height={18} src="/images/resource/delet.svg" alt="" />
                                    </a>
                                  </li>
                                  <li>
                                    <label htmlFor={`edit-file-${index}`}>
                                      <a>
                                        <img width={18} height={18} src="/images/resource/delet1-1.svg" alt="Edit" />
                                      </a>
                                    </label>
                                    <input
                                      id={`edit-file-${index}`}
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && imgObj.id) {
                                          handleEditMedia(imgObj.id, file, index);
                                        }
                                      }}
                                      style={{ display: "none" }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ))}
                          <div className="uplode-box">
                            <div className="content-box">
                              <label htmlFor="upload-new">
                                <img width={34} height={34} src="/images/resource/uplode.svg" alt="Upload" />
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
                  {/* Previous Owner Tab */}
                  <div className="tab-pane fade" id="previous-owner" role="tabpanel" aria-labelledby="previous-owner-tab">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>Grant Number <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={prevOwnerDetails.grant_number} onChange={(e) => setPrevOwnerDetails({ ...prevOwnerDetails, grant_number: e.target.value })} placeholder="Enter Grant Number" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Owner Name <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={prevOwnerDetails.owner_name} onChange={(e) => setPrevOwnerDetails({ ...prevOwnerDetails, owner_name: e.target.value })} placeholder="Enter Owner Name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Race <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={prevOwnerDetails.race} onChange={(e) => setPrevOwnerDetails({ ...prevOwnerDetails, race: e.target.value })} placeholder="Enter Race" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Address <span style={{ color: "red" }}>*</span></label>
                          <input type="text" value={prevOwnerDetails.address} onChange={(e) => setPrevOwnerDetails({ ...prevOwnerDetails, address: e.target.value })} placeholder="Enter Address" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Ownership End Date <span style={{ color: "red" }}>*</span></label>
                          <input type="date" value={prevOwnerDetails.ownership_end_date} onChange={(e) => setPrevOwnerDetails({ ...prevOwnerDetails, ownership_end_date: e.target.value })} />
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
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                        <g clipPath="url(#clip0_711_3214)">
                          <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="white"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_711_3214">
                            <rect width={14} height={14} fill="white"/>
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
