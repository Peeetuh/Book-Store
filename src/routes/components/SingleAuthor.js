import { useEffect, useState } from "react";
import { requestAuthor } from "../../api";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import CartForm from "./CartForm";
import { Link } from "react-router-dom";
import "./SingleAuthor.css";

function Author({ setIsLoading }) {
  const [author, setAuthor] = useState([]);
  const { authorName } = useParams();
  const fakeBio = faker.lorem.paragraph(6);
  const fakePic = faker.image.people(600, 400, true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);
      try {
        const authorData = await requestAuthor(authorName);
        setAuthor(authorData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthorData();
  }, [authorName, setIsLoading]);
  return (
      <div id="background-color">
      <section id="single-author-container">
      <div className="float-child-author-1">
      <img
      id="author-pic"
      src={fakePic}
      alt="Random stock"
      ></img>
      </div>
      <header id ="float-child-author-2">
      <p>
      <h3 id="single-author-name">{authorName}</h3>
      <strong> About author:</strong> {fakeBio}
      </p>
      </header>
      </section>
      <div id="author-child-3">
      {author.map((book) => {
          return (
            <>
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img id="author-book-img" src={book.imageLinkM} alt={book.title} />
                </Link>
                <p> By {book.author}</p>
                <CartForm />
              </div>
            </>
          );
        })}
      </div>
      </div>
  );
}

export default Author;