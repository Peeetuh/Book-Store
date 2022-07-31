import { Link } from "react-router-dom";
import { CartForm } from "./";

function DisplayHighestRanking({ topRated, userId }) {
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

                <Link to={`/authors/${book.author}`}>
                <p> By {book.author}</p>
                </Link>
                <CartForm
                userId={userId}
                price={book.price}
                id={book.id}
                inventory={book.inventory}
                bookImage={book.imageLinkM}
                title={book.title}
                author={book.author}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayHighestRanking;
