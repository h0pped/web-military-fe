import { useEffect, useState } from "react";
import "./FormOrder.css";
const FormOrder = () => {
  const [items, setItems] = useState([]);

  const parseCartStorage = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      return items.map((item) => JSON.parse(item));
    }
  };
  const calculateTotal = () =>
    items.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  useEffect(() => {
    setItems(parseCartStorage());
  }, []);
  return (
    <div className="form-container">
      <h1>Form order</h1>
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
          <form>
            <div className="form-group">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                placeholder="Zipcode"
              />
            </div>
            <div className="form-group" placeholder="Shipment Method">
              <select>
                <option value="deafult">Shipment Method</option>
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
              </select>
            </div>
            <div className="form-group">
              <textarea id="remarks" placeholder="Remarks"></textarea>
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
  );
};

export default FormOrder;
