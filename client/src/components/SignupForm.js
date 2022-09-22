import { useState } from "react";
import { NavButton } from "../tools/hooks";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert this to redux when you don't hate it
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  console.log(formData);

  return (
    <div className="columns is-centered">
      <div className="column is-8">
        <div className="box">
          <p className="title has-text-centered">DebonairBnB</p>
          <p className="subtitle has-text-centered">Sign up is free!</p>
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
                  <p className="control is-expanded" /* has-icons-left" */>
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
                  {/* <p className="help is-danger">This field is required</p> */}
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
                  <p className="help">
                    This will be how you will log in to your account
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-hidden">
                <label className="label" htmlFor="password"></label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      onChange={handleChange}
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded" /* has-icons-left" */>
                    <input
                      onChange={handleChange}
                      className="input"
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      value={formData.password_confirmation}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-hidden"></div>
              <div className="field-body">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button type="submit" className="button is-primary">
                      Sign Up
                    </button>
                  </div>
                  <div className="control">
                    <NavButton />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
