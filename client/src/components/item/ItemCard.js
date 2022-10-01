import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="tile is-3 is-2-fullhd">
      <Link
        to={`/items/${item.id}`}
        className="tile is-parent is-3 is-2-fullhd item-card"
        style={{ minWidth: "190px" }}
      >
        <div className="card is-shadowless">
          <div className="card-header is-justify-content-center is-size-7 is-shadowless">
            {item.name}
          </div>
          <div className="card-image">
            <figure className="image is-256x256">
              <img src={item.image} alt={item.name} />
            </figure>
          </div>
          <p className="is-size-7">
            <span className="super">$</span>
            <strong className="is-size-5">{item.price}</strong>/day
          </p>
          <div className="field is-grouped is-grouped-centered is-grouped-multiline">
            {item.category !== "Accessories" && <div className="control">
              <div className="tags has-addons are-small">
                <span className="tag is-dark">{item.size}</span>
              </div>
            </div>}

            <div className="control">
              <div className="tags has-addons are-small">
                <span className="tag is-light">{item.category}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
