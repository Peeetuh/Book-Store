import { deactivateBookRequest, paginatedBooksData } from "../../api/admin";

const DeactivateBookModal = ({
  setIsLoading,
  token,
  setDeactivateBookModal,
  currentBookId,
  currentPage,
  setBooksData,
}) => {
  const cancelClickHandler = (e) => {
    e.preventDefault();
    setDeactivateBookModal(false);
  };
  const removeClickHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await deactivateBookRequest(token, currentBookId);
      console.log("result of deactivating book:", result);
      const books = await paginatedBooksData(token, currentPage);
      setBooksData(books);
      setDeactivateBookModal(false);
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <>
      <div className="background" />
      <div className="modal">
        <header>
          <h3>Remove Book</h3>
        </header>
        <div>
          <p>
            Are you sure you want to remove this product from sales inventory?
            Note: product will <b>not</b> be removed from database.
          </p>
          <button onClick={cancelClickHandler}>Cancel</button>
          <button onClick={removeClickHandler}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default DeactivateBookModal;
