import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // For navigation after successful login or if already logged in
  const navigate = useNavigate();

  // Redirect logged-in user away from login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // State for login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { username, password });
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
      console.log("Login response:", response.data);
      if (response.data.access) {
        toast.success("Login successful!");
        // Store the access token in localStorage
        localStorage.setItem("token", response.data.access);
        
        // Dynamically import jwt-decode
        try {
          const jwtDecodeModule = await import("jwt-decode");
          const jwt_decode = jwtDecodeModule.default;
          const decoded = jwt_decode(response.data.access);
          console.log("Decoded token:", decoded);
          
          if (decoded.role) {
            // If role is present in the token, use it
            localStorage.setItem("role", decoded.role);
          } else {
            // Role is null in token; fetch account details from DRF
            console.warn("No role found in token payload. Fetching from accounts endpoint...");
            const accountsResponse = await axios.get("http://127.0.0.1:8000/accounts/");
            const accounts = accountsResponse.data;
            // Find the account with the matching username
            const account = accounts.find((acc) => acc.username === decoded.username);
            if (account && account.role) {
              localStorage.setItem("role", account.role);
              console.log("Retrieved role from accounts endpoint:", account.role);
            } else {
              console.warn("No role found from accounts endpoint for user:", decoded.username);
            }
          }
        } catch (importError) {
          console.error("Dynamic import of jwt-decode failed:", importError);
          // Optionally, you could set a default role or handle this error gracefully.
        }
        
        navigate("/"); // Redirect to home page
      } else {
        toast.error("Login failed: No access token.");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="login-section layout-radius">
      <div className="inner-container">
        <div className="right-box">
          <div className="form-sec">
            <nav>
              <div className="title" id="title" role="tablist">
                <h1 className="title">Vehicle Information Management System</h1>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="form-box">
                  <form onSubmit={handleSubmit}>
                    <div className="form_boxes">
                      <label>Username</label>
                      <input
                        required
                        type="text"
                        name="username"
                        placeholder="Enter Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form_boxes">
                      <label>Password</label>
                      <input
                        required
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="btn-box">
                      <label className="contain">
                        Remember
                        <input
                          type="checkbox"
                          defaultChecked="checked"
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="form-submit">
                      <button type="submit" className="theme-btn">
                        Login{" "}
                        <img
                          alt=""
                          src="/images/arrow.svg"
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {/* Additional tab content can go here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
