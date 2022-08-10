import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";
import WishlistButton from "./WishlistButton";

const CartForm = ({
  token,
  userId,
  price,
  id,
  inventory,
  bookImage,
  title,
  author,
  setIsLoading,
  setGuestCart,
}) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (userId) {
        await addBookToCart(userId, price, id, bookQuantity);
        alert("Book added to cart");
      } else {
        const existingEntries =
          JSON.parse(localStorage.getItem("GuestCartData")) || [];
        const newBook = {
          id,
          title,
          author,
          bookImage,
          inventory,
          price,
          bookQuantity,
        };
        if (!existingEntries.length) {
          existingEntries.push(newBook);
          localStorage.setItem(
            "GuestCartData",
            JSON.stringify(existingEntries)
          );
          setGuestCart(existingEntries);
        } else {
          const checkForBook = existingEntries.filter((book) => {
            if (book.id === newBook.id) {
              const newQuantity = newBook.bookQuantity + book.bookQuantity;
              newBook.bookQuantity = newQuantity;
            }
            return book.id !== newBook.id;
          });
          checkForBook.push(newBook);
          localStorage.setItem("GuestCartData", JSON.stringify(checkForBook));
          setGuestCart(checkForBook);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <label>Quantity</label>
      <select
        name="selectList"
        onChange={(e) => setBookQuantity(Number(e.target.value))}
      >
        <Selector inventory={inventory} />
      </select>
      {inventory < 15 ? <h6>Only {inventory} left in stock</h6> : null}
      <button onClick={addToCartSubmitHandler}>Add to Cart</button>
      {userId ? (
        <WishlistButton
          setIsLoading={setIsLoading}
          userId={userId}
          bookId={id}
          token={token}
        />
      ) : null}
    </form>
  );
};

export default CartForm;
