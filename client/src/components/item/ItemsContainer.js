import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { getItems, getCategories } from "../../reducers/itemsSlice";
import ItemCard from "./ItemCard";
import Loading from "../Loading";

const ItemsContainer = () => {
  const { entities: items, isLoading } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.items);
  const [filters, setFilters] = useState({
    name: { active: false, value: "" },
    sex: { active: false, value: "" },
    category: { active: false, value: "" },
    // size: { active: false, value: "" },
    // price: { active: false, value: "" },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [items]);

  const changeFilters = (e) => {
    if (e.target.value === "") {
      setFilters({
        ...filters,
        [e.target.name]: { active: false, value: "" },
      });
    } else {
      setFilters({
        ...filters,
        [e.target.name]: { active: true, value: e.target.value },
      });
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (!filters.name.active ||
        (filters.name.active &&
          item.name
            .toLowerCase()
            .includes(filters.name.value.toLowerCase()))) &&
      (!filters.sex.active ||
        (filters.sex.active && item.sex === filters.sex.value)) &&
      (!filters.category.active ||
        (filters.category.active && item.category === filters.category.value)) //&&
      // (!filters.size.active || filters.size.active && item.size === filters.size.value) &&
      // (!filters.price.active || filters.price.active && item.price === filters.price.value)
    );
  });

  const itemsToDisplay = filteredItems.map((item) => {
    return <ItemCard item={item} key={uuid()} />;
  });

  const categoryOptions = categories.map( c => {
    return <option value={c} key={uuid()}>{ c }</option>
  })

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="box pt-1">
        <p className="has-text-centered is-size-4">Filters</p>
        <div className="field">
          <div className="control">
            <input
              onChange={changeFilters}
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
              <select name="category" onChange={changeFilters} value={filters.category.value}>
                <option value="">All Categories</option>
                { categoryOptions }
              </select>
            </div>
          </div>
          <div className="control">
            <label className="radio">
              <input onChange={changeFilters} type="radio" name="sex" value="" />
              Both
            </label>
            <label className="radio">
              <input
                onChange={changeFilters}
                type="radio"
                name="sex"
                value="Men"
              />
              Men
            </label>
            <label className="radio">
              <input
                onChange={changeFilters}
                type="radio"
                name="sex"
                value="Women"
              />
              Women
            </label>
          </div>
        </div>
      </div>
      <div className="columns is-multiline is-centered">{itemsToDisplay}</div>
    </>
  );
};

export default ItemsContainer;
