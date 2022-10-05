import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../../reducers/userSlice";
import { updateItems } from "../../reducers/itemsSlice";

import { BorrowModal, ReturnModal, LargeImageModal } from "../modals";

const ItemPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [item, setItem] = useState({});
  const [isRented, setIsRented] = useState(false);
  const [userHasItem, setUserHasItem] = useState(false);
  const [currentRental, setCurrentRental] = useState({});
  const [borrowModalVisible, setBorrowModalVisible] = useState(false);
  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();

  const closeModals = () => {
    setBorrowModalVisible(false);
    setReturnModalVisible(false);
    setImageModalVisible(false);
  };

  useEffect(() => {
    fetch(`/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setIsRented(data.rentals.some((r) => r.current));
        setUserHasItem(
          data.rentals.some((r) => r.user.id === currentUser.id && r.current)
        );
        setCurrentRental(data.rentals.find((r) => r.current) || {});
      });
  }, []);

  const handleBorrowClick = (e) => {
    // To stop from triggering document wide click event listener
    e.stopPropagation();
    // Show confirmation pop-up
    setBorrowModalVisible(true);
  };

  const handleReturnClick = (e) => {
    // To stop from triggering document wide click event listener
    e.stopPropagation();
    // Show confirmation pop-up
    setReturnModalVisible(true);
  };

  const handleImageClick = (e) => {
    // To stop from triggering document wide click event listener
    e.stopPropagation();
    // Show confirmation pop-up
    setImageModalVisible(true);
  };

  const borrowItem = () => {
    fetch(`/rent_item`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.id,
        duration: duration,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setItem({ ...item, ...data.item });
          setIsRented(true);
          setCurrentRental(data);
          setUserHasItem(true);
          setBorrowModalVisible(false);
          dispatch(updateCurrentUser({ ...currentUser, ...data.user }));
        });
      } else {
        res.json().then((data) => setErrors([...errors, data.errors]));
      }
    });
  };

  const returnItem = () => {
    fetch(`/rentals`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.id,
        user_id: currentUser.id,
        current: false,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setItem({ ...item, ...data.item });
          setIsRented(false);
          setCurrentRental({});
          setUserHasItem(false);
          dispatch(updateItems(data.item));
          dispatch(updateCurrentUser({ ...currentUser, ...data.user }));
        });
      } else {
        res.json().then((data) => setErrors([...errors, data.errors]));
      }
    });
  };

  const borrowButton = (
    <button onClick={handleBorrowClick} className="button is-dark">
      Borrow This Item
    </button>
  );

  const disabledButton = (
    <button className="button" disabled>
      Unavailable
    </button>
  );

  const returnButton = (
    <button onClick={handleReturnClick} className="button is-accent-button">
      Return This Item
    </button>
  );

  const getButton = () => {
    if (!isRented) {
      return borrowButton;
    } else if (userHasItem) {
      return returnButton;
    }
    return disabledButton;
  };

  const borrowInfo = (
    <p>
      <strong className="has-text-primary is-size-4">${item.price}</strong>
      /day
    </p>
  );

  const getReturnInfo = () => {
    return (
      <p>
        You have {currentRental.days_remaining} day
        {currentRental.days_remaining > 1 && "s"} left on this rental
      </p>
    );
  };

  const selectDuration = (e) => {
    setDuration(parseInt(e.target.value));
  };

  document.addEventListener("click", closeModals);

  return (
    <div className="item-details box is-secondary-background">
      <div className="columns is-centered">
        <div className="column">
          <p className="title is-size-4">{item.name}</p>
          <div className="columns is-centered is-mobile">
            <div className="column is-3">
              {/* Item card start */}
              <div
                className="item-card mb-5"
                style={{ minWidth: "min-content" }}
              >
                <div className="card item-page-card is-shadowless">
                  <div className="card-header item-name is-justify-content-center is-size-7 has-text-weight-bold is-shadowless"></div>
                  <div className="card-content py-1">
                    {/* Item Image */}
                    <div
                      onClick={handleImageClick}
                      className="card-image item-image"
                    >
                      <figure className="image">
                        <img src={item.image} alt={item.name} />
                      </figure>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="tags is-centered">
                      {item.category !== "Accessories" && (
                        <div className="control">
                          <span className="tag is-dark is-medium">
                            {item.size}
                          </span>
                        </div>
                      )}
                      <div className="control">
                        <span className="tag is-light is-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item card info */}
            </div>
            <div className="column is-3 my-auto">
              {/* name, image, sex, size, price, category */}
              {userHasItem ? getReturnInfo() : borrowInfo}
              {getButton()}
            </div>
          </div>
        </div>
      </div>

      <BorrowModal
        borrowModalVisible={borrowModalVisible}
        setBorrowModalVisible={setBorrowModalVisible}
        borrowItem={borrowItem}
        item={item}
        selectDuration={selectDuration}
        errors={errors}
      />

      <ReturnModal
        returnModalVisible={returnModalVisible}
        setReturnModalVisible={setReturnModalVisible}
        item={item}
        currentRental={currentRental}
        returnItem={returnItem}
        errors={errors}
      />

      <LargeImageModal
        itemImage={item.image}
        itemName={item.name}
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
    </div>
  );
};

export default ItemPage;
