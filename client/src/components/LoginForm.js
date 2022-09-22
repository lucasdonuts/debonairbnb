import { useState } from "react";
import { NavButton } from '../tools/hooks';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert this to redux when you don't hate it
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then( navigate('/'));
  };

  console.log(formData);

  return (
    <form onSubmit={ handleSubmit }>
      <div className="field">
        <p className="control has-icons-left">
          <input
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
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-success">Login</button>
        </div>
        <div className="control">
          <NavButton />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
