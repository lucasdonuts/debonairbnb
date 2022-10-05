import { useState } from 'react';

const EditUserForm = ({ user, updateUser }) => {
  const [ errors, setErrors ] = useState([]);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    email: user.email
  });

  const errorElements = errors.map((error) => {
    return (
      <p key={error} className="help is-danger">
        { error }
      </p>
    );
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then( res => {
        if (res.ok) {
          res.json().then((updatedUser) => {
            updateUser(updatedUser);
          });
        } else {
          res.json().then((data) => {
            setErrors(data.errors)
          });
        }
      } )
  };

  return (
    <div className="columns is-centered">
      <div className="column is-8">
        <div className="box">
          <p className="subtitle has-text-centered">Change your Account Details</p>
          <form onSubmit={handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-label is-hidden">
                <label className="label" htmlFor="first_name"></label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      onChange={handleChange}
                      className="input"
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-signature"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      onChange={handleChange}
                      className="input"
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-hidden">
                <label className="label" htmlFor="address"></label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      onChange={handleChange}
                      className="input"
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-hidden"></div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control is-expanded has-icons-left">
                      <input
                        onChange={handleChange}
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="field is-horizontal">
              <div className="field-label is-hidden"></div>
              <div className="field-body">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button type="submit" className="button is-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            { errorElements }
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;