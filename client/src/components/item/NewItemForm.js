import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../reducers/itemsSlice";

const NewItemForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.items);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    category: "",
    size: "",
    price: null,
    image: "",
    owner_id: currentUser.id,
  });

  const errorElements = errors.map((error) => {
    return (
      <p key={error} className="help is-danger">
        {error}
      </p>
    );
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then(console.log("Submitted successfully"));
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="columns is-centered">
      <div className="column is-6 is-4-desktop is-narrow-desktop">
        <div className="box is-secondary-background">
          <h1 className="is-brand-font is-size-2 has-text-centered mb-5">
            Add to Wardrobe
          </h1>
          {/* Name */}
          <div className="field">
            <label className="label is-small">Item Name</label>
            <div className="control">
              <input
                onChange={handleChange}
                className="input is-small"
                type="text"
                placeholder="Item Name"
              />
            </div>
          </div>

          {/* Sex */}
          {/* radio buttons */}
          <div className="field">
            <div className="control">
              <label className="radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="sex"
                  value="Men's"
                />
                Men's
              </label>
              <label className="radio">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="sex"
                  value="Women's"
                />
                Women's
              </label>
            </div>
          </div>

          {/* Category, Size, Price */}
          <div className="field is-grouped is-justify-content-space-around">
            {/* Category */}
            {/* dropdown */}
            <div className="field">
              <label className="label is-small">Category</label>
              <div className="control">
                <div className="select is-small">
                  <select
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                  >
                    <option value="">--Select Category--</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Size */}
            {/* dropdown */}
            <div className="field">
              <label className="label is-small">Size</label>
              <div className="control">
                <div className="select is-small">
                  <select
                    name="size"
                    onChange={handleChange}
                    value={formData.size}
                  >
                    <option value="">--Select Size--</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price */}
            {/* number field */}
            <div className="field">
              <label className="label is-small">Price</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  className="input is-small"
                  type="number"
                  value={formData.price}
                />
              </div>
            </div>
          </div>

          {/* Image */}
          {/* text input */}
          <div className="field">
            <label className="label is-small is-small">Image URL</label>
            <div className="control">
              <input
                className="input is-small"
                type="text"
                placeholder="Image URL"
                value={formData.image}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />I agree to the{" "}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;
