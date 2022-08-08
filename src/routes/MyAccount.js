import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";

const MyAccount = ({ token, username, setIsLoading }) => {

  const [myAccount, setMyAccount] = useState([]);

  useEffect(() => {
    const loadMyAccount = async () => {
      setIsLoading(true);
      try {
        const fetchedAccount = await fetchUserAccount(token);
        setMyAccount(fetchedAccount);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyAccount();
  }, [token, setIsLoading]);

  return (
    <>
    <section className="my-account-page">
      <h1>Welcome {username}!</h1>
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
      </section>
    </>
  );
};

export default MyAccount;
