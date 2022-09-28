import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../reducers/userSlice";

const ItemPage = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const [item, setItem] = useState({});
  const [isRented, setIsRented] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();

  document.addEventListener("click", () => setModalVisible(false));

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    fetch(`/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setIsRented(data.rentals.some((r) => r.current));
      });
  }, []);

  const handleBorrowClick = (e) => {
    e.stopPropagation();
    // Show confirmation pop-up
    setModalVisible(true);
  };

  const borrowItem = () => {
    fetch(`/rent_item`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.id,
        duration: duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.item);
        dispatch(getCurrentUser());
        setIsRented(true);
        setModalVisible(false);
      });
  };

  const returnItem = () => {
    fetch(`/rentals`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.id,
        user_id: user.id,
        current: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsRented(false);
        dispatch(getCurrentUser());
      });
  };
  // console.log(user.rentals)

  const borrowButton = (
    <button onClick={handleBorrowClick} className="button">
      Borrow
    </button>
  );

  const disabledButton = (
    <button className="button" disabled>
      Unavailable
    </button>
  );

  const returnButton = (
    <button onClick={returnItem} className="button">
      Return
    </button>
  );

  const getButton = () => {
    if (!isRented) {
      return borrowButton;
    } else if (user.current_rentals.some((r) => r.item_id === item.id)) {
      return returnButton;
    }
    return disabledButton;
  };

  return (
    <div className="item-details box">
      <div className="columns is-centered">
        <div className="column">
          <div className="is-fullwidth">
            <p className="title is-size-4">{item.name}</p>
            <div className="columns">
              <div className="column is-half">
                
              </div>
              <div className="column is-half">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
