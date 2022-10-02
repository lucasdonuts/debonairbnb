import { v4 as uuid } from "uuid";
import ItemCard from "./ItemCard";
import Loading from "../Loading";

const ItemsContainer = ({ items, isLoading }) => {

  const itemsToDisplay = items.map((item) => {
    return(
        <ItemCard item={item} key={uuid()} />
    )
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="columns is-multiline is-centered is-variable is-1">{itemsToDisplay}</div>
    </>
  );
};

export default ItemsContainer;
  //   return <option value={c} key={uuid()}>{ c }</option>
  // })

  // const { categories } = useSelector((state) => state.items);
  // const [filters, setFilters] = useState({
  //   name: { active: false, value: "" },
  //   sex: { active: false, value: "" },
  //   category: { active: false, value: "" },
  //   // size: { active: false, value: "" },
  //   // price: { active: false, value: "" },
  // });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getItems());
  // }, []);

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, [items]);

  // const changeFilters = (e) => {
  //   if (e.target.value === "") {
  //     setFilters({
  //       ...filters,
  //       [e.target.name]: { active: false, value: "" },
  //     });
  //   } else {
  //     setFilters({
  //       ...filters,
  //       [e.target.name]: { active: true, value: e.target.value },
  //     });
  //   }
  // };

  // const items = items.filter((item) => {
  //   return (
  //     (!filters.name.active ||
  //       (filters.name.active &&
  //         item.name
  //           .toLowerCase()
  //           .includes(filters.name.value.toLowerCase()))) &&
  //     (!filters.sex.active ||
  //       (filters.sex.active && item.sex === filters.sex.value)) &&
  //     (!filters.category.active ||
  //       (filters.category.active && item.category === filters.category.value)) //&&
  //     // (!filters.size.active || filters.size.active && item.size === filters.size.value) &&
  //     // (!filters.price.active || filters.price.active && item.price === filters.price.value)
  //   );
  // });