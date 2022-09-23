import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../reducers/itemsSlice";
import ItemCard from "./ItemCard";

const ItemsContainer = () => {
  const { entities: items, isLoading } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const itemsToDisplay = items.map((item) => {
    return <ItemCard item={item} />;
  });

  if (isLoading) {
    return <h1 className="title">Loading...</h1>;
  }

  return (
    <>
      <div className="container columns is-multiline is-centered">
        {itemsToDisplay}
      </div>
      {/* <div className="section columns is-multiline is-centered">{itemsToDisplay}</div> */}
      {/* <div className="is-flex is-flex-wrap-wrap">{itemsToDisplay}</div> */}
    </>
  );
};

export default ItemsContainer;
