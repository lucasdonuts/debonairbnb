import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemsContainer from "../item/ItemsContainer";
import Loading from "../Loading";

const UserItems = () => {
  const { currentUser, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  const { entities: items, isLoading: itemsLoading } = useSelector(
    (state) => state.items
  );
  const [currentRentalItems, setCurrentRentalItems] = useState([]);
  const [pastRentalItems, setPastRentalItems] = useState([]);

  useEffect(() => {
    // console.log(currentUser, items)
    setPastRentalItems(
      currentUser.past_rentals.map((r) => {
        return items.find((item) => item.id === r.item_id);
      })
    );
    setCurrentRentalItems(
      items.filter(
        (item) =>
          item.current_rental && item.current_rental.user_id === currentUser.id
      )
    );
  }, [currentUser, items]);

  if ((userLoading, itemsLoading)) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="is-size-2 is-honeydew-color is-brand-font has-text-left has-text-centered-fullhd">
        Current
      </h1>
      <hr className="divider"></hr>
      <div className="columns is-multiline is-centered is-variable is-1 user-items">
        {itemsLoading ? (
          <Loading />
        ) : (
          <ItemsContainer items={currentRentalItems} isLoading={itemsLoading} />
        )}
      </div>
      <h1 className="is-size-2 is-honeydew-color is-brand-font has-text-left has-text-centered-fullhd">
        Past Rentals
      </h1>
      <hr className="divider"></hr>
      <div className="columns is-multiline is-centered is-variable is-1 user-items">
        {itemsLoading ? (
          <Loading />
        ) : (
          <ItemsContainer items={pastRentalItems} isLoading={itemsLoading} />
        )}
      </div>
    </>
  );
};

export default UserItems;
