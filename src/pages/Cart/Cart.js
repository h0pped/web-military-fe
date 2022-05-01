import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const [cartItems, setCartItems] = useState(null);

  const parseCartStorage = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      return items.map((item) => JSON.parse(item));
    }
  };
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  const changeQuantity = (id, isAdd) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item.id === id);
    console.log(newCartItems[index].quantity);
    if (isAdd) newCartItems[index].quantity += 1;
    else {
      if (newCartItems[index].quantity > 1) newCartItems[index].quantity -= 1;
      else {
        newCartItems.splice(index, 1);
        localStorage.removeItem("cart");
      }
    }
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };
  const updateLocalStorage = (cartItems) => {
    const newCart = cartItems.map((item) => JSON.stringify(item));
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeItem = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item.id === id);
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };
  useEffect(() => {
    setCartItems(parseCartStorage());
  }, []);
  return (
    <>
      <div className="cart-conatiner">
        <h2>Cart</h2>
        {cartItems && cartItems.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      <img src={item.photoPath} alt="" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => changeQuantity(item.id, true)}>
                        +
                      </button>
                      {item.quantity}
                      <button onClick={() => changeQuantity(item.id, false)}>
                        -
                      </button>
                    </td>
                    <td>
                      <button onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Total:</span> $
                    {calculateTotal()}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to="/form" className="btnFormOrder">
              Form order
            </Link>
          </div>
        ) : (
          <h2>You have no items in your cart!</h2>
        )}
      </div>
    </>
  );
};

export default Cart;
