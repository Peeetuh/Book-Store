import { useEffect, useState } from "react";
import { requestAuthor } from "../../api";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import CartForm from "./CartForm";
import { Link } from "react-router-dom";

function Author({ userId, setIsLoading, setGuestCart }) {
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
    <section>
      <header>
        <h3>{authorName} </h3>
        <img
          className="authorPic"
          style={{ width: 400, height: 400 }}
          src={fakePic}
          alt="Random stock"
        ></img>
        <p>
          <strong> About author:</strong> {fakeBio}
        </p>
      </header>
      <div className="authorPage">
        {author.map((book) => {
          return (
            <>
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img src={book.imageLinkM} alt={book.title} />
                </Link>
                <p> By {book.author}</p>
                <CartForm
                  setIsLoading={setIsLoading}
                  userId={userId}
                  price={book.price}
                  id={book.id}
                  inventory={book.inventory}
                  setGuestCart={setGuestCart}
                />
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}

export default Author;
