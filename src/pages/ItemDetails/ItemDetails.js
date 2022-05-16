import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";
import axios from "axios";
const ItemDetails = () => {
  let { itemId } = useParams();
  const [userId, setUserId] = useState(null);
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

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
  const changeRating = (e) => {
    const rating = e.target.id.split("-")[1];
    if (!isNaN(rating)) {
      setReviewRating(rating);
      console.log(rating);
    }
  };
  const clearInput = () => {
    setReviewRating(0);
    setReviewText("");
  };
  const handleReviewSubmit = async () => {
    if (reviewRating > 0) {
      const data = {
        item: itemId,
        user: userId,
        rating: reviewRating,
        comment: reviewText,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/reviews/`,
        data
      );
      if (res.data) {
        setReviews((prevReviews) => [res.data, ...prevReviews]);
        setIsReviewSubmitted(true);
        clearInput();
      }
    }
  };
  useEffect(() => {
    async function fetchProductData() {
      const resItem = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/items/?item_id=${itemId}`
      );
      const reviews = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/reviews/?item_id=${itemId}`
      );
      const userId = localStorage.getItem("id");

      if (userId !== null) {
        setUserId(userId);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log("id", userId);
      const jsonItem = await resItem.json();
      const reviewsItems = await reviews.json();
      console.log(jsonItem.quantity);
      return { jsonItem, reviewsItems };
    }
    fetchProductData().then((res) => {
      setItem(res.jsonItem);
      setReviews(res.reviewsItems);
      console.log(res.reviewsItems);
    });
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
              <div
                className="add_button"
                onClick={() => {
                  if (item.quantity !== 0) addToCartHandler();
                }}
              >
                {item.quantity === 0 ? "Sold Out" : "Add to Cart"}
              </div>
            </div>
          </div>
          <div className="review">
            <div className="review_header">
              <h2>Reviews</h2>
            </div>
            {isLoggedIn ? (
              <div className="container">
                <h2>Leave your comment</h2>
                {isReviewSubmitted && (
                  <h2>Review was successfully submitted!</h2>
                )}
                <p>Rating:</p>
                <div classsname="rating-div" onClick={changeRating}>
                  {[...Array(Math.round(reviewRating))].map((x, i) => (
                    <span
                      className="fa fa-star checked fa-lg"
                      key={`star-${i + 1}`}
                      id={`star-${i + 1}`}
                    ></span>
                  ))}
                  {[...Array(5 - Math.round(reviewRating))].map((x, i) => (
                    <span
                      className="fa fa-star fa-lg"
                      key={`star-${Math.round(reviewRating + i + 1)}`}
                      id={`star-${Math.round(reviewRating) + i + 1}`}
                    ></span>
                  ))}
                </div>
                <form className="form-review">
                  <input
                    type="text"
                    placeholder="Add Your Comment"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></input>
                  <div className="btn">
                    <input type="submit" value="Comment"></input>
                    <button id="clear" href="#">
                      Cancel
                    </button>
                  </div>
                  <div className="add_button" onClick={handleReviewSubmit}>
                    Leave a review
                  </div>
                </form>
              </div>
            ) : (
              <div className="container">
                <p>Log in to leave a review</p>
              </div>
            )}

            {reviews &&
              reviews.length > 0 &&
              reviews.map((review) => (
                <div className="container">
                  <p style={{ fontWeight: "bold" }}>
                    {review.user.name} {review.user.surname}
                  </p>
                  <p>
                    {[...Array(Math.round(review.rating))].map((x, i) => (
                      <span className="fa fa-star checked fa-lg" key={i}></span>
                    ))}
                    {[...Array(5 - Math.round(review.rating))].map((x, i) => (
                      <span className="fa fa-star fa-lg" key={i}></span>
                    ))}
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))}
            {reviews && reviews.length === 0 && (
              <p>No reviews for that item yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
