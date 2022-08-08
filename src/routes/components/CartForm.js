import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";

const CartForm = ({
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
    <form onSubmit={addToCartSubmitHandler}>
      <label>Quantity</label>
      {inventory ? (
        <select
          name="selectList"
          onChange={(e) => setBookQuantity(Number(e.target.value))}
        >
          <Selector inventory={inventory} />
        </select>
      ) : (
        <select name="selectList" disabled></select>
      )}
      {inventory ? (
        <button type="submit">Add to Cart</button>
      ) : (
        <button disabled>Add to Cart</button>
      )}
    </form>
  );
};

export default CartForm;
