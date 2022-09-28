import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser, clearCurrentUser } from "../../reducers/userSlice";
import { useNavigate } from 'react-router-dom';

import EditUserForm from "./EditUserForm";
import UserInfo from "./UserInfo";
import Loading from '../Loading';

const UserPage = () => {
  const { currentUser: user, isLoading } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUser = (updatedUser) => {
    dispatch(updateCurrentUser(updatedUser));
    setEditMode(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  const deleteAccount = () => {
    fetch(`/users/${user.id}`, { method: 'DELETE' })
      .then( () => {
        dispatch(clearCurrentUser());
        navigate('/') 
      })
  }

  document.addEventListener( 'click', (e) => setModalVisible(false))

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

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
      <button onClick={ handleDeleteClick } className="button is-danger">
        Delete Account
      </button>
      <div
        id="confirm-delete"
        className={ modalVisible ? "modal is-active" : "modal" }
      >
        <div className="modal-background"></div>

        <div className="modal-content" onClick={ stopPropagation } >
          <div className="box">
            <p>Are you sure?</p>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button onClick={ deleteAccount } className="button is-danger">Delete Account</button>
              </p>
              <p className="control">
                <button onClick={ () => setModalVisible(false) } className="button">Cancel</button>
              </p>
            </div>
          </div>
        </div>

        <button onClick={ () => setModalVisible(false) } className="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  );
};

export default UserPage;

{/* <button onClick={handleDeleteClick} className="button is-danger is-light">
              Delete Account
            </button>
            <button onClick={ () => setModalVisible(false) } className="button is-primary is-light">
              Cancel
            </button> */}