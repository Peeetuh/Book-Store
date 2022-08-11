import { useEffect, useState } from "react";

import { DeleteFromWishlistButton, CartForm } from "../components";
import { getUserWishlist } from "../../api";
import "./UserWishlist.css";

const UserWishlist = ({
  token,
  username,
  userId,
  setCartToast,
  setCartItem,
  setIsLoading,
  usersWishlist,
}) => {
  const [wishlist, setWishlist] = useState([]);
  const [inWishlist] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      const fetchedWishlist = await getUserWishlist(token);
      setWishlist(fetchedWishlist || []);
    };
    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="wishlist-container">
      <h4>Wishlist</h4>
      <div>
        {wishlist.map((book) => {
          return (
            <div key={book.bookId} className="wishlist-book-container">
              <img src={book.imageLinkM} alt={book.title} />
              <div className="wishlist-book-subdiv">
                <div className="wishlist-book-info">
                  <p>
                    <i>{book.title}</i>, {book.author} | ${book.price}
                  </p>
                </div>
                <div>
                  <CartForm
                    userId={userId}
                    price={book.price}
                    id={book.bookId}
                    inventory={book.inventory}
                    bookImage={book.imageLinkM}
                    title={book.title}
                    author={book.author}
                    setCartToast={setCartToast}
                    setCartItem={setCartItem}
                    token={token}
                    setIsLoading={setIsLoading}
                    inWishlist={inWishlist}
                  />
                  <DeleteFromWishlistButton
                    token={token}
                    wishlistId={book.wishlistId}
                    setWishlist={setWishlist}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserWishlist;
