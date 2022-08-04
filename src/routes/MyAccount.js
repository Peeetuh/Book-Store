import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";

const MyAccount = ({ token, username }) => {
  const [myAccount, setMyAccount] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  useEffect(() => {
    const loadMyAccount = async () => {
      const fetchedAccount = await fetchUserAccount(token);
      setMyAccount(fetchedAccount);
    };
    loadMyAccount();
  }, [token]);
  const clickHandler = (e) => {
    e.preventDefault();
    setEditMode(true);
    console.log(editMode);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setEditMode(false);
    // setState("");
    // setCity("");
    // setStreet("");
    // setZip("");
  }
  const cancelHandler = () => {
    setEditMode(false);
    setState("");
    setCity("");
    setStreet("");
    setZip("");
  }

  return (
<>
      <h1>Welcome {username}!</h1>
      <h2> { `Street:${street} City:${city} State:${state} Zip:${zip}` }</h2>
      <button onClick={clickHandler}> Edit Profile</button>
      {editMode && (<>
      <h3> Set address details!</h3>
      <form onSubmit={submitHandler}>
        <label>
          State:
        </label>
        <input 
        type="text" 
        required 
        value={state}
        onChange={(e) => setState(e.target.value)}
        />
        <label>
          City:
        </label>
        <input 
        type="text" 
        required 
        value={city}
        onChange={(e) => setCity(e.target.value)} />
        <label>
          Street:
        </label>
        <input 
        type="text" 
        required 
        value={street}
        onChange={(e) => setStreet(e.target.value)}/>
        <label>
          Zip:
        </label>
        <input 
        type="number" 
        min= '10000'
        max= '99999'
        required 
        value={zip}
        onChange={(e) => setZip(e.target.value)} />
        <button onClick={cancelHandler}>Cancel </button>
        <button type="submit">Confirm address</button>
      </form></>
      )}
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