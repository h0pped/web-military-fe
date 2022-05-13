import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [rifles, setRifles] = useState([]);
  const [selfDefence, setSelfDefence] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/items/?recent=true")
      .then((res) => res.json())
      .then((items) => {
        setRecentItems(items.sort((a, b) => b.id - a.id).slice(0, 9));
        fetch("http://localhost:8000/items/?category_id=5")
          .then((riflesjson) => riflesjson.json())
          .then((rifles) => {
            setRifles(rifles);
            fetch("http://localhost:8000/items/?category_id=9")
              .then((selfdef) => selfdef.json())
              .then((selfdef) => {
                setSelfDefence(selfdef);
                fetch("http://localhost:8000/items/?category_id=11")
                  .then((accessories) => accessories.json())
                  .then((accessories) => {
                    setAccessories(accessories);
                  });
              });
          });
      });
  }, []);
  return (
    <>
      <section id="landing">
        <h1>Militarize yourself</h1>
        <h3>lorem lorem lorem</h3>
      </section>
      <section id="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="grid">
          {recentItems.length > 0 &&
            recentItems.map((item) => (
              <div className="item" key={item.id}>
                <Link to={`/item/${item.id}`}>
                  <div className="img">
                    <img src={item.photoPath} alt="" />
                  </div>
                  <div className="item-description">
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
      <section id="guns">
        <h2>Rifles</h2>
        <div className="carousel">
          {rifles.length > 0 && (
            <Carousel
              plugins={[
                "arrows",
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  },
                },
              ]}
              breakpoints={{
                800: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 1,
                      },
                    },
                  ],
                },
                1200: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 2,
                      },
                    },
                  ],
                },
              }}
            >
              {rifles.map((rifle) => (
                <div className="item">
                  <div className="img">
                    <Link to={"/item" + rifle.id} className="itemimg">
                      <img src={rifle.photoPath} alt="" />
                    </Link>
                  </div>
                  <div className="item-description">
                    <p>{rifle.title}</p>
                    <p>${rifle.price}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          )}

          <Link to="/browse" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>

      <section id="self-defence">
        <h2>Self Defense</h2>
        <div className="carousel">
          {selfDefence.length > 0 && (
            <Carousel
              plugins={[
                "arrows",
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  },
                },
              ]}
              breakpoints={{
                800: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 1,
                      },
                    },
                  ],
                },
                1200: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 2,
                      },
                    },
                  ],
                },
              }}
            >
              {selfDefence.map((defence) => (
                <div className="item">
                  <div className="img">
                    <Link to={"/item" + defence.id} className="itemimg">
                      <img src={defence.photoPath} alt="" />
                    </Link>
                  </div>
                  <div className="item-description">
                    <p>{defence.title}</p>
                    <p>${defence.price}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          )}

          <Link to="/browse" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>

      <section id="accessories">
        <h2>Accessories</h2>
        <div className="carousel">
          {accessories.length > 0 && (
            <Carousel
              plugins={[
                "arrows",
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  },
                },
              ]}
              breakpoints={{
                800: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 1,
                      },
                    },
                  ],
                },
                1200: {
                  plugins: [
                    "arrows",

                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 2,
                      },
                    },
                  ],
                },
              }}
            >
              {accessories.map((acc) => (
                <div className="item">
                  <div className="img">
                    <Link to={"/item" + acc.id} className="itemimg">
                      <img src={acc.photoPath} alt="" />
                    </Link>
                  </div>
                  <div className="item-description">
                    <p>{acc.title}</p>
                    <p>${acc.price}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          )}

          <Link to="browse" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>
      <section id="browse-all">
        <Link to="/browse" className="browse-all">
          Browse all items
        </Link>
      </section>
    </>
  );
};

export default Home;
