import { useState } from "react";
import { editBookRequest } from "../../api/admin";
const EditBookModal = ({token, currentBookId, setEditBookModal }) => {
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
    setEditBookModal(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
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
    console.log("result of adding book:", result);
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
    setEditBookModal(false);
  };
  return (
    <>
      <div className="background" />
      <div>
        <header>
          <h3>Add a New Book</h3>
        </header>
        <form onSubmit={submitHandler}>
          <label>ISBN</label>
          <input
            type="text"
            onChange={(e) => setIsbn(e.target.value)}
          />
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author</label>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Year</label>
          <input
            type="number"
            onChange={(e) => setYear(e.target.value)}
          />
          <label>Publisher</label>
          <input
            type="text"
            onChange={(e) => setPublisher(e.target.value)}
          />
          <label>Front Cover Image (URL)</label>
          <input
            type="text"
            onChange={(e) => setImageLink(e.target.value)}
          />
          <label>Genre</label>
          <input
            type="text"
            onChange={(e) => setGenre(e.target.value)}
          />
          <label>Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} />
          <label>Price</label>
          <input
            type="text"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Inventory Count</label>
          <input
            type="number"
            required
            min="10"
            max="100"
            onChange={(e) => setInventory(e.target.value)}
          />
          <button onClick={cancelClickHandler}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditBookModal;