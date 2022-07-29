import { paginatedBooksData } from "../../api/admin";

const DisplayPaginatedBooks = ({
  token,
  booksData,
  setBooksData,
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
    console.log(books, currentPage);
    setBooksData(books);
  };
  const newBookClickHandler = (e) => {
    e.preventDefault();
    setNewBookModal(true);
  };
  return (
    <section>
      <div>
        <div>
          <button onClick={newBookClickHandler}>+ New Book</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Book ID#</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Inventory Count</th>
              <th>Status</th>
            </tr>
            {booksData.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
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
            <button onClick={prevClickHandler} disabled>
              Prev
            </button>
          )}
          <span> | {currentPage} of ? |</span>
          <button onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default DisplayPaginatedBooks;
