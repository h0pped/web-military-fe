import React from "react";
import "./ItemDetails.css";
const ItemDetails = () => {
  return (
    <>
      <div className="main">
        <div className="weapon">
          <div className="weapon_pic">
            <img
              src="https://www.shootingcracow.com/wp-content/uploads/2021/04/glock-17-pistolet-oruzhie.jpg"
              alt=""
            />
          </div>
          <div className="meta">
            <div className="header-name">
              <h2>Glock 18</h2>
            </div>
            <div className="rate">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
            <div className="header-price">
              <p>$499</p>
            </div>
            <div className="weapon_description">
              <p>
                Glock is a brand of polymer-framed, short recoil-operated,
                locked-breech semi-automatic pistols designed and produced by
                Austrian manufacturer Glock Ges.m.b.H. The firearm entered
                Austrian military and police service by 1982 after it was the
                top performer in reliability and safety tests. Glock pistols
                have become the company's most profitable line of products, and
                have been supplied to national armed forces, security agencies,
                and police forces in at least 48 countries. Glocks are also
                popular firearms among civilians for recreational and
                competition shooting, home- and self-defense, both in concealed
                or open carry. In 2020, the Glock 19 was the best selling pistol
                on GunBroker.
              </p>
            </div>
            <div className="add_button">Add to cart</div>
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
    </>
  );
};

export default ItemDetails;
