import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemCard = ({ item }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isRented, setIsRented] = useState(false);
  const [userHasItem, setUserHasItem] = useState(false);
  // console.log("currentUser: ", currentUser)
  // console.log("item: ", item)

  useEffect(() => {
    setIsRented(!item["available?"]);
    setUserHasItem(
      item.current_rental && item.current_rental.user_id === currentUser.id
    );
  }, [currentUser, item]);

  const availableTag = (
    <div className="field">
      <div className="control">
        <span className="tag availability is-success">Available Now</span>
      </div>
    </div>
  );

  const unavailableTag = (
    <div className="field">
      <div className="control">
        <span className="tag availability is-light">Unavailable</span>
      </div>
    </div>
  );

  const getRentalStatusTag = () => {
    if (userHasItem) {
      const rental = item.rentals.find(
        (r) => r.user.id === currentUser.id && r.current
      );

      if (rental.days_remaining > 0) {
        return (
          <div className="control">
            <span className="tag availability is-info is-light">
              {`${rental.days_remaining} days left`}
            </span>
          </div>
        );
      } else if (rental.days_remaining === 0) {
        return (
          <div className="control">
            <span className="tag availability is-warning is-light">
              Item is due today
            </span>
          </div>
        );
      } else {
        return (
          <div className="control">
            <span className="tag availability is-danger is-light">
              Item is overdue
            </span>
          </div>
        );
      }
    } else {
      return isRented ? unavailableTag : availableTag;
    }
  };

  const defaultFooter = (
    <div className="card-footer">
      <div className="item-price is-justify-content-center">
        <p className="is-size-7">
          <span className="super">$</span>
          <strong className="is-size-5">{item.price}</strong>/day
        </p>
      </div>

      <div className="field is-grouped is-grouped-centered">
        {item.category !== "Accessories" && (
          <div className="control">
            <div className="tags are-small">
              <span className="tag is-dark">{item.size}</span>
            </div>
          </div>
        )}
        <div className="control">
          <div className="tags are-small">
            <span className="tag is-light">{item.category}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // if(!item){
  //   return "Loading"
  // }

  return (
    <Link
      to={`/items/${item.id}`}
      className="column item-card is-3 is-2-desktop mb-5"
      style={{ minWidth: "190px" }}
    >
      <div className="card is-shadowless">
        <div className="card-header item-name is-justify-content-center is-size-7 has-text-weight-bold is-shadowless">
          {item.name}
        </div>
        <div className="card-header item-name is-justify-content-center is-shadowless">
          {getRentalStatusTag()}
        </div>
        <div className="card-content py-1">
          <div className="card-image item-image">
            <figure className="image">
              <img src={item.image} alt={item.name} />
            </figure>
          </div>
        </div>
        {defaultFooter}
      </div>
    </Link>
  );
};

export default ItemCard;
