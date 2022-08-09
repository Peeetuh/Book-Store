import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../api";
import { CartForm, AddToCartToast } from "./components";

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
    <main>
      {cartToast && (
        <AddToCartToast setCartToast={setCartToast} cartItem={cartItem} />
      )}
      {bookInfo ? (
        <>
          <header>
            <h2>{bookInfo.title}</h2>
          </header>
          <Link to={`/authors/${bookInfo.author}`}>{bookInfo.author}</Link>
          <h4>Rated {bookInfo.rating}/5 stars</h4>
          <img src={bookInfo.imageLinkL} alt={bookInfo.title} />
          <h5>Genre: {bookInfo.genre}</h5>
          <h4>{bookInfo.description}</h4>
          <h5>
            Price: ${bookInfo.price} | No. available:{" "}
            {!bookInfo.inventory
              ? "Currently out of stock!"
              : bookInfo.inventory > 15
              ? `${bookInfo.inventory} copies`
              : bookInfo.inventory === 1
              ? `Only 1 copy left!`
              : `Only ${bookInfo.inventory} copies left!`}
          </h5>
          <h6>
            Published By: {bookInfo.publisher} in {bookInfo.year}
          </h6>
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
        </>
      ) : (
        <header>
          <p>No results.</p>
        </header>
      )}
    </main>
  );
};

export default SingleBookPage;
