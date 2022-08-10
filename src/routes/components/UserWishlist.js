import { useEffect, useState } from "react";

import { DeleteFromWishlistButton, CartForm } from "../components";
import { getUserWishlist } from "../../api";

const UserWishlist = ({ token, username, userId, setCartToast, setCartItem }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const fetchedWishlist = await getUserWishlist(token);
      setWishlist(fetchedWishlist || []);
    };
    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("wishlist", wishlist);
  return (
    <section>
      <h3>{username}'s Wishlist</h3>
      <div>
        {wishlist.map((book) => {
          return (
            <div key={book.id}>
              <img src={book.imageLinkM} alt={book.title} />
              <div>
                <p>
                  <i>{book.title}</i>, {book.author} | ${book.price}
                </p>
              </div>
              <CartForm
                userId={userId}
                price={book.price}
                id={book.id}
                inventory={book.inventory}
                bookImage={book.imageLinkM}
                title={book.title}
                author={book.author}
                setCartToast={setCartToast}
                setCartItem={setCartItem}
                token={token}
              />
              <DeleteFromWishlistButton
                token={token}
                wishlistId={book.wishlistId}
                setWishlist={setWishlist}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserWishlist;
