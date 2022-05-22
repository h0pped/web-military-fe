import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  const getGender = (gender) =>
    gender === "w" ? "Woman" : gender === "m" ? "Male" : "Unknown";

  const getUserName = (id) => {
    const user = usersData.find((user) => user.id === id);
    return user ? `${user.name} ${user.surname}` : `undefined`;
  };

  const getRole = (role) => (role === "a" ? "Admin" : "Default");
  useEffect(() => {
    setIsContentLoading(true);
    const toLoad = activeTab;
    if (toLoad === "userOrders") {
      fetch(`http://localhost:8000/orders/?user_id=${activeUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserOrders(data);
          setIsContentLoading(false);
        });
    } else {
      fetch("http://localhost:8000/" + toLoad + "/")
        .then((res) => res.json())
        .then((data) => {
          setIsContentLoading(false);

          switch (toLoad) {
            case "users":
              setUsersData(data);
              break;
            case "orders":
              setOrdersData(data);
              break;
            case "items":
              setItemsData(data);
              break;
            default:
              break;
          }
          setUsersData(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsContentLoading(false);
        });
    }
  }, [activeTab]);
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-panel-content">
        <div className="menu">
          <ul>
            <li className={activeTab === "users" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveTab("users");
                }}
              >
                Users
              </button>
            </li>
            <li className={activeTab === "orders" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveTab("orders");
                }}
              >
                Orders
              </button>
            </li>
            <li className={activeTab === "items" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveTab("items");
                }}
              >
                Items
              </button>
            </li>
          </ul>
        </div>
        <div className="content">
          {isContentLoading && (
            <div className="loading">
              <h2>Loading...</h2>
            </div>
          )}
          {!isContentLoading && activeTab === "users" && (
            <div className="tab-container">
              <h2>Users</h2>
              {usersData && usersData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          {user.name} {user.surname}
                        </td>
                        <td>{user.email}</td>
                        <td>{getGender(user.gender)}</td>
                        <td>{getRole(user.role)}</td>
                        <td>
                          <button
                            onClick={() => {
                              setActiveUserId(user.id);
                              setActiveTab("userOrders");
                            }}
                          >
                            View orders
                          </button>
                          <button>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <h3>No users yet...</h3>
                </div>
              )}
            </div>
          )}
          {!isContentLoading && activeTab === "orders" && <h2>Orders</h2>}
          {!isContentLoading && activeTab === "userOrders" && (
            <h2>Orders of {getUserName(activeUserId)}</h2>
          )}

          {!isContentLoading && activeTab === "items" && <h2>Items</h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
