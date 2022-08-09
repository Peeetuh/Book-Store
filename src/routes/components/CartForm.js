import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";
import { AiOutlineShoppingCart } from "react-icons/ai";


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
  setCartToast,
  setCartItem
}) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (userId) {
        await addBookToCart(userId, price, id, bookQuantity);
        setCartToast(true);
        setCartItem({title, price, bookQuantity})
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
          setCartToast(true);
          setCartItem({title, price, bookQuantity})
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
          setCartToast(true);
          setCartItem({title, price, bookQuantity})
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
        <button type="submit"><AiOutlineShoppingCart onSubmit={addToCartSubmitHandler}/></button>
      ) : (
        <button disabled>Add to Cart</button>
      )}
    </form>
  );
};

export default CartForm;
