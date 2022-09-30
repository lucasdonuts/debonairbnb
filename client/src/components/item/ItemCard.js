import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div class="tile is-3 is-2-fullhd">
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
          <div className="has-text-weight-bold">{item.size}</div>
          {/* <div className="card-content p-0">
          <div className="content">
            <p className="is-size-6">{item.name}</p>
          </div>
        </div> */}
        </div>
      </Link>
    </div>

    // <Link to={ `/items/${item.id}` } className="is-flex item-card column is-3 is-2-fullhd" style={{minWidth: '190px'}}>
    //   <div className="is-base-background card">
    //     <div className="card-header">
    //       {item.name}
    //     </div>
    //     <div className="card-image">
    //       <figure className="image is-256x256">
    //         <img src={item.image} alt={item.name} />
    //       </figure>
    //     </div>
    //     {/* <div className="card-content p-0">
    //       <div className="content">
    //         <p className="is-size-6">{item.name}</p>
    //       </div>
    //     </div> */}
    //   </div>
    // </Link>
  );
};

export default ItemCard;
