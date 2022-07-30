import { useState, useEffect } from "react";
import Logout from "./components/Logout";
import { fetchUserAccount } from "../api";

const MyAccount = ({ token, setToken, setUsername, username, setUserId }) => {
  const [myAccount, setMyAccount] = useState([]);

  useEffect(() => {
    const loadMyAccount = async () => {
      const fetchedAccount = await fetchUserAccount(token);
      setMyAccount(fetchedAccount);
    };
    loadMyAccount();
  }, [token]);

  return (
    <>
      <h1>Welcome {username}!</h1>
      <Logout token={token} setToken={setToken} setUsername={setUsername} setUserId={setUserId} />
      {myAccount.length < 1 ? (
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
    </>
  );
};

export default MyAccount;
