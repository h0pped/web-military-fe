import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const [cartItems, setCartItems] = useState(null);

  const parseCartStorage = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    return items.map((item) => JSON.parse(item));
  };
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => (acc += item.price), 0);
  useEffect(() => {
    setCartItems(parseCartStorage());
  }, []);
  return (
    <>
      <div className="cart-conatiner">
        <h2>Cart</h2>
        {cartItems ? (
          <div className="table-container">
            <table>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              {cartItems.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.photoPath} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td colspan={3}></td>
                <td>
                  <span style={{ fontWeight: "bold" }}>Total:</span> $
                  {calculateTotal()}
                </td>
              </tr>
            </table>
            <Link to="/" className="btnFormOrder">
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
