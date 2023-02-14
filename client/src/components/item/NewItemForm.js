import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../reducers/itemsSlice";

const NewItemForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.items);
  const [categoryNotSelected, setCategoryNotSelected] = useState(true);
  const [errors, setErrors] = useState([]);
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    category: "",
    size: "",
    price: 0,
    image: "",
    owner_id: currentUser.id,
  });

  // const errorElements = errors.map((error) => {
  //   return (
  //     <p key={error} className="help is-danger">
  //       {error}
  //     </p>
  //   );
  // });

  const dispatch = useDispatch();

  const validateInput = (e) => {
    if (e.target.tagName === "SELECT") {
      if (e.target.value === "") {
        setInvalidInputs([...invalidInputs, e.target.name]);
      } else {
        setInvalidInputs(
          invalidInputs.filter((input) => input !== e.target.name)
        );
      }
    }
    /* 
    
    switch(e.target.name){
      case 'category':
      case 'size':
        if(e.target.value === ""){
          setInvalidInputs([
            ...invalidInputs,
            e.target.name
          ])
        } else {
          setInvalidInputs(invalidInputs.filter(input => input !== e.target.name))
        };
        break;
    }
    
    */
  };

  const handleChange = (e) => {
    validateInput(e);

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
        res.json().then(console.log);
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setCategoryNotSelected(formData.category === "");
  }, [formData.category]);

  console.log(formData);
  console.log(errors);
  return (
    <div className="columns is-centered">
      <div className="column is-6 is-4-desktop is-narrow-desktop">
        <form onSubmit={handleSubmit}>
          <div className="box is-secondary-background">
            <h1 className="is-brand-font is-size-2 has-text-centered mb-5">
              Add to Wardrobe
            </h1>
            {/* Name */}
            <div className="field">
              <label className="label is-small">Item Name</label>
              <div className="control">
                <input
                  required
                  onChange={handleChange}
                  className="input is-small"
                  type="text"
                  name="name"
                  value={formData.name}
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
                    required
                    selected={formData.sex === "Men's"}
                    onChange={handleChange}
                    type="radio"
                    name="sex"
                    value="Men's"
                  />
                  Men's
                </label>
                <label className="radio">
                  <input
                    required
                    selected={formData.sex === "Women's"}
                    onChange={handleChange}
                    type="radio"
                    name="sex"
                    value="Women's"
                  />
                  Women's
                </label>
                <label className="radio">
                  <input
                    required
                    defaultChecked
                    selected={formData.sex === ""}
                    onChange={handleChange}
                    type="radio"
                    name="sex"
                    value=""
                  />
                  N/A
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
                      onChange={handleChange}
                      name="category"
                      value={formData.category}
                    >
                      <option value="">--Select Category--</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Pants">Pants</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
                <p
                  style={
                    invalidInputs.includes("category")
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                  className="help is-danger"
                >
                  Must select a category
                </p>
              </div>

              {/* Size */}
              {/* dropdown */}
              <div className="field">
                <label className="label is-small">Size</label>
                <div className="control">
                  <div className="select is-small">
                    <select
                      disabled={categoryNotSelected}
                      onChange={handleChange}
                      name="size"
                      value={formData.size}
                    >
                      <option value="">
                        {categoryNotSelected
                          ? "Select a category first"
                          : "--Select Size--"}
                      </option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                    </select>
                  </div>
                </div>
                <p
                  style={
                    invalidInputs.includes("size") && !categoryNotSelected
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                  className="help is-danger"
                >
                  Must select a size
                </p>
              </div>

              {/* Price */}
              {/* number field */}
              <div className="field">
                <label className="label is-small">Price</label>
                <div className="control">
                  <input
                    onChange={handleChange}
                    name="price"
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
                  required
                  onChange={handleChange}
                  name="image"
                  className="input is-small"
                  type="text"
                  placeholder="Image URL"
                  value={formData.image}
                />
              </div>
            </div>

            {/* Submit/Cancel */}
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItemForm;
