import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";
import { editUser } from "../api";
import { EditProfileModal } from "./components";
import "./MyAccount.css";

const MyAccount = ({ token, username, userId, setIsLoading }) => {
  const [myAccount, setMyAccount] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loadMyAccount = async () => {
      setIsLoading(true);
      try {
        const fetchedAccount = await fetchUserAccount(token);
        console.log(fetchedAccount);
        setMyAccount(fetchedAccount || []);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = () => {
    setEditMode(true);
  };

  return (
    <main id="my-account">
      <header>
        <h2>Your Account</h2>
      </header>
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
            myAccount.zip ?
          <button className="myaccount-btn" onClick={clickHandler}>Edit Address</button> : <button className="myaccount-btn" onClick={clickHandler}>Add Address</button>}
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
      {!myAccount.length ? (
        <h6>Your order history will appear here</h6>
      ) : (
        <>
          {myAccount.orders
            .filter((account) => {
              return account.isComplete === false;
            })
            .map((account) => {
              return (
                <div key={account.orderId}>
                  <h3>Items left in your cart:</h3>
                  {account.orderDetails.map((order) => {
                    return (
                      <div key={order.bookId}>
                        <h6>{order.title}</h6>
                        <h6>Quantity: {order.quantity}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <h3>Previously Purchased:</h3>
          {myAccount.orders
            .filter((account) => {
              return account.isComplete;
            })
            .map((account) => {
              return (
                <div key={account.orderId}>
                  <h4>Order Number: {account.orderId}</h4>
                  {account.orderDetails.map((order) => {
                    return (
                      <div key={order.bookId}>
                        <h6>{order.title}</h6>
                        <h6>Quantity: {order.quantity}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </>
      )}
    </main>
  );
};

export default MyAccount;
