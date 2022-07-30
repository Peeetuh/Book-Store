import { Link } from "react-router-dom";

function DisplayHighestRanking({ topRated }) {
  return (
    <section>
      <header>
        <h3>Highest Rated Books</h3>
      </header>
      <div className="curated-container">
        {topRated.map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img src={book.imageLinkM} alt={book.title} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayHighestRanking;
