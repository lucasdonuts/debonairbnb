import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import ItemsContainer from "../item/ItemsContainer";
import NewItemForm from "../item/NewItemForm";
import Loading from "../Loading";

const Wardrobe = ({}) => {
  const { currentUser, isLoading: userLoading } = useSelector(
    (state) => state.user
  )
  const [wardrobeItems, setWardrobeItems] = useState([]);

  useEffect(() => {
    setWardrobeItems(currentUser.items_for_rent)
    console.log("Wardrobe items: ", wardrobeItems)
  }, [currentUser])

  return (
    <>
      {/* Make this button look way better after it's functional */}
      <Link to="/items/new" element={<NewItemForm />} >
        <button
          className="button is-success"
        >
          + Add to Wardrobe
        </button>
      </Link>
      <h1 className="is-size-2 is-honeydew-color is-brand-font has-text-left has-text-centered-fullhd">
        Current
      </h1>
      <hr className="divider"></hr>
      <div className="columns is-multiline is-centered is-variable is-1 user-items">
        {userLoading ? (
          <Loading />
        ) : (
          <ItemsContainer items={wardrobeItems} isLoading={userLoading} />
        )}
      </div>
    </>
  );
};

export default Wardrobe;