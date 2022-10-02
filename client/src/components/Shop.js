import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, getCategories } from "../reducers/itemsSlice";
import ItemsContainer from './item/ItemsContainer';
import FiltersContainer from './item/FiltersContainer';
import Loading from './Loading';

const Shop = () => {
  const { entities: items, isLoading } = useSelector((state) => state.items);

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

  const applyFilter = (name, value) => {
    // If value is an empty string, set that filter inactive
    const active = !!value;

    setFilters({
      ...filters,
      [name]: { active: active, value: value },
    });
  };

  return(
    <>
      <h1 className="is-size-2 is-brand-font is-honeydew-color has-text-centered">Browse</h1>
      <FiltersContainer filters={filters} applyFilter={applyFilter} />
      {isLoading ? <Loading /> : <ItemsContainer items={filteredItems} isLoading={isLoading} />}
    </>
  )
}

export default Shop;