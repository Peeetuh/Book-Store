import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Link, useParams } from "react-router-dom";

import { requestAuthor } from "../../api";
import CartForm from "./CartForm";
import AddToCartToast from "./modals/AddToCartToast";
import "./SingleAuthor.css";

function Author({
  token,
  userId,
  setIsLoading,
  setGuestCart,
  cartToast,
  setCartToast,
  cartItem,
  setCartItem,
}) {
  const [authorBooks, setAuthorBooks] = useState([]);
  const { authorName } = useParams();
  const fakePic = faker.image.people(600, 400, true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);
      try {
        const authorData = await requestAuthor(authorName);
        setAuthorBooks(authorData || []);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="author-container">
      {cartToast && (
        <AddToCartToast setCartToast={setCartToast} cartItem={cartItem} />
      )}
      <header>
        <h2 id="author-name">{authorName}</h2>
        <img
          id="author-pic"
          style={{ width: 400, height: 400 }}
          src={fakePic}
          alt="Random stock"
        ></img>
      </header>
      <section id="author-bio">
        <p>
          <b>About {authorName}:</b> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Sed lectus vestibulum mattis ullamcorper velit. Vel
          risus commodo viverra maecenas accumsan lacus vel facilisis.
          Scelerisque viverra mauris in aliquam sem. Libero enim sed faucibus
          turpis in eu mi bibendum neque. Volutpat commodo sed egestas egestas
          fringilla. Turpis egestas pretium aenean pharetra magna ac placerat
          vestibulum lectus. Semper quis lectus nulla at volutpat diam ut
          venenatis tellus. Congue nisi vitae suscipit tellus mauris a diam
          maecenas. Nam at lectus urna duis convallis convallis tellus id.
          Libero nunc consequat interdum varius sit amet mattis vulputate enim.
          A iaculis at erat pellentesque adipiscing commodo. Et leo duis ut
          diam. Vel pharetra vel turpis nunc eget lorem dolor sed. Odio morbi
          quis commodo odio aenean sed adipiscing diam.
        </p>
        <p>
          Tempus iaculis urna id volutpat. Justo nec ultrices dui sapien eget mi
          proin sed libero. Tellus elementum sagittis vitae et leo duis ut diam.
          Dui ut ornare lectus sit amet est placerat in egestas. Elementum nisi
          quis eleifend quam. Ac turpis egestas sed tempus urna et pharetra
          pharetra. Ullamcorper sit amet risus nullam eget. Nullam vehicula
          ipsum a arcu cursus vitae. Leo urna molestie at elementum. Suspendisse
          ultrices gravida dictum fusce. Nullam non nisi est sit amet. Eros
          donec ac odio tempor orci dapibus ultrices. Adipiscing elit ut aliquam
          purus sit amet. Ornare quam viverra orci sagittis eu volutpat odio
          facilisis mauris.
        </p>
        <div>
          <h3 id="books-by">Books by {authorName}</h3>
          <div className="related-books-display">
          
          {authorBooks.map((book) => {
            return (
              <div key={book.id} id="author-row">
                <Link to={`/books/${book.id}`}> 
                  <img id="author-book-img" src={book.imageLinkM} alt={book.title} />
                </Link>
                <CartForm
                  className="cart-form"
                  setIsLoading={setIsLoading}
                  userId={userId}
                  price={book.price}
                  id={book.id}
                  title={book.title}
                  inventory={book.inventory}
                  setGuestCart={setGuestCart}
                  setCartToast={setCartToast}
                  setCartItem={setCartItem}
                  token={token}
                />
              </div>
            );
          })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Author;
