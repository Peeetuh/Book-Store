import { useState } from "react";
import EditProfileModal from "./modals/EditProfileModal";


const UserInfo = ({ token, userId, myAccount, username, setMyAccount }) => {
  const [editMode, setEditMode] = useState(false);

  const clickHandler = () => {
    setEditMode(true);
  };

  return (
    <>
      <section>
        <div>
          <h3>Account Info</h3>
          <p>E-mail: {username}</p>
          <div>
            <p>Shipping Address:</p>
            {myAccount.street &&
            myAccount.city &&
            myAccount.state &&
            myAccount.zip ? (
              <p>
                {myAccount.street}
                <br />
                {myAccount.city}, {myAccount.state} {myAccount.zip}
              </p>
            ) : (
              "Please provide your full shipping address."
            )}
          </div>
          {myAccount.street ||
          myAccount.city ||
          myAccount.state ||
          myAccount.zip ? (
            <button onClick={clickHandler}>Edit Address</button>
          ) : (
            <button onClick={clickHandler}>Add Address</button>
          )}
        </div>
      </section>
      {editMode && (
        <EditProfileModal
          token={token}
          userId={userId}
          setEditMode={setEditMode}
          setMyAccount={setMyAccount}
        />
      )}
    </>
  );
};

export default UserInfo;
