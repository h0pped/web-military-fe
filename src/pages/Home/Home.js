import React from "react";
import "./Home.css";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section id="landing">
        <h1>Militarize yourself</h1>
        <h3>lorem lorem lorem</h3>
      </section>
      <section id="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="grid">
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                />
              </div>
              <p>Lorem, ipsum.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539827-5d3ed2512958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem, ipsum dolor.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610057998992-6182af268499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610057998889-a3d8d3d3333b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1607012343164-210ab261917b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  alt=""
                />
              </div>
              <p>Lorem, ipsum.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1609808425360-3ed1ca46d56d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80"
                  alt=""
                />
              </div>
              <p>Lorem, ipsum dolor.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1585589266882-2cb137ba7db6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80"
                  alt=""
                />
              </div>
              <p>Lorem, ipsum dolor.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1612197622847-5eb1e8c32a71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit amet.</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </Link>
          </div>
        </div>
      </section>
      <section id="guns">
        <h2>Rifles</h2>
        <div className="carousel">
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
            <div className="item">
              <div className="img">
                <Link to="/item" className="itemimg">
                  <img
                    src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                    alt=""
                  />
                </Link>
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </Carousel>
          <Link to="/item" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>

      <section id="self-defence">
        <h2>Self Defense</h2>
        <div className="carousel">
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
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </Carousel>
          <Link to="/item" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>

      <section id="accessories">
        <h2>Accessories</h2>
        <div className="carousel">
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
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="item">
              <div className="img">
                <img
                  src="https://images.unsplash.com/photo-1610165539774-791ae89d0574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit.</p>
            </div>
          </Carousel>
          <Link to="/item" className="browsemore">
            Browse more...
          </Link>
        </div>
      </section>
      <section id="browse-all">
        <Link to="/item" className="browse-all">
          Browse all items
        </Link>
      </section>
    </>
  );
};

export default Home;
