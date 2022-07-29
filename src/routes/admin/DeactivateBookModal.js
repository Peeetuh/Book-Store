import { deactivateBookRequest } from "../../api/admin";

const DeactivateBookModal = ({token, setDeactivateBookModal, currentBookId }) => {
  const cancelClickHandler = e => {
    e.preventDefault();
    setDeactivateBookModal(false);
  }
  const removeClickHandler = async (e) => {
    e.preventDefault();
    const result = await deactivateBookRequest(token, currentBookId);
    console.log("result of deactivating book:", result);
    setDeactivateBookModal(false);
  }
  return (
    <>
    <div className="background"/>
    <div>
      <header>
        <h3>Remove Book</h3>
      </header>
      <div>
      <p>Are you sure you want to remove this product from sales inventory? Note: product will <b>not</b> be removed from database.</p>
      <button onClick={cancelClickHandler}>Cancel</button>
      <button onClick={removeClickHandler}>Remove</button>
      </div>
    </div>
    </>
  )
}

export default DeactivateBookModal;