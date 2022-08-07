import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";
import { editUsersAddress } from "../api";

const MyAccount = ({ token, username, userId, setIsLoading }) => {
  const [myAccount, setMyAccount] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zip, setZip] = useState(null);

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

  const cancelHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    setState(null);
    setCity(null);
    setStreet(null);
    setZip(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await editUsersAddress(token, userId, state, city, street, zip);
    console.log("result of edit profile request", result);
    const fetchedAccount = await fetchUserAccount(token);
    setMyAccount(fetchedAccount || []);
    setState(null);
    setCity(null);
    setStreet(null);
    setZip(null);
    setEditMode(false);
  };

  return (
    <main>
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
              "You haven't entered your full address yet."
            )}
          </div>
          <button onClick={clickHandler}>Edit Address</button>
        </div>
      </section>
      {editMode===true && (
        <>
          <h3>Add Shipping Address</h3>
          <form onSubmit={submitHandler}>
            <label htmlFor="edit-street">Street:</label>
            <input
              id="edit-street"
              type="text"
              onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="edit-city">City:</label>
            <input
              id="edit-city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="edit-state">State:</label>
            <input
              id="edit-state"
              type="text"
              onChange={(e) => setState(e.target.value)}
            />
            <label htmlFor="edit-zip">Zip:</label>
            <input
              id="edit-zip"
              type="number"
              min="10000"
              max="99999"
              onChange={(e) => setZip(e.target.value)}
            />
            <button onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        </>
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
