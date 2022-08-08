import { useState, useEffect } from "react";
import { fetchUserAccount } from "../api";
import { editUser } from "../api";

const MyAccount = ({ token, username, userId, setIsLoading,}) => {

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
        setMyAccount(fetchedAccount);
      } finally {
        setIsLoading(false);
      }
    };
    loadMyAccount();
  }, [token, setIsLoading]);
  const clickHandler = (e) => {
    e.preventDefault();
    setEditMode(true);
    console.log(editMode);
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    setEditMode(false);
    // setState("");
    // setCity("");
    // setStreet("");
    // setZip("");
    // console.log(state, city, street, zip);
   const result = await editUser ( 
      token,
      userId,
      state,
      city,
      street,
      zip
    )
    setState(null);
    setCity(null);
    setStreet(null);
    setZip(null);
    console.log(result)
  }
  const cancelHandler = () => {
    setEditMode(false);
    // setState(null);
    // setCity(null);
    // setStreet(null);
    // setZip(null);
  }

  return (
<>
<section className="my-account-page">
      <h1>Welcome {username}!</h1>
      <h2> State: { myAccount.state }<br></br> City: {myAccount.city}<br></br> Street: {myAccount.street}<br></br> Zip: {myAccount.zip}<br></br> </h2>
      <button onClick={clickHandler}> Edit Profile</button>
      {editMode && (<>
      <h3> Set address details!</h3>
      <form onSubmit={submitHandler}>
        <label>
          State:
        </label>
        <input 
        type="text" 
        onChange={(e) => setState(e.target.value)}
        />
        <label>
          City:
        </label>
        <input 
        type="text" 
        onChange={(e) => setCity(e.target.value)} />
        <label>
          Street:
        </label>
        <input 
        type="text" 
        onChange={(e) => setStreet(e.target.value)}/>
        <label>
          Zip:
        </label>
        <input 
        type="number" 
        min= '10000'
        max= '99999'
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
      </section>
    </>
  );
};

export default MyAccount;