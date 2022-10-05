import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../reducers/itemsSlice";
import ItemsContainer from "./item/ItemsContainer";
import FiltersContainer from "./item/FiltersContainer";
import Loading from "./Loading";

const Shop = () => {
  const { entities: items, isLoading } = useSelector((state) => state.items);

  const [filters, setFilters] = useState({
    name: { active: false, value: "" },
    sex: { active: false, value: "" },
    category: { active: false, value: "" },
    sizes: {
      Small: false,
      Medium: false,
      Large: false,
      XL: false,
      '2XL': false,
      '6': false,
      '7': false,
      '8': false,
      '9': false,
      '10': false,
      '11': false,
      '12': false,
    },
    available: { active: false },
    // price: { active: false, value: "" },
  });

  const dispatch = useDispatch();

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
        (filters.category.active &&
          item.category === filters.category.value)) &&
      (!Object.entries(filters.sizes).some((size) => size[1]) ||
        Object.entries(filters.sizes)
          .filter((size) => size[1])
          .some((size) => size[0] === item.size)) &&
      (!filters.available.active ||
        (filters.available.active && item["available?"]))
      // (!filters.price.active || filters.price.active && item.price === filters.price.value)
    );
  });

  const applyFilter = (name, value) => {
    if (name === "available") {
      setFilters({
        ...filters,
        available: {
          active: value,
        },
      });
    } else {
      setFilters({
        ...filters,
        [name]: { active: !!value, value: value },
      });
    }
  };

  const updateSizeFilter = (size) => {
    setFilters({
      ...filters,
      sizes: { ...filters.sizes, [size]: !filters.sizes[size] },
    });
  };

  return (
    <>
      <h1 className="is-size-2 is-brand-font is-honeydew-color has-text-centered">
        Browse
      </h1>
      <FiltersContainer
        filters={filters}
        applyFilter={applyFilter}
        updateSizeFilter={updateSizeFilter}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ItemsContainer items={filteredItems} isLoading={isLoading} />
      )}
    </>
  );
};

export default Shop;
