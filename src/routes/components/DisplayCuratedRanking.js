import { Link } from "react-router-dom";
import { CartForm } from "./";

function DisplayCuratedRanking({ token, topCuratedRanking, userId, setIsLoading, setGuestCart }) {
  return (
    <section>
      <header>
        <h3>Most Popular Books</h3>
      </header>
      <div className="curated-container">
        {topCuratedRanking.map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img src={book.imageLinkM} alt={book.title} />
              </Link>

              <Link to={`/authors/${book.author}`}>
                <p className="author-link"> By {book.author}</p>
              </Link>
              <CartForm
                setIsLoading={setIsLoading}
                userId={userId}
                price={book.price}
                id={book.id}
                inventory={book.inventory}
                bookImage={book.imageLinkM}
                title={book.title}
                author={book.author}
                setGuestCart={setGuestCart}
                token={token}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayCuratedRanking;
