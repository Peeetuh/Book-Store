import { Link } from "react-router-dom";
import { CartForm } from "./";

function DisplayFeatured({ featured, userId, setIsLoading, setGuestCart, setCartToast, setCartItem }) {
  return (
    <section>
      <header>
        <h3 className="displays-top-ten">Featured Books</h3>
      </header>
      <div className="curated-container">
        {featured.map((book) => {
          return (
            <div className="home-child-elements" key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img className="img-home-list" src={book.imageLinkM} alt={book.title} />
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

export default DisplayFeatured;
