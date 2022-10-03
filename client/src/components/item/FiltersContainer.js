import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const FiltersContainer = ({
  filters,
  applyFilter,
  updateSizeFilter = null,
}) => {
  const { categories } = useSelector((state) => state.items);
  const [activeSizeFilters, setActiveSizeFilters] = useState({
    Small: false,
    Medium: false,
    Large: false,
    XL: false,
    "2XL": false,
  });

  const categoryOptions = categories.map((c) => {
    return (
      <option value={c} key={uuid()}>
        {c}
      </option>
    );
  });

  const handleSizeClick = (size) => {
    setActiveSizeFilters({
      ...activeSizeFilters,
      [size]: !activeSizeFilters[size],
    });
    updateSizeFilter(size);
  };

  const handleFilterChange = (e) => {
    applyFilter(e.target.name, e.target.value);
  };

  const toggleAvailableFilter = () => {
    applyFilter("available", !filters.available.active);
  };
  // console.log(filters);

  return (
    <div className="box is-shadowless pt-1 has-text-dark filters-container">
      <p className="has-text-centered is-size-4">Filters</p>
      {/* Search Bar */}
      <div className="field">
        <div className="control">
          <input
            onChange={handleFilterChange}
            id="search-input"
            className="input is-small"
            name="name"
            type="text"
            placeholder="Search"
            value={filters.name.value}
          />
        </div>
      </div>
      {/* Category, Sex, Sizes */}
      <div className="field is-grouped is-justify-content-space-around">
        <div className="control">
          <div className="select is-small">
            <select
              name="category"
              onChange={handleFilterChange}
              value={filters.category.value}
            >
              <option value="">All Categories</option>
              {categoryOptions}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="tag has-addons p-0">
            <span
              className={`tag is-radiusless is-clickable ${
                filters.sex.value === "" ? "is-dark" : ""
              }`}
            >
              <label
                className={`radio is-size-7 ${
                  filters.sex.value === "" ? "has-text-white" : ""
                }`}
              >
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="sex"
                  value=""
                  className="m-1 is-hidden"
                />
                Both
              </label>
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                filters.sex.value === "Men" ? "is-dark" : ""
              }`}
            >
              <label
                className={`radio is-size-7 ${
                  filters.sex.value === "Men" ? "has-text-white" : ""
                }`}
              >
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="sex"
                  value="Men"
                  className="m-1 is-hidden"
                />
                Men
              </label>
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                filters.sex.value === "Women" ? "is-dark" : ""
              }`}
            >
              <label
                className={`radio is-size-7 ${
                  filters.sex.value === "Women" ? "has-text-white" : ""
                }`}
              >
                <input
                  onChange={handleFilterChange}
                  type="radio"
                  name="sex"
                  value="Women"
                  className="m-1 is-hidden"
                />
                Women
              </label>
            </span>
          </div>
        </div>
        <div className="control">
          <div className="tag has-addons p-0">
            <span
              className={`tag is-radiusless is-clickable ${
                activeSizeFilters.Small ? "is-dark" : ""
              }`}
              onClick={() => handleSizeClick("Small")}
            >
              Small
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                activeSizeFilters.Medium ? "is-dark" : ""
              }`}
              onClick={() => handleSizeClick("Medium")}
            >
              Medium
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                activeSizeFilters.Large ? "is-dark" : ""
              }`}
              onClick={() => handleSizeClick("Large")}
            >
              Large
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                activeSizeFilters.XL ? "is-dark" : ""
              }`}
              onClick={() => handleSizeClick("XL")}
            >
              XL
            </span>
            <span
              className={`tag is-radiusless is-clickable ${
                activeSizeFilters["2XL"] ? "is-dark" : ""
              }`}
              onClick={() => handleSizeClick("2XL")}
            >
              2XL
            </span>
          </div>
        </div>
      </div>
      {/* Available Now */}
      <div className="control">
        <span
          // onClick={handleFilterChange}
          onClick={() => toggleAvailableFilter()}
          value={filters.available.value}
          className={`tag is-success is-clickable available-now-button ${
            filters.available.active ? "" : "is-light"
          }`}
          name="available"
        >
          Available Now
        </span>
        {/* 
        <label
          htmlFor="available"
          className="label"
          onClick={(e) => console.log(e.target.value)}
        >
          <span
            className={`tag is-success has-text-weight-light ${
              filters.available.active ? "" : ""
            }`}
          >
            <input
              type="checkbox"
              className="mr-1"
              name="available"
              value={filters.available.value}
            />
            Available Now
          </span>
        </label> */}
      </div>
    </div>
  );
};

export default FiltersContainer;
