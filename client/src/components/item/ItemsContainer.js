import { v4 as uuid } from "uuid";
import ItemCard from "./ItemCard";

const ItemsContainer = ({ items }) => {
  const itemsToDisplay = items.map((item) => {
    return <ItemCard item={item} key={uuid()} />;
  });

  return (
    <>
      <div className="columns is-multiline is-centered is-variable is-1 is-mobile">
        {itemsToDisplay}
      </div>
    </>
  );
};

export default ItemsContainer;