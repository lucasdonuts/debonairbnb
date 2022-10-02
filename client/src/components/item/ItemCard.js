import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const ItemCard = ({ item }) => {
  const { currentUser } = useSelector(state => state.user);

  const userIsRentingFooter = null;

  const defaultFooter = (
      <div className="card-footer column">
        <div className="item-price-is-justify-content-center">
          <p className="is-size-7">
            <span className="super">$</span>
            <strong className="is-size-5">{item.price}</strong>/day
          </p>
        </div>
        <div className="field is-grouped is-grouped-centered is-grouped-multiline">
          {item.category !== "Accessories" && (
            <div className="control">
              <div className="tags are-small">
                <span className="tag is-dark">
                  {item.size}
                </span>
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
    )

  return (
    <Link
      to={`/items/${item.id}`}
      className="tile is-3 is-2-fullhd item-card mb-5"
      style={{ minWidth: "190px" }}
    >
      <div className="card is-shadowless is-fullheight">
        <div className="card-header item-name is-justify-content-center is-size-7 is-shadowless">
          {item.name}
        </div>
        <div className="card-content py-2">
          <div className="card-image item-image">
            <figure className="image is-256x256">
              <img src={item.image} alt={item.name} />
            </figure>
          </div>
        </div>
        { defaultFooter }
        {/* <div className="card-footer item-tags column">
          <div className="item-price is-justify-content-center">
            <p className="is-size-7">
              <span className="super">$</span>
              <strong className="is-size-5">{item.price}</strong>/day
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered is-grouped-multiline">
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
        </div> */}
      </div>
    </Link>
  );
};

export default ItemCard;
