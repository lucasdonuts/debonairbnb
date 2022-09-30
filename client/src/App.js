import "./stylesheets/mystyles.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./reducers/userSlice";
import { useEffect } from "react";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import { Root, NotFound } from "./components/landings";
import { SignupForm, LoginForm } from "./components/auth";
import { AuthRoute } from "./tools/hooks";
import Home from "./components/Home";
import Shop from "./components/Shop";
import UserPage from "./components/user/UserPage";
import ItemPage from "./components/item/ItemPage";

function App() {
  const { currentUser, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {currentUser && <NavBar />}
      <div className="main section columns is-centered">
        <div className="column is-11 is-9-fullhd has-text-centered">
          <Routes>
            <Route index element={<Root currentUser={currentUser} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <AuthRoute>
                  <Shop />
                </AuthRoute>
              }
            />
            <Route
              path="/account"
              element={
                <AuthRoute>
                  <UserPage />
                </AuthRoute>
              }
            />
            <Route
              path="/items"
              element={
                <AuthRoute>
                  <Shop />
                </AuthRoute>
              }
            />
            <Route
              path="/items/:id"
              element={
                <AuthRoute>
                  <ItemPage />
                </AuthRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
