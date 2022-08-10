import { useState } from "react";
import { editUser } from "../../api";

const UserInfo = ({ token, userId, myAccount }) => {
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zip, setZip] = useState(null);

  const clickHandler = (e) => {
    e.preventDefault();
    setEditMode(true);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setEditMode(false);
    setState("");
    setCity("");
    setStreet("");
    setZip("");
    await editUser(token, userId, state, city, street, zip);
    setState(null);
    setCity(null);
    setStreet(null);
    setZip(null);
  };

  const cancelHandler = () => {
    setEditMode(false);
    setState(null);
    setCity(null);
    setStreet(null);
    setZip(null);
  };

  return (
    <>
      <h2>
        State: {myAccount.state}
        <br></br> City: {myAccount.city}
        <br></br> Street: {myAccount.street}
        <br></br> Zip: {myAccount.zip}
        <br></br>
      </h2>
      <button onClick={clickHandler}> Edit Profile</button>
      {editMode && (
        <>
          <h3> Set address details!</h3>
          <form onSubmit={submitHandler}>
            <label>State:</label>
            <input type="text" onChange={(e) => setState(e.target.value)} />
            <label>City:</label>
            <input type="text" onChange={(e) => setCity(e.target.value)} />
            <label>Street:</label>
            <input type="text" onChange={(e) => setStreet(e.target.value)} />
            <label>Zip:</label>
            <input
              type="number"
              min="10000"
              max="99999"
              onChange={(e) => setZip(e.target.value)}
            />
            <button onClick={cancelHandler}>Cancel </button>
            <button type="submit">Confirm address</button>
          </form>
        </>
      )}
    </>
  );
};

export default UserInfo;
