import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../../reducers/userSlice";
import { updateItems } from "../../reducers/itemsSlice";

const ItemPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [item, setItem] = useState({});
  const [isRented, setIsRented] = useState(false);
  const [userHasItem, setUserHasItem] = useState(false);
  const [currentRental, setCurrentRental] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();

  document.addEventListener("click", () => setModalVisible(false));

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  // console.log("currentUser.current_rentals: ", currentUser.current_rentals)
  // console.log("Item: ", item)

  useEffect(() => {
    fetch(`/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setIsRented(data.rentals.some((r) => r.current));
        setUserHasItem(
          data.rentals.some((r) => r.user.id === currentUser.id && r.current)
        );
        // setCurrentRental(data.rentals.find((r) => r.current) || {});
        // setCurrentRental(data.current_rental || {});
        setCurrentRental(data.rentals.find((r) => r.current) || {});
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
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setItem({ ...item, ...data.item });
          setIsRented(true);
          setCurrentRental(data);
          setUserHasItem(true);
          setModalVisible(false);
          // console.log("Borrow data: ", data);
          // console.log("currentUser: ", currentUser);
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
          // setModalVisible(false);
          // console.log("Return data: ", data);
          dispatch(updateItems(data.item));
          dispatch(updateCurrentUser({ ...currentUser, ...data.user }));
        });
      } else {
        res.json().then((data) => setErrors([...errors, data.errors]));
      }
    });
  };

  // console.log("CurrentUser: ", currentUser);

  const borrowButton = (
    <button onClick={handleBorrowClick} className="button is-primary">
      Borrow This Item
    </button>
  );

  const disabledButton = (
    <button className="button" disabled>
      Unavailable
    </button>
  );

  const returnButton = (
    <button onClick={returnItem} className="button is-primary is-light">
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
    console.log(item);
    return (
      <p>
        You have {currentRental.days_remaining} day
        {currentRental.days_remaining > 1 && "s"} left on this rental
      </p>
    );
  };

  return (
    <div className="item-details box is-secondary-background">
      <div className="columns is-centered">
        <div className="column">
          <p className="title is-size-4">{item.name}</p>
          <div className="columns is-mobile">
            <div className="column is-half">
              <figure className="image">
                <img src={item.image} alt={`${item.name}`} />
              </figure>
            </div>
            <div className="column is-half my-auto">
              {/* name, image, sex, size, price, category */}
              {userHasItem ? getReturnInfo() : borrowInfo}
              {getButton()}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        id="confirm-borrow"
        className={modalVisible ? "modal is-active" : "modal"}
      >
        <div className="modal-background"></div>
        <div className="modal-card has-text-centered" onClick={stopPropagation}>
          <div className="modal-card-body">
            <p className="modal-card-title mb-3">Borrow {item.name}?</p>
            <section className="columns is-mobile modal-card-image">
              <div className="column is-4 is-offset-4">
                <figure className="image">
                  <img src={item.image} alt={item.name} />
                </figure>
              </div>
            </section>

            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <div className="select">
                  <select
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    defaultValue="1"
                  >
                    <option value="">How long?</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8">8 Days</option>
                    <option value="9">9 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </div>
              </div>
              <p className="control">
                <button onClick={borrowItem} className="button is-primary">
                  Borrow
                </button>
              </p>
              <p className="control">
                <button
                  onClick={() => setModalVisible(false)}
                  className="button"
                >
                  Cancel
                </button>
              </p>
            </div>
            <p className="is-danger">{errors}</p>
          </div>
        </div>
        <button
          onClick={() => setModalVisible(false)}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </div>
  );
};

export default ItemPage;

// const borrowItem = () => {
//   fetch(`/rent_item`, {
//     method: `POST`,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       item_id: item.id,
//       duration: duration,
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       res.json().then((data) => {
//         setItem(data.item);
//         setIsRented(true);
//         setCurrentRental(data);
//         setUserHasItem(true);
//         setModalVisible(false);
//         console.log("Borrow data: ", data)
//         dispatch(updateCurrentUser({...currentUser, current_rentals: [...currentUser.current_rentals, data]}))
//       });
//     } else {
//       res.json().then((data) => setErrors([...errors, data.errors]));
//     }
//   });
// };
