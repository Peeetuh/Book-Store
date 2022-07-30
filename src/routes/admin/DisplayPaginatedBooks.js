import { paginatedBooksData } from "../../api/admin";
import "../Admin.css";

const DisplayPaginatedBooks = ({
  token,
  booksData,
  setBooksData,
  pages,
  currentPage,
  setCurrentPage,
  setNewBookModal,
  setDeactivateBookModal,
  setEditBookModal,
  setCurrentBookId,
}) => {
  const prevClickHandler = async (e) => {
    setCurrentPage(currentPage - 1);
    const books = await paginatedBooksData(token, currentPage - 1);
    setBooksData(books);
  };
  const nextClickHandler = async (e) => {
    setCurrentPage(currentPage + 1);
    const books = await paginatedBooksData(token, currentPage + 1);
    setBooksData(books);
  };
  const newBookClickHandler = (e) => {
    e.preventDefault();
    setNewBookModal(true);
  };
  return (
    <section>
      <header className="inline">
        <h3>Showing All Books</h3>
        <button onClick={newBookClickHandler}>+ New Book</button>
      </header>
      <table>
        <tbody>
          <tr>
            <th>Book ID#</th>
            <th>ISBN</th>
            <th className="wrap">Book Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Genre</th>
            <th>Rating</th>
            <th># Ratings</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
          {booksData.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.isbn}</td>
                <td className="wrap">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.publisher}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
                <td>{book.globalRatings}</td>
                <td>{book.price}</td>
                <td>{book.inventory}</td>
                <td>
                  {!book.isActive
                    ? "Deactivated"
                    : book.inventory < 15
                    ? "Low Stock"
                    : "In Stock"}
                </td>
                <td>
                  {book.isActive ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditBookModal(true);
                        setCurrentBookId(book.id);
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {book.isActive ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDeactivateBookModal(true);
                        setCurrentBookId(book.id);
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {currentPage !== 1 ? (
          <button onClick={prevClickHandler}>Prev</button>
        ) : (
          <button disabled>Prev</button>
        )}
        <span>
          {" "}
          | {currentPage} of {pages} |{" "}
        </span>
        {currentPage !== pages ? (
          <button onClick={nextClickHandler}>Next</button>
        ) : (
          <button disabled>Next</button>
        )}
      </div>
    </section>
  );
};

export default DisplayPaginatedBooks;
