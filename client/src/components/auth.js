import { useState, useEffect } from "react";
import { NavButton } from "../tools/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  clearCurrentUser,
  setErrors,
} from "../reducers/userSlice";

export const LoginForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  const errorElements = errors.map((error) => {
    return (
      <p key={error} className="help is-danger">
        {error}
      </p>
    );
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          dispatch(setCurrentUser(user));
          navigate("/home");
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-8">
        <div className="box">
          <p className="title has-text-centered is-brand-font">DebonairBnB</p>
          <p className="subtitle has-text-centered">Log In</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  required
                  onChange={handleChange}
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  required
                  onChange={handleChange}
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            {errorElements}

            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-success">Login</button>
              </div>
              <div className="control">
                <NavButton />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="column is-narrow">
        <p className="is-size-5">Don't have an account?</p>
        <NavButton path="/signup" text="Sign Up" />
      </div>
    </div>
  );
};

export const SignupForm = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorElements = errors.map((error) => {
    return (
      <p key={error} className="help is-danger">
        {error}
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
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          dispatch(setCurrentUser(user));
          navigate("/home");
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-8">
        <div className="box">
          <p className="title has-text-centered is-brand-font">DebonairBnB</p>
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
                    This is how you will log in to your account
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
            {errorElements}
          </form>
        </div>
      </div>
      
      <div className="column is-narrow">
        <p className="is-size-5">Already have an account?</p>
        <NavButton path="/login" text="Log In" />
      </div>
    </div>
  );
};

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then(() => {
      dispatch(clearCurrentUser());
      navigate("/");
    });
  };

  return (
    <button onClick={handleLogout} className="button is-primary">
      Log Out
    </button>
  );
};
