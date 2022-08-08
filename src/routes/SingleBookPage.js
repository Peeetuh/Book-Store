import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../api";
import { CartForm } from "./components";
import "./SingleBookPage.css";

const SingleBookPage = ({ userId, token, setIsLoading, setGuestCart }) => {
  const [bookInfo, setBookInfo] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const bookData = await fetchSingleBook(bookId);
        setBookInfo(bookData);
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
    <>
    
    <div id="book-page-background">
    <div className="single-book-container">
      <div className="float-child1">
    <img className="single-book-img" src={imageLinkL} alt={title} />
    </div>
    <div className="float-child2">
      <div className="single-page-text">
      <h3 id="title">{title}</h3>
      <Link className="author-name" to={`/authors/${author}`}>{author}</Link>
      <h4>Rated {rating}/5 stars</h4>
      <h5>Genre: {genre}</h5>
      <h4>{description}</h4>
      <h5>Price: {price}</h5>
      <h6>
        Published By: {publisher} in {year}
      </h6>
      <CartForm
        setIsLoading={setIsLoading}
        userId={userId}
        price={price}
        id={id}
        inventory={inventory}
        setGuestCart={setGuestCart}
      />
       </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default SingleBookPage;
