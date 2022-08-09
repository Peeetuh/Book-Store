import { useState } from "react";
import { editUsersAddress, fetchUserAccount } from "../../../api";

const EditProfileModal = ({ token, userId, setEditMode, setMyAccount }) => {
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zip, setZip] = useState(null);
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
    const result = await editUsersAddress(
      token,
      userId,
      state,
      city,
      street,
      zip
    );
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
    <>
      <div className="background" />
      <div className="modal">
        <header>
          <h3>Edit Shipping Address</h3>
        </header>
        <form className="modal-form" onSubmit={submitHandler}>
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
          <div className="modal-form-buttons">
            <button onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileModal;
