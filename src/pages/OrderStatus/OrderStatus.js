import React, { useEffect, useState } from "react";
import "./OrderStatus.css";
const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [normalizedItems, setNormalizedItems] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("id");
    setIsLoading(true);
    fetch("http://localhost:8000/orders/?user_id=" + userId)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

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
      console.log(item);
      items[item.item.title] = (items[item.item.title] || 0) + 1;
    });
    return items;
  };
  return (
    <div className="orderStatusContainer">
      <h3>My orders</h3>
      {!isLoading && !isError && orders && orders.length > 0 && (
        <div className="orders">
          {orders.map(
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
                    <h4>Status: {order.order_status}</h4>
                    <h4>Total: ${calculateTotal(order)}</h4>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
