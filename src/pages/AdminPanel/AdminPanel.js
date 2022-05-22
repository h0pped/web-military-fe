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
  const [categories, setCategories] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState(false);
  const [categoryUpdateID, setCategoryUpdateID] = useState(null);
  const [categoryFormValue, setCategoryFormValue] = useState("");
  const getGender = (gender) =>
    gender === "w" ? "Woman" : gender === "m" ? "Male" : "Unknown";

  const getUserName = (id) => {
    const user = usersData.find((user) => user.id === id);
    return user ? `${user.name} ${user.surname}` : `undefined`;
  };
  const deleteCategoryHandles = (id) => {
    fetch(`http://localhost:8000/categories/?category_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
    setCategoryUpdate(false);
    setCategoryUpdateID(null);
    setCategoryFormValue("");
  };
  const deleteUser = (id) => {
    fetch(`http://localhost:8000/users/?user_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        const newUsersData = usersData.filter((user) => user.id !== id);
        setUsersData(newUsersData);
      }
    });
  };
  const normalizeType = (type) =>
    type.slice(0, 1).toUpperCase() + type.slice(1);
  const markProduct = (id, type) => {
    fetch(`http://localhost:8000/orders/?order_id=${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: normalizeType(type),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (activeTab === "userOrders") {
          setUserOrders((prev) =>
            prev.map((order) => {
              if (order.id === id) {
                order.order_status = normalizeType(type);
              }
              return order;
            })
          );
        } else {
          setOrdersData((prev) =>
            prev.map((order) => {
              if (order.id === id) {
                order.order_status = normalizeType(type);
              }
              return order;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const calculateTotal = (order) =>
    order.order_items.reduce((acc, item) => acc + item.price, 0);

  const concatNormalized = (order) => {
    let concat = "";
    const normalized = normalizeOrderItems(order);
    Object.keys(normalized).forEach((item) => {
      concat += item + " (x" + normalized[item] + "), ";
    });

    return concat.slice(0, -2);
  };
  const normalizeOrderItems = (order) => {
    const items = {};
    order.order_items.forEach((item) => {
      items[item.item.title] = (items[item.item.title] || 0) + 1;
    });
    return items;
  };

  const getRole = (role) => (role === "a" ? "Admin" : "Default");

  const categorySubmit = (e) => {
    e.preventDefault();
    if (categoryUpdate) {
      fetch(
        `http://localhost:8000/categories/?category_id=${categoryUpdateID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            category_title: categoryFormValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          setCategories((prev) =>
            prev.map((category) => {
              if (category.id === categoryUpdateID) {
                category.title = categoryFormValue;
              }
              return category;
            })
          );
          setCategoryUpdate(false);
          setCategoryFormValue("");
        });
    } else {
      fetch(`http://localhost:8000/categories/`, {
        method: "POST",
        body: JSON.stringify({
          title: categoryFormValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setCategories((prev) => [...prev, json]);
          setCategoryFormValue("");
        });
    }
  };
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
            case "categories":
              setCategories(data);
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
            <li className={activeTab === "categories" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveTab("categories");
                }}
              >
                Categories
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
                          <button
                            onClick={() => {
                              deleteUser(user.id);
                            }}
                          >
                            Delete
                          </button>
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
          {!isContentLoading && activeTab === "orders" && (
            <div className="orders">
              <h2>All orders</h2>
              {ordersData.map(
                (order) =>
                  order.order_items.length > 0 && (
                    <div className="order" key={order.id}>
                      <div className="order-info">
                        <h4>Order #{order.id}</h4>
                        <h4>
                          Customer: {order.user.name} {order.user.surname}
                          {` (${order.user.email})`}
                        </h4>
                        <p>
                          Items: {concatNormalized(order)}
                          {/* {order?.order_items?.map((item) => item?.item.title + ", ")} */}
                        </p>
                      </div>
                      <div className="order-status">
                        <div className="status">
                          <h4>Status: {order.order_status}</h4>{" "}
                          <button
                            onClick={() => markProduct(order.id, "created")}
                          >
                            Mark as Created
                          </button>
                          <button
                            onClick={() => markProduct(order.id, "in process")}
                          >
                            Mark as In Process
                          </button>
                          <button onClick={() => markProduct(order.id, "sent")}>
                            Mark as Sent
                          </button>
                          <button
                            onClick={() => markProduct(order.id, "delivered")}
                          >
                            Mark as Delivered
                          </button>
                        </div>
                        <h4>Total: ${calculateTotal(order)}</h4>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          {!isContentLoading && activeTab === "userOrders" && (
            <div className="orders">
              <h2>Orders of {getUserName(activeUserId)}</h2>
              {userOrders?.length === 0 && (
                <h3>This user doesn't have any orders...</h3>
              )}

              {userOrders?.length > 0 &&
                userOrders.map(
                  (order) =>
                    order.order_items.length > 0 && (
                      <div className="order" key={order.id}>
                        <div className="order-info">
                          <h4>Order #{order.id}</h4>

                          <p>
                            Items: {concatNormalized(order)}
                            {/* {order?.order_items?.map((item) => item?.item.title + ", ")} */}
                          </p>
                        </div>
                        <div className="order-status">
                          <div className="status">
                            <h4>Status: {order.order_status}</h4>{" "}
                            <button
                              onClick={() => markProduct(order.id, "created")}
                            >
                              Mark as Created
                            </button>
                            <button
                              onClick={() =>
                                markProduct(order.id, "in process")
                              }
                            >
                              Mark as In Process
                            </button>
                            <button
                              onClick={() => markProduct(order.id, "sent")}
                            >
                              Mark as Sent
                            </button>
                            <button
                              onClick={() => markProduct(order.id, "delivered")}
                            >
                              Mark as Delivered
                            </button>
                          </div>
                          <h4>Total: ${calculateTotal(order)}</h4>
                        </div>
                      </div>
                    )
                )}
            </div>
          )}

          {!isContentLoading && activeTab === "items" && <h2>Items</h2>}
          {!isContentLoading && activeTab === "categories" && (
            <div className="tab-container">
              <h2>Categories</h2>
              <form onSubmit={categorySubmit}>
                <div className="form-input">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    placeholder="Title"
                    value={categoryFormValue}
                    onChange={(e) => setCategoryFormValue(e.target.value)}
                  />
                </div>
                <button type="submit">
                  {categoryUpdate === true ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategoryUpdate(false);
                    setCategoryFormValue("");
                  }}
                >
                  Clear
                </button>
              </form>
              {categories && categories.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th style={{ width: "60%" }}>Title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.title}</td>
                        <td>
                          <button
                            onClick={() => {
                              setCategoryUpdate(true);
                              setCategoryUpdateID(category.id);
                              setCategoryFormValue(category.title);
                            }}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              deleteCategoryHandles(category.id);
                            }}
                          >
                            Delete
                          </button>
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
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
