import React, { useEffect, useState } from "react";
import "./Browse.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 100;
const COLORS = ["black", "black", "black", "black"];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "ratingLow", label: "Rating: Low to High" },
  { value: "ratingHigh", label: "Rating: High to Low" },
];

const Browse = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [values, setValues] = useState([MIN, MAX]);
  const [items, setItems] = useState(null);

  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
  };
  const handleCategoryChange = async (selectedOption) => {
    setSelectedCategoryOption(selectedOption);

    //fetch category items
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/items/?category_id=${selectedOption.value}`
    );
    const data = await res.json();
  };
  const mapCategories = (data) => {
    setCategoryOptions(data.map((el) => ({ value: el.id, label: el.title })));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/categories/?format=json`
      );
      return await res.json();
    }
    //fetch categories
    fetchData().then((res) => mapCategories(res));
  }, []);
  return (
    <div id="browse">
      <aside id="filters">
        <h2>Filters</h2>
        <div className="select-container">
          <h3>Sort</h3>
          <Select
            className="select"
            value={selectedSortOption}
            onChange={handleSortChange}
            options={sortOptions}
            autoComplete="off"
            placeholder="Select sort option..."
          />
        </div>
        <div className="select-container">
          <h3>Category</h3>
          <Select
            className="select"
            value={selectedCategoryOption}
            onChange={handleCategoryChange}
            options={categoryOptions}
            autoComplete="off"
            placeholder="Select category..."
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "95%",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              textAlign: "left",
              marginBottom: "1rem",
            }}
          >
            Price range
          </h3>
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values,
                      colors: COLORS,
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged, index }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "30px",
                  width: "30px",
                  borderRadius: "4px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              >
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? COLORS[index] : "#CCC",
                  }}
                />
              </div>
            )}
          />
          <output style={{ marginTop: "30px" }}>
            {values[0].toFixed(1)} - {values[1].toFixed(1)}
          </output>
        </div>
      </aside>
      <section id="browse-section">
        <h2>Items</h2>
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
    </div>
  );
};
export default Browse;
