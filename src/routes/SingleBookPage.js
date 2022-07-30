import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSingleBook } from "../api";
import CartForm from "./components/CartForm";

const SingleBookPage = ({ userId, token }) => {
  const [bookInfo, setBookInfo] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await fetchSingleBook(bookId);
      setBookInfo(bookData);
    };
    fetchBookData();
  }, [bookId]);

  const {
    author,
    description,
    genre,
    globalRatings,
    id,
    imageLinkL,
    imageLinkM,
    imageLinkS,
    inventory,
    isFeatured,
    isbn,
    price,
    publisher,
    rating,
    title,
    year,
  } = bookInfo;
  return (
    <>
      <h3>{title}</h3>
      <Link to={`/authors/${author}`}>{author}</Link>
      <h4>Rated {rating}/5 stars</h4>
      <img src={imageLinkL} alt={title} />
      <h5>Genre: {genre}</h5>
      <h4>{description}</h4>
      <h5>Price: {price}</h5>
      <h6>Published By: {publisher} in {year}</h6>
      <CartForm userId={userId} price={price} id={id} inventory={inventory}/>
    </>
  );
};

export default SingleBookPage;