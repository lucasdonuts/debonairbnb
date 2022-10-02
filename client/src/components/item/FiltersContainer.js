import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
// import { getItems, getCategories } from "../../reducers/itemsSlice";
// import ItemCard from "./ItemCard";
// import Loading from "../Loading";

const FiltersContainer = ({ filters, applyFilter }) => {
  const { categories } = useSelector((state) => state.items);

  const categoryOptions = categories.map((c) => {
    return (
      <option value={c} key={uuid()}>
        {c}
      </option>
    );
  });

  const handleFilterChange = (e) => {
    applyFilter(e.target.name, e.target.value);
  };

  return (
    <div className="box pt-1 has-text-dark filters-container">
      <p className="has-text-centered is-size-4">Filters</p>
      <div className="field">
        <div className="control">
          <input
            onChange={handleFilterChange}
            id="search-input"
            className="input"
            name="name"
            type="text"
            placeholder="Search"
            value={filters.name.value}
          />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <div className="select">
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
          <label className="radio">
            <input
              onChange={handleFilterChange}
              type="radio"
              name="sex"
              value=""
              className="m-1"
            />
            Both
          </label>
          <label className="radio">
            <input
              onChange={handleFilterChange}
              type="radio"
              name="sex"
              value="Men"
              className="m-1"
            />
            Men
          </label>
          <label className="radio">
            <input
              onChange={handleFilterChange}
              type="radio"
              name="sex"
              value="Women"
              className="m-1"
            />
            Women
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersContainer;
