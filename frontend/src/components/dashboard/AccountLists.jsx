import Sidebar from "./Sidebar";
import Pagination from "../common/Pagination";
import SelectComponent from "../common/SelectComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountList() {
  const [accountList, setAccountList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch accounts from DRF API when component mounts
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/accounts/");
      setAccountList(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Error fetching accounts.");
    }
  };

  // Delete account with confirmation popup using toast notifications
  const handleDelete = (accountId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this account? This will delete all related data as well.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/accounts/${accountId}/`);
              toast.success("Account deleted successfully!");
              fetchAccounts();
            } catch (error) {
              console.error("Error deleting account:", error);
              toast.error("Error deleting account. Please check the console for details.");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  // Calculate the accounts to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accountList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Account Listing</h3>
              <div className="text">User Account Management</div>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="cart-table">

                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Phone Number</th>
                      <th>Employment Status</th>
                      <th>Department</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAccounts.map((account) => (
                      <tr key={account.user_id}>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        <td>{account.role}</td>
                        <td>{account.phone_number}</td>
                        <td>{account.employment_status || "N/A"}</td>
                        <td>{account.department || "N/A"}</td>
                        <td>
                          <button 
                            onClick={() => handleDelete(account.user_id)}
                            className="remove-cart-item"
                            style={{ background: "none", border: "none" }}
                          >
                            <img
                              alt="Remove item"
                              src="/images/icons/remove.svg"
                              width={18}
                              height={18}
                            />
                          </button>
                          <Link 
                            to={`/edit-accounts/${account.user_id}`}
                            className="remove-cart-item"
                          >
                            <img
                              alt="Edit item"
                              src="/images/icons/edit.svg"
                              width={18}
                              height={18}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-sec">
                  <nav aria-label="Page navigation example">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={accountList.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                    <div className="text">
                      Showing results {indexOfFirstItem + 1}-
                      {Math.min(indexOfLastItem, accountList.length)} of {accountList.length}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            {/* ToastContainer to display toast notifications */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
}
