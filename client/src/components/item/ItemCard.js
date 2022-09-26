import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {

  return (
    <Link to={ `/items/${item.id}` } className="column is-3 is-2-fullhd has-text-centered">
      <div className="card">
        <div className="card-image">
          <figure className="image is-2by3">
            <img src={item.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="help">{item.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
