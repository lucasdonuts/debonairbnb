import { useSelector } from 'react-redux';

const UserInfo = ({ user, setEditMode }) => {
  return(
    <>
      <div className="is-flex">
        <p className="is-size-4">{`${user.first_name} ${user.last_name}`}</p>
      </div>
      <div className="is-flex">
        <p>{user.address}</p>
      </div>
      <div className="is-flex">
        <p>{user.email}</p>
      </div>
    </>
  )
}

export default UserInfo;