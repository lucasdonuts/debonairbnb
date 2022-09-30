import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../tools/hooks";
import { SignupForm, LoginForm } from "./auth";

export const Root = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, []);

  if (currentUser) {
    return <></>;
  } else {
    return (
      <div className="unauth-landing-container columns is-centered">
        <div className="column">
          <h1 className="is-brand-font is-accent-color is-xl-text has-text-centered">DebonairBnB</h1>
          <div className="columns is-centered is-align-items-centered">
            <div className="column is-6">
              <SignupForm />
            </div>
            <div className="column is-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const NotFound = () => {
  return (
    <>
      <h1 className="title has-text-white">Not Found</h1>
      <NavButton path="/home" text="Home" />
    </>
  );
};
