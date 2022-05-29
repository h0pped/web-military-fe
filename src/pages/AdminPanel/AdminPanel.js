import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

import { Link } from "react-router-dom";

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
  const [itemUpdate, setItemUpdate] = useState(false);
  const [itemUpdateID, setItemUpdateID] = useState(null);
  const [newUpdateItem, setNewUpdateItem] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    photoPath: "",
  });

  const changeQuantity = async (item, isIncrease) => {
    let res;
    if (isIncrease) {
      res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/items/?item_id=${item.id}&change_quantity=true`,
        {
          quantity: item.quantity + 1,
        }
      );
      if (res.status === 200) {
        setItemsData(
          itemsData.map((storedItem) => {
            if (storedItem.id === item.id) {
              storedItem.quantity++;
            }
            return storedItem;
          })
        );
      }
    } else {
      res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/items/?item_id=${item.id}&change_quantity=true`,
        {
          quantity: item.quantity - 1,
        }
      );
      if (res.status === 200) {
        setItemsData(
          itemsData.map((storedItem) => {
            if (storedItem.id === item.id) {
              storedItem.quantity--;
            }
            return storedItem;
          })
        );
      }
    }
  };
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
  const changeVisibilityStatus = (id) => {
    fetch(`http://localhost:8000/items/?item_id=${id}&change_visibility=true`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setItemsData(
          itemsData.map((item) => {
            if (item.id === id) {
              item.visible = !item.visible;
            }
            return item;
          })
        );
      }
    });
  };
  const deleteItem = (id) => {
    fetch(`http://localhost:8000/items/?item_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        const newItemsData = itemsData.filter((item) => item.id !== id);
        setItemsData(newItemsData);
      }
    });
  };

  const itemSubmit = async (e) => {
    e.preventDefault();
    if (itemUpdate) {
      console.log("UPDATE ITEM", itemUpdateID, newUpdateItem);
      setItemUpdate(false);
      setItemUpdateID(null);
      setNewUpdateItem({
        title: "",
        description: "",
        price: "",
        category: "",
        photoPath: "",
      });
    } else {
      console.log(newUpdateItem);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/items/`,
        {
          title: newUpdateItem.title,
          description: newUpdateItem.description,
          price: newUpdateItem.price,
          category: newUpdateItem.category,
          photoPath: newUpdateItem.photoPath,
        }
      );
      if (res.status === 201) {
        setItemsData((prev) => [newUpdateItem, ...prev]);
        setItemUpdate(false);
        setItemUpdateID(null);
        setNewUpdateItem({
          title: "",
          description: "",
          price: "",
          category: "",
          photoPath: "",
        });
      }
    }
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
              fetch("http://localhost:8000/categories/")
                .then((res) => res.json())
                .then((categoriesData) => {
                  setItemsData(data);
                  setCategories(categoriesData);
                });
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
  }, [activeTab, activeUserId]);
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

          {!isContentLoading && activeTab === "items" && (
            <div className="tab-container">
              <h2>Items</h2>
              <form className="items-form" onSubmit={itemSubmit}>
                <div className="form-input">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    name="Title"
                    id="Title"
                    placeholder="Title"
                    value={newUpdateItem.title}
                    onChange={(e) =>
                      setNewUpdateItem({
                        ...newUpdateItem,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="ImagePath">Image path</label>
                  <input
                    type="text"
                    name="ImagePath"
                    id="ImagePath"
                    placeholder="https://google.com/...."
                    value={newUpdateItem.photoPath}
                    onChange={(e) => {
                      setNewUpdateItem({
                        ...newUpdateItem,
                        photoPath: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    type="text"
                    name="Description"
                    id="Description"
                    placeholder="Description"
                    value={newUpdateItem.description}
                    onChange={(e) =>
                      setNewUpdateItem({
                        ...newUpdateItem,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="form-input">
                  <label htmlFor="Category">Category</label>
                  <select
                    value={newUpdateItem.category}
                    onChange={(e) =>
                      setNewUpdateItem({
                        ...newUpdateItem,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option value={category.id}>{category.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-input">
                  <label htmlFor="Price">Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="Price"
                    id="Price"
                    placeholder="Price"
                    value={newUpdateItem.price}
                    onChange={(e) =>
                      setNewUpdateItem({
                        ...newUpdateItem,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit">
                  {itemUpdate === true ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setItemUpdate(false);
                    setNewUpdateItem({
                      title: "",
                      description: "",
                      category: "",
                      price: "",
                      ImagePath: "",
                    });
                  }}
                >
                  Clear
                </button>
              </form>
              {itemsData && itemsData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th style={{ width: "50%" }}>Description</th>
                      <th>Rating</th>
                      <th>Quantity</th>
                      <th>Visibile</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsData.map((item) => (
                      <tr key={"item" + item.id}>
                        <td>{item.id}</td>
                        <td>
                          <Link to={"/item/" + item.id}>
                            <img
                              src={item.photoPath}
                              alt={item.title}
                              width="100px"
                            />
                          </Link>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.category.title}</td>
                        <td>{item.description.slice(0, 100)}...</td>
                        <td>{Math.round(item.avg_rating, 2)}</td>
                        <td style={{ width: "20%" }}>
                          <button
                            className="quantity-button"
                            onClick={() => changeQuantity(item, true)}
                          >
                            +
                          </button>
                          {item.quantity}
                          <button
                            className="quantity-button"
                            onClick={() => changeQuantity(item, false)}
                            disabled={item.quantity === 0}
                          >
                            -
                          </button>
                        </td>
                        <td>{item.visible ? "Visible" : "Hidden"}</td>
                        <td style={{ fontWeight: "bold" }}>${item.price}</td>
                        <td>
                          <button
                            style={{ width: "100%" }}
                            onClick={() => {
                              setItemUpdate(true);
                              setItemUpdateID(item.id);
                              setNewUpdateItem({
                                title: item.title,
                                description: item.description,
                                category: item.category.id,
                                price: item.price,
                                photoPath: item.photoPath,
                              });
                            }}
                          >
                            Update
                          </button>
                          <button
                            style={{ width: "100%" }}
                            onClick={() => deleteItem(item.id)}
                          >
                            Delete
                          </button>
                          <button
                            style={{ width: "100%" }}
                            onClick={() => changeVisibilityStatus(item.id)}
                          >
                            {item.visible ? "Hide" : "Make visible"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <h3>No Items yet...</h3>
                </div>
              )}
            </div>
          )}
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
                  <h3>No Categories yet...</h3>
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
