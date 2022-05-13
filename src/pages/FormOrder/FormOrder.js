import { useEffect, useState } from "react";
import "./FormOrder.css";
import "axios";
import axios from "axios";
const FormOrder = () => {
  const [items, setItems] = useState([]);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputData, setInputDate] = useState({
    country: "",
    address: "",
    remarks: "",
    zipCode: "",
    shipment_method: "",
  });
  const handleInput = (inputType, value) => {
    const inputDataNew = inputData;
    inputDataNew[inputType] = value;
    setInputDate(inputDataNew);
  };
  const parseCartStorage = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      return items.map((item) => JSON.parse(item));
    }
  };
  const calculateTotal = () =>
    items.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);
    }
    setItems(parseCartStorage());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...inputData,
      user: localStorage.getItem("id"),
      order_status: "Created",
    };
    const cartItems = items;
    let orderItems = [];
    cartItems.forEach((x) => {
      console.log(x);
      if (x.quantity > 0) {
        for (let i = 0; i < x.quantity; i++) {
          orderItems.push({
            item: x.id,
            price: x.price,
          });
        }
      }
    });

    console.log(orderItems);
    // const orderItems = cartItems.map((item) => {
    //   return {
    //     item: item.id,
    //     price: item.price,
    //     quantity: item.quantity,
    //   };
    // });
    const res = await axios.post("http://localhost:8000/orders/", {
      order: data,
      items: orderItems,
    });
    setIsSuccessed(true);
  };
  return isLoggedIn ? (
    <div className="form-container">
      <h1>Form order</h1>
      {isSuccessed && <h3>Your order was successfully created</h3>}
      {items && items.length > 0 && (
        <>
          <h3>
            Items:
            {items.map((item, index) =>
              item.quantity > 1
                ? ` ${item.title} (${item.quantity}) ${
                    index !== items.length - 1 ? "," : ""
                  } `
                : ` ${item.title} ${index !== items.length - 1 ? "," : ""}`
            )}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                onChange={(e) => handleInput("country", e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                onChange={(e) => handleInput("address", e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                placeholder="Zipcode"
                onChange={(e) => handleInput("zipCode", e.target.value)}
              />
            </div>
            <div className="form-group" placeholder="Shipment Method">
              <select
                onChange={(e) => handleInput("shipment_method", e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Shipment Method
                </option>
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                id="remarks"
                placeholder="Remarks"
                onChange={(e) => handleInput("remarks", e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <p>Total: ${calculateTotal()}</p>
            </div>
            <div className="form-group">
              <button type="submit">Submit order</button>
            </div>
          </form>
        </>
      )}
      {(!items || items.length === 0) && <h1>No items in cart</h1>}
    </div>
  ) : (
    <div className="login-container">
      <h2>Please sign in to form the order</h2>
    </div>
  );
};

export default FormOrder;
