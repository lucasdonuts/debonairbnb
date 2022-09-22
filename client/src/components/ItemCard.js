const ItemCard = ({ item }) => {
  // const { name, image, sex, category, size, price } = item;
  console.log(item)

  return (
    <div className="column is-one-fifth">
      <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src={ item.image }
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        {/* <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div> */}

        <div class="content">
          <p className="help">{ item.category }</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ItemCard;