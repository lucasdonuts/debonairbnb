import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import { getItems } from "../reducers/itemsSlice";
import ItemCard from "./ItemCard";

const ItemsContainer = () => {
  const { entities: items, isLoading } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const itemsToDisplay = items.map((item) => {
    return <ItemCard item={item} key={ uuid() } />;
  });

  if (isLoading) {
    return <h1 className="title">Loading...</h1>;
  }

  return (
    <>
      <div className="container columns is-multiline is-centered">
        {itemsToDisplay}
      </div>
    </>
  );
};

export default ItemsContainer;
