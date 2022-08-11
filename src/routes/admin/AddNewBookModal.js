import { useState } from "react";
import { addBookRequest, paginatedBooksData } from "../../api/admin";

const AddNewBookModal = ({
  token,
  setNewBookModal,
  currentPage,
  setBooksData,
  setCurrentPage
}) => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const cancelClickHandler = (e) => {
    e.preventDefault();
    setNewBookModal(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await addBookRequest(
      token,
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
    console.log("result of adding book:", result);
    const books = await paginatedBooksData(token, 1);
    setBooksData(books);
    setCurrentPage(1);
    setIsbn("");
    setTitle("");
    setAuthor("");
    setYear("");
    setPublisher("");
    setImageLink("");
    setGenre("");
    setDescription("");
    setPrice("");
    setInventory("");
    setNewBookModal(false);
  };
  return (
    <>
      <div className="background" />
      <div className="modal add-new-book-modal">
        <header>
          <h3>Add a New Book</h3>
        </header>
        <form className="modal-form" onSubmit={submitHandler}>
          <label>ISBN</label>
          <input
            type="text"
            required
            onChange={(e) => setIsbn(e.target.value)}
          />
          <label>Title</label>
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author</label>
          <input
            type="text"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Year</label>
          <input
            type="number"
            required
            onChange={(e) => setYear(e.target.value)}
          />
          <label>Publisher</label>
          <input
            type="text"
            required
            onChange={(e) => setPublisher(e.target.value)}
          />
          <label>Front Cover Image (URL)</label>
          <input
            type="text"
            required
            onChange={(e) => setImageLink(e.target.value)}
          />
          <label>Genre</label>
          <input
            type="text"
            required
            onChange={(e) => setGenre(e.target.value)}
          />
          <label>Description</label>
          <textarea
            rows="5"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price</label>
          <input
            type="text"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Inventory Count</label>
          <input
            type="number"
            min="1"
            max="100"
            required
            onChange={(e) => setInventory(e.target.value)}
          />
          <div className="modal-form-buttons">
            <button onClick={cancelClickHandler} className="modal-cancel">Cancel</button>
            <button type="submit" className="modal-confirm">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewBookModal;
