import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../api";
import { CartForm, AddToCartToast } from "./components";
import "./SingleBookPage.css";

const SingleBookPage = ({
  userId,
  setIsLoading,
  setGuestCart,
  cartToast,
  setCartToast,
  cartItem,
  setCartItem,
}) => {
  const [bookInfo, setBookInfo] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const bookData = await fetchSingleBook(bookId);
        console.log(bookData);
        if (bookData !== undefined) {
          setBookInfo(bookData);
        } else setBookInfo(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {
  //   author,
  //   description,
  //   genre,
  //   // globalRatings,
  //   id,
  //   imageLinkL,
  //   // imageLinkM,
  //   // imageLinkS,
  //   inventory,
  //   // isFeatured,
  //   // isbn,
  //   price,
  //   publisher,
  //   rating,
  //   title,
  //   year,
  // } = bookInfo;
  return (
    <main id="single-book-container">
      <div id="book-page-background">
        {cartToast && (
          <AddToCartToast setCartToast={setCartToast} cartItem={cartItem} />
        )}
        {bookInfo ? (
          <>
            <header>
              <h2>
                <i>{bookInfo.title}</i>
              </h2>
            </header>
            <Link className="author" to={`/authors/${bookInfo.author}`}>
              by {bookInfo.author}
            </Link>
            <p className="book-rating">
              Rating: <b>{bookInfo.rating}</b> / 5 ({bookInfo.globalRatings}{" "}
              ratings)
            </p>
            <img
              className="single-book-img"
              src={bookInfo.imageLinkL}
              alt={bookInfo.title}
            />
            <div className="product-details">
              <h3>Product Details</h3>
              <p>Genre: {bookInfo.genre}</p>
              <p>Description: {bookInfo.description}</p>
              <p>
                Price: ${bookInfo.price} | No. available:{" "}
                {!bookInfo.inventory
                  ? "Currently out of stock!"
                  : bookInfo.inventory > 15
                  ? `${bookInfo.inventory}`
                  : bookInfo.inventory === 1
                  ? `Only 1 left!`
                  : `Only ${bookInfo.inventory} left!`}
              </p>
              <p>
                Publisher: {bookInfo.publisher} ({bookInfo.year})
              </p>
              <div className="book-page-cart-form">
                <h3>Interested In This Book?</h3>
            <CartForm
              setIsLoading={setIsLoading}
              userId={userId}
              title={bookInfo.title}
              price={bookInfo.price}
              id={bookInfo.id}
              inventory={bookInfo.inventory}
              setGuestCart={setGuestCart}
              setCartToast={setCartToast}
              setCartItem={setCartItem}
            />
            </div>
            </div>

          </>
        ) : (
          <header>
            <p>No results.</p>
          </header>
        )}
      </div>
    </main>
  );
};

export default SingleBookPage;
