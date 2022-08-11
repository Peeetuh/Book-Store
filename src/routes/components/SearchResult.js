import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchRequest, searchRequestCount } from "../../api";
import "./DisplayGenreBooks.css";

function SearchResult({ searchQuery }) {
  const [searchResult, setSearchResult] = useState([]);
  const [resCount, setResCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState("");

  const prevClickHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    const result = await searchRequest(searchQuery, currentPage - 1);
    setSearchResult(result);
  };

  const nextClickHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    const result = await searchRequest(searchQuery, currentPage + 1);
    setSearchResult(result);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      const count = await searchRequestCount(searchQuery);
      console.log("count", count);
      setResCount(count);
      setPages(Math.ceil(count / 20) || 1);
      const result = await searchRequest(searchQuery, 1);
      console.log(result);
      setSearchResult(result);
    };
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <main id="display-paginated-container">
      {searchResult.length ? (
        <section id="display-paginated-items">
          <header>
            <p className="search-result">
              <b>
                {resCount} results found for "{searchQuery}"
              </b>
            </p>
          </header>
          {searchResult.map((book) => {
            return (
              <React.Fragment key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <div className="display-paginated-search-results">
                    <img src={book.imageLinkM} alt={book.title} />
                    <p className="book-title">
                      <i>{book.title}</i>
                    </p>
                    <p className="book-author">{book.author}</p>
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
        <section className="no-search-results">
          <header>
            <p>
              <b>
                {resCount} results found for "{searchQuery}"
              </b>
            </p>
          </header>
          <p className="search-again">Search again?</p>
        </section>
      )}
    </main>
  );
}

export default SearchResult;
