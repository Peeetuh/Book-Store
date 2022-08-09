import { Link } from "react-router-dom";
import { CartForm } from "./";

function DisplayCuratedRanking({
  topCuratedRanking,
  userId,
  setIsLoading,
  setGuestCart,
  setCartToast,
  setCartItem
}) {
  return (
    <section>
      <header>
        <h3 className="displays-top-ten">Most Popular Books</h3>
      </header>
      <div className="curated-container">
        {topCuratedRanking.map((book) => {
          return (
            <div className="home-child-elements" key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img className="img-home-list" src={book.imageLinkM} alt={book.title} />
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

export default DisplayCuratedRanking;
