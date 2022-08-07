import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../api";
import { CartForm } from "./components";

const SingleBookPage = ({ userId, token, setIsLoading, setGuestCart }) => {
  const [bookInfo, setBookInfo] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const bookData = await fetchSingleBook(bookId);
        setBookInfo(bookData || []);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookData();
  }, [bookId, setIsLoading]);

  const {
    author,
    description,
    genre,
    // globalRatings,
    id,
    imageLinkL,
    // imageLinkM,
    // imageLinkS,
    inventory,
    // isFeatured,
    // isbn,
    price,
    publisher,
    rating,
    title,
    year,
  } = bookInfo;
  return (
    <main>
      {bookInfo.length ? (
        <>
          <header>
            <h2>{title}</h2>
          </header>
          <Link to={`/authors/${author}`}>{author}</Link>
          <h4>Rated {rating}/5 stars</h4>
          <img src={imageLinkL} alt={title} />
          <h5>Genre: {genre}</h5>
          <h4>{description}</h4>
          <h5>
            Price: ${price} | No. available:{" "}
            {!inventory
              ? "Currently out of stock!"
              : inventory > 15
              ? `${inventory} copies`
              : inventory === 1
              ? `Only 1 copy left!`
              : `Only ${inventory} copies left!`}
          </h5>
          <h6>
            Published By: {publisher} in {year}
          </h6>
          <CartForm
            setIsLoading={setIsLoading}
            userId={userId}
            title={title}
            price={price}
            id={id}
            inventory={inventory}
            setGuestCart={setGuestCart}
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
