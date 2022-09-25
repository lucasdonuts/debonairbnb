import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  // const { name, image, sex, category, size, price } = item;
  // console.log(item)

  return (
    <Link to={ `/items/${item.id}` } className="column is-3 is-2-fullhd">
      {/* // <div className="is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"> */}
      <div className="card">
        <div className="card-image">
          <figure className="image is-2by3">
            <img src={item.image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="help">{item.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
