const UserInfo = ({ user }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="box px-6">
          <div className="is-flex my-2">
            <span className="icon is-size-4 mr-3">
              <i className="fas fa-person"></i>
            </span>
            <p className="is-size-5 has-text-weight-light">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          <div className="is-flex my-2">
            <span className="icon is-size-4 mr-3">
              <i className="fas fa-house"></i>
            </span>
            <p className="is-size-5 has-text-weight-light">{user.address}</p>
          </div>
          <div className="is-flex my-2">
            <span className="icon is-size-4 mr-3">
              <i className="fas fa-envelope"></i>
            </span>
            <p className="is-size-5 has-text-weight-light">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
