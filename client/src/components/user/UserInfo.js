const UserInfo = ({ user }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="box px-6">
          <div className="is-flex">
            <p className="is-size-5 has-text-weight-medium mr-2">Name:</p>
            <p className="is-size-5 has-text-weight-light">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          <div className="is-flex">
            <p className="is-size-5 has-text-weight-medium mr-2">Address:</p>
            <p className="is-size-5 has-text-weight-light">{user.address}</p>
          </div>
          <div className="is-flex">
            <p className="is-size-5 has-text-weight-medium mr-2">Email:</p>
            <p className="is-size-5 has-text-weight-light">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
