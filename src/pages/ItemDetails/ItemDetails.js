import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";
const ItemDetails = () => {
  let { itemId } = useParams();
  const [item, setItem] = useState(null);

  const addToCartHandler = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const json = JSON.parse(cart);
      let cartItem;
      const itemIndex = json.findIndex(
        (item) => JSON.parse(item).id === parseInt(itemId)
      );
      if (itemIndex !== -1) {
        const parsedItem = JSON.parse(json[itemIndex]);
        let cartItem = {
          ...parsedItem,
          quantity: parsedItem.quantity + 1,
        };
        json[itemIndex] = JSON.stringify(cartItem);
      } else {
        cartItem = {
          ...item,
          quantity: 1,
        };
        json.push(JSON.stringify(cartItem));
      }
      localStorage.setItem("cart", JSON.stringify(json));
    } else {
      const newCart = [];
      const cartItem = {
        ...item,
        quantity: 1,
      };
      newCart.push(JSON.stringify(cartItem));
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/items/?item_id=${itemId}`
      );

      const json = await res.json();
      return json;
    }
    fetchProduct().then((res) => setItem(res));
  }, [itemId]);
  return (
    <>
      {item && (
        <div className="main">
          <div className="weapon">
            <div className="weapon_pic">
              <img src={item.photoPath} alt="" />
            </div>
            <div className="meta">
              <div className="header-name">
                <h2>{item.title}</h2>
              </div>
              <div className="rate">
                {[...Array(Math.round(item.avg_rating))].map((x, i) => (
                  <span className="fa fa-star checked" key={i}></span>
                ))}
                {[...Array(Math.round(5 - item.avg_rating))].map((x, i) => (
                  <span
                    className="fa fa-star "
                    key={item.avg_rating + i}
                  ></span>
                ))}
              </div>
              <div className="header-price">
                <p>${item.price}</p>
              </div>
              <div className="weapon_description">
                <p>{item.description}</p>
              </div>
              <div className="add_button" onClick={addToCartHandler}>
                Add to cart
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review_header">
              <h2>Reviews</h2>
            </div>
            <div className="container">
              <h2>Leave your comment</h2>
              <p>
                Rating: <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </p>
              <form>
                <textarea placeholder="Add Your Comment"></textarea>
                <div className="btn">
                  <input type="submit" value="Comment"></input>
                  <button id="clear" href="#">
                    Cancel
                  </button>
                </div>
                <div className="add_button">Leave a review</div>
              </form>
            </div>
            <div className="container">
              <p>
                Rating: <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </p>
              <p>I like mushrooms</p>
            </div>
            <div className="container">
              <p>
                Rating: <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </p>
              <p>Ho ho ho, no</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
