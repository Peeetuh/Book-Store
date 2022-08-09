import { useState } from "react";
import { editBookRequest, paginatedBooksData } from "../../api/admin";
const EditBookModal = ({
  token,
  currentBookId,
  setEditBookModal,
  currentPage,
  setBooksData,
  setIsLoading,
}) => {
  const [isbn, setIsbn] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [year, setYear] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [genre, setGenre] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [inventory, setInventory] = useState(null);
  const cancelClickHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setEditBookModal(false);
    } finally {
      setIsLoading(false);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await editBookRequest(
        token,
        currentBookId,
        isbn,
        title,
        author,
        year,
        publisher,
        imageLink,
        genre,
        description,
        price,
        inventory
      );
      console.log("result of editing book:", result);
      const books = await paginatedBooksData(token, currentPage);
      setBooksData(books);
      setIsbn(null);
      setTitle(null);
      setAuthor(null);
      setYear(null);
      setPublisher(null);
      setImageLink(null);
      setGenre(null);
      setDescription(null);
      setPrice(null);
      setInventory(null);
      setEditBookModal(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="background" />
      <div className="modal add-new-book-modal">
        <header>
          <h3>Edit Book</h3>
        </header>
        <form className="modal-form" onSubmit={submitHandler}>
          <label>ISBN</label>
          <input type="text" onChange={(e) => setIsbn(e.target.value)} />
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
          <label>Author</label>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} />
          <label>Year</label>
          <input type="number" onChange={(e) => setYear(e.target.value)} />
          <label>Publisher</label>
          <input type="text" onChange={(e) => setPublisher(e.target.value)} />
          <label>Front Cover Image (URL)</label>
          <input type="text" onChange={(e) => setImageLink(e.target.value)} />
          <label>Genre</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
          <label>Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} />
          <label>Price</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
          <label>Inventory Count</label>
          <input
            type="number"
            min="10"
            max="100"
            onChange={(e) => setInventory(e.target.value)}
          />
          <div className="modal-form-buttons">
          <button onClick={cancelClickHandler}>Cancel</button>
          <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBookModal;
