export const BorrowModal = ({
  borrowModalVisible,
  setBorrowModalVisible,
  item,
  borrowItem,
  selectDuration,
  errors,
}) => {
  return (
    <div
      id="confirm-borrow"
      className={borrowModalVisible ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <div
        className="modal-card has-text-centered"
        onClick={(e) => e.stopPropagation()}
      >
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
                <select onChange={selectDuration} defaultValue="1">
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
              <button onClick={borrowItem} className="button is-dark">
                Borrow
              </button>
            </p>
            <p className="control">
              <button
                onClick={() => setBorrowModalVisible(false)}
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
        onClick={() => setBorrowModalVisible(false)}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export const ReturnModal = ({
  returnModalVisible,
  setReturnModalVisible,
  item,
  currentRental,
  returnItem,
  errors,
}) => {
  const { days_remaining: daysRemaining } = currentRental;

  const getRentalStatus = () => {
    if (daysRemaining > 0) {
      return (
        <span className="tag subtitle is-success is-light">
          {`You have ${daysRemaining} day${daysRemaining > 1 ? "s" : ""} left`}
        </span>
      );
    } else if (daysRemaining < 0) {
      return (
        <span className="tag subtitle is-danger is-light">
          {`This item is ${0 - daysRemaining} day${
            daysRemaining < -1 ? "s" : ""
          } overdue`}
        </span>
      );
    } else {
      return (
        <span className="tag subtitle is-warning is-light">
          {`This item is due today`}
        </span>
      );
    }
  };

  return (
    <div
      id="confirm-return"
      className={returnModalVisible ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <div
        className="modal-card has-text-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-card-body">
          <p className="modal-card-title mb-3">Return {item.name}?</p>
          {getRentalStatus()}
          <section className="columns is-mobile modal-card-image">
            <div className="column is-4 is-offset-4">
              <figure className="image">
                <img src={item.image} alt={item.name} />
              </figure>
            </div>
          </section>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button onClick={returnItem} className="button is-dark">
                Return
              </button>
            </p>
            <p className="control">
              <button
                onClick={() => setReturnModalVisible(false)}
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
        onClick={() => setReturnModalVisible(false)}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export const LogoutModal = ({
  handleLogout,
  logoutModalVisible,
  setLogoutModalVisible,
}) => {
  return (
    <div
      id="confirm-logout"
      className={logoutModalVisible ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <div
        className="modal-card has-text-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-card-body">
          <p className="modal-card-title mb-3">
            Are you sure you want to log out?
          </p>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button onClick={handleLogout} className="button is-dark">
                Log Out
              </button>
            </p>
            <p className="control">
              <button
                onClick={() => setLogoutModalVisible(false)}
                className="button"
              >
                Cancel
              </button>
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setLogoutModalVisible(false)}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export const LargeImageModal = ({
  itemImage,
  itemName,
  imageModalVisible,
  setImageModalVisible,
}) => {
  return (
    <div
      id="large-image-modal"
      className={imageModalVisible ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <div className="modal-content">
        <p className="image">
          <img
            onClick={(e) => e.stopPropagation()}
            src={itemImage}
            alt={itemName}
            className="modal-image"
          />
        </p>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
};

// export const DeleteAccountModal = ({

// }) => {

// }
