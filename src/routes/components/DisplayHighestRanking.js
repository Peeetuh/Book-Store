import { Link } from "react-router-dom";
import { CartForm } from "./";

function DisplayHighestRanking({
  topRated,
  userId,
  setIsLoading,
  setGuestCart,
  setCartToast,
  setCartItem,
}) {
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
              <Link className="author-link" to={`/authors/${book.author}`}>
                <p> By {book.author}</p>
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
                setCartToast={setCartToast}
                setCartItem={setCartItem}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayHighestRanking;
