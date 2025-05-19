import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectComponent from "../common/SelectComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function EditAccounts() {
  // Get the account ID from URL parameters (e.g., http://localhost:5173/edit-accounts/2)
  const { id } = useParams();
  console.log("Editing account with id:", id);

  // State for account details
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    phone_number: "",
    employment_status: "",
    department: "",
    username: "",
    password: "",
    role: "Owner", // default role
  });

  // Options for Employment Status dropdown
  const employmentStatusOptions = [
    { value: "Contract", label: "Contract" },
    { value: "Permanent", label: "Permanent" },
    { value: "Part-Time", label: "Part-Time" },
  ];

  // Options for Role dropdown
  const roleOptions = [
    { value: "Owner", label: "Owner" },
    { value: "Admin", label: "Admin" },
    { value: "SalesAgent", label: "Sales Agent" },
  ];

  // Fetch existing account data when component mounts
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/accounts/${id}/`)
        .then((response) => {
          const data = response.data;
          // Prepopulate form fields; password is left empty so user can update it if needed
          setAccountDetails({
            name: data.name || "",
            phone_number: data.phone_number || "",
            employment_status: data.employment_status || "",
            department: data.department || "",
            username: data.username || "",
            password: "",
            role: data.role || "Owner",
          });
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);
          toast.error("Error fetching account data.");
        });
    }
  }, [id]);

  // Handle input field changes
  const handleChange = (field, value) => {
    setAccountDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission for updating the account
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that required fields are not empty
    if (
      !accountDetails.name ||
      !accountDetails.phone_number ||
      !accountDetails.employment_status ||
      !accountDetails.department ||
      !accountDetails.username ||
      !accountDetails.role
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      // Prepare payload. If password is empty, remove it so that it remains unchanged.
      const payload = { ...accountDetails };
      if (!payload.password) {
        delete payload.password;
      }
      await axios.patch(`http://127.0.0.1:8000/accounts/${id}/`, payload);
      toast.success("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error.response ? error.response.data : error);
      toast.error("Error updating account. Please check the console for details.");
    }
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Edit Account</h3>
              <div className="text">Update the account details below.</div>
            </div>
            <div className="form-box">
              {/* Navigation Tabs for sub-sections */}
              <ul className="nav nav-tabs" id="accountTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="user-details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#user-details"
                    type="button"
                    role="tab"
                    aria-controls="user-details"
                    aria-selected="true"
                  >
                    User Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="account-details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#account-details"
                    type="button"
                    role="tab"
                    aria-controls="account-details"
                    aria-selected="false"
                  >
                    Account Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="role-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#role"
                    type="button"
                    role="tab"
                    aria-controls="role"
                    aria-selected="false"
                  >
                    Role
                  </button>
                </li>
              </ul>
              {/* Unified Form */}
              <form onSubmit={handleSubmit}>
                <div className="tab-content" id="accountTabContent">
                  {/* User Details Tab */}
                  <div
                    className="tab-pane fade show active"
                    id="user-details"
                    role="tabpanel"
                    aria-labelledby="user-details-tab"
                  >
                    <div className="row">
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={accountDetails.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter full name"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Phone Number <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={accountDetails.phone_number}
                            onChange={(e) => handleChange("phone_number", e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Employment Status <span style={{ color: "red" }}>*</span>
                          </label>
                          <SelectComponent
                            options={employmentStatusOptions}
                            value={accountDetails.employment_status}
                            onChange={(val) => handleChange("employment_status", val)}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={accountDetails.department}
                            onChange={(e) => handleChange("department", e.target.value)}
                            placeholder="Enter department"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Account Details Tab */}
                  <div
                    className="tab-pane fade"
                    id="account-details"
                    role="tabpanel"
                    aria-labelledby="account-details-tab"
                  >
                    <div className="row">
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Username <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={accountDetails.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            placeholder="Enter username"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Password <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            value={accountDetails.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="Enter new password (leave blank to keep unchanged)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Role Tab */}
                  <div
                    className="tab-pane fade"
                    id="role"
                    role="tabpanel"
                    aria-labelledby="role-tab"
                  >
                    <div className="row">
                      <div className="form-column col-lg-6">
                        <div className="form_boxes">
                          <label>
                            Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <SelectComponent
                            options={roleOptions}
                            value={accountDetails.role}
                            onChange={(val) => handleChange("role", val)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <div className="col-lg-12">
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      Submit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clipPath="url(#clip0)">
                          <path
                            d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
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
