import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import { getItems } from "../../reducers/itemsSlice";
import ItemCard from "./ItemCard";
import Loading from '../Loading';

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
    return <Loading />
  }

  return (
    <>
      <div className="columns is-multiline is-centered">
        {itemsToDisplay}
      </div>
    </>
  );
};

export default ItemsContainer;
