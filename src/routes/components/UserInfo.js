import { useState } from "react";
import EditProfileModal from "./modals/EditProfileModal";
import "./UserInfo.css";

const UserInfo = ({ token, userId, myAccount, username, setMyAccount }) => {
  const [editMode, setEditMode] = useState(false);

  const clickHandler = () => {
    setEditMode(true);
  };

  return (
    <section id="account-info-container">
      {editMode && (
        <EditProfileModal
          token={token}
          userId={userId}
          setEditMode={setEditMode}
          setMyAccount={setMyAccount}
        />
      )}
      <div>
        <h4>Account Info</h4>
        <div className="account-details-container">
          <p><b>E-mail:</b></p>
          <p>{username}</p>
          <p><b>Shipping Address:</b></p>
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
            "You have not entered a shipping address yet."
          )}
        </div>
        {myAccount.street ||
        myAccount.city ||
        myAccount.state ||
        myAccount.zip ? (
          <button className="user-info-btn" onClick={clickHandler}>
            Edit Address
          </button>
        ) : (
          <button className="user-info-btn" onClick={clickHandler}>
            Add Address
          </button>
        )}
      </div>
    </section>
  );
};

export default UserInfo;
