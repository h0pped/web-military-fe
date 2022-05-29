import React, { useEffect, useState } from "react";
import "./Browse.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
let MIN = 0;
let MAX = 100;
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
  const [shownItems, setShownItems] = useState(null);

  const filterItems = (filterOption = selectedSortOption?.value) => {
    const [min, max] = values;
    if (shownItems) {
      const filtered = items
        .filter((item) => item.price >= min && item.price <= max)
        .filter((item) => item.visible === true);
      let sorted;
      switch (filterOption) {
        case "featured":
          sorted = filtered.sort((a, b) => a.id - b.id);
          break;
        case "priceLow":
          sorted = filtered.sort((a, b) => a.price - b.price);
          break;
        case "priceHigh":
          sorted = filtered.sort((a, b) => b.price - a.price);
          break;
        case "ratingLow":
          sorted = filtered.sort((a, b) => a.avg_rating - b.avg_rating);
          break;
        case "ratingHigh":
          sorted = filtered.sort((a, b) => b.avg_rating - a.avg_rating);
          break;
        default:
          sorted = filtered.sort((a, b) => a.id - b.id);
      }

      setShownItems(sorted);
    }
  };
  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    filterItems(selectedOption.value);
  };
  const handleCategoryChange = async (selectedOption) => {
    setSelectedCategoryOption(selectedOption);

    //fetch category items
    console.log(selectedOption.value === "all");
    if (selectedOption.value === "all") {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/items/`);
      let data = await res.json();
      data = data.filter((item) => item.visible === true);
      if (data.length > 0) {
        MIN = data[0].price;
        MAX = data[0].price;
        data.forEach((item) => {
          if (item.price > MAX) {
            MAX = item.price;
          } else if (item.price < MIN) {
            MIN = item.price;
          }
        });
        if (MIN === MAX) MAX += 0.1;

        setValues([MIN, MAX]);
      } else {
        MIN = 0;
        MAX = 0;
        setValues([MIN, MAX]);
      }
      setItems(data);
      setShownItems(data);
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/items/?category_id=${selectedOption.value}`
      );
      let data = await res.json();
      data = data.filter((item) => item.visible === true);
      if (data.length > 0) {
        MIN = data[0].price;
        MAX = data[0].price;
        data.forEach((item) => {
          if (item.price > MAX) {
            MAX = item.price;
          } else if (item.price < MIN) {
            MIN = item.price;
          }
        });
        if (MIN === MAX) MAX += 0.1;

        setValues([MIN, MAX]);
      } else {
        MIN = 0;
        MAX = 0;
        setValues([MIN, MAX]);
      }
      setItems(data);
      setShownItems(data);
    }
  };
  const mapCategories = (data) => {
    const categories = data.map((el) => ({ value: el.id, label: el.title }));
    categories.unshift({ value: "all", label: "All" });
    setCategoryOptions(categories);
  };

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/categories/?format=json`
      ).then((res) => res.json());
      let items = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/items/`
      ).then((i) => i.json());
      items = items.filter((item) => item.visible === true);
      return { items, categories };
    }
    //fetch categories
    fetchCategories().then((res) => {
      mapCategories(res.categories);
      setItems(res.items);
      setShownItems(res.items);
      if (res.items.length > 0) {
        MIN = res.items[0].price;
        MAX = res.items[0].price;
        res.items.forEach((item) => {
          if (item.price > MAX) {
            MAX = item.price;
          } else if (item.price < MIN) {
            MIN = item.price;
          }
        });
        if (MIN === MAX) MAX += 0.1;

        setValues([MIN, MAX]);
      }
    });
  }, []);
  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
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
            onChange={(values) => {
              setValues(values);
              filterItems();
            }}
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
        {shownItems && (
          <div className="grid">
            {shownItems.map((item) => (
              <div className="item">
                <Link to={`/item/${item.id}`}>
                  <div className="img">
                    <img src={item.photoPath} alt="" />
                  </div>
                  <p>{item.title}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default Browse;
