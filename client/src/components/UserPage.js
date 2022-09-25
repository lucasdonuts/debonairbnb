import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducers/userSlice";

import EditUserForm from "./EditUserForm";
import UserInfo from "./UserInfo";

const UserPage = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);

  const dispatch = useDispatch();

  const updateUser = (updatedUser) => {
    dispatch(setCurrentUser(updatedUser));
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    setModalVisible(true);

  };

  return (
    <div className="content has-text-centered">
      {editMode ? (
        <EditUserForm
          user={user}
          updateUser={updateUser}
          setEditMode={setEditMode}
        />
      ) : (
        <UserInfo user={user} />
      )}

      <button
        onClick={() => setEditMode(!editMode)}
        className="button is-primary"
      >
        {editMode ? "Cancel" : "Edit Account Details"}
      </button>
      <button onClick={handleDeleteClick} className="button is-danger">
        Delete Account
      </button>
      <div id="confirm-delete" className={ modalVisible ? "modal is-active" : "modal" }>
        <div className="modal-background"></div>

        <div className="modal-content">
          <div className="box">
            <p>Modal JS example</p>
            Are you sure?
            <button onClick={handleDeleteClick} className="button is-danger">
              Delete Account
            </button>
            <button onClick={ () => setModalVisible(false) } className="button is-danger-light">
              Cancel
            </button>
          </div>
        </div>

        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  );
};

export default UserPage;
