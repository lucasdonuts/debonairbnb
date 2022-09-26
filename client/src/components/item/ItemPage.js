import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from '../../reducers/userSlice';

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
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: item.id,
        user_id: user.id,
        current: false
      })
    })
      .then(res => res.json())
      .then( data => {
        setIsRented(false);
        dispatch(getCurrentUser(data.user))
      })
  }
  // console.log(user.rentals)

  const borrowButton = (
    <button onClick={handleBorrowClick} className="button">
      Borrow
    </button>
  );

  const disabledButton = (
    <button className="button" disabled>Unavailable</button>
  );

  const returnButton = (
    <button onClick={ returnItem } className="button">Return</button>
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
    <>
      <p className="title has-text-white">{item.name}</p>
      {getButton()}
      <br />
      <img src={item.image} alt={item.name} />

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
                <figure className="image is-2by3">
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
                    <option value="">
                      How long?
                    </option>
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
          </div>
        </div>
        <button
          onClick={() => setModalVisible(false)}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  );
};

export default ItemPage;
