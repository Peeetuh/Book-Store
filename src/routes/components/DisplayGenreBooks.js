import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooksByGenrePaginated, fetchCountByGenre } from "../../api";
import "./DisplayGenreBooks.css";

const DisplayGenreBooks = ({ genreSelect, setIsLoading }) => {
  const [booksData, setBooksData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGenreBooks = async () => {
      setIsLoading(true);
      try {
        const count = await fetchCountByGenre(genreSelect);
        const genre = await fetchBooksByGenrePaginated(
          genreSelect,
          currentPage
        );
        setBooksData(genre || []);
        setPages(Math.ceil(count / 20));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenreBooks();
  }, [setIsLoading, currentPage, genreSelect]);

  const prevClickHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    const genre = await fetchBooksByGenrePaginated(
      genreSelect,
      currentPage - 1
    );
    setBooksData(genre);
  };

  const nextClickHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    const genre = await fetchBooksByGenrePaginated(
      genreSelect,
      currentPage + 1
    );
    setBooksData(genre);
  };
  return (
    <main id="display-paginated-container">
      {booksData.length ? (
          <section id="display-paginated-items">
          <header>
            <h2>{genreSelect}</h2>
          </header>
            {booksData.map((book) => {
              return (
                <React.Fragment key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <div className="display-paginated-search-results">
                      <img src={book.imageLinkM} alt={book.title} />
                      <span className="book-title"><i>{book.title}</i></span>
                      <span className="book-author">{book.author}</span>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}
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
      ) : (
        <header>
          <p>Sorry, we don't have any results to show for that genre.</p>
        </header>
      )}
    </main>
  );
};

export default DisplayGenreBooks;
