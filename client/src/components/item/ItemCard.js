import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {

  return (
    <Link to={ `/items/${item.id}` } className="is-flex item-card column is-3 is-2-fullhd" style={{minWidth: '190px'}}>
      <div className="is-base-background card">
        <div className="card-image">
          <figure className="image">
            <img src={item.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content p-0">
          <div className="content">
            <p className="is-size-6">{item.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
