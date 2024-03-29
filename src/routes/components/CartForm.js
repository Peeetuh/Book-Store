import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";
import { AiOutlineShoppingCart } from "react-icons/ai";
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
  setCartToast,
  setCartItem,
  inWishlist,
}) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    // try {
    if (userId) {
      await addBookToCart(userId, price, id, bookQuantity);
      setCartToast(true);
      setCartItem({ title, price, bookQuantity });
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
        localStorage.setItem("GuestCartData", JSON.stringify(existingEntries));
        setGuestCart(existingEntries);
        setCartToast(true);
        setCartItem({ title, price, bookQuantity });
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
        setCartItem({ title, price, bookQuantity });
      }
    }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <form className="add-to-cart-form">
      {/* <label>Quantity</label> */}
      {inventory ? (
        <select
          name="selectList"
          id="select-dropdown"
          onChange={(e) => setBookQuantity(Number(e.target.value))}
        >
          <Selector inventory={inventory} />
        </select>
      ) : (
        <select className="disabled-select-list" name="selectList" disabled></select>
      )}
      {inventory ? (
        <button className="add-to-cart-button" onClick={addToCartSubmitHandler}>
          <AiOutlineShoppingCart />
        </button>
      ) : (
        <button className="disabled-cart-btn" disabled>
          <AiOutlineShoppingCart />
        </button>
      )}
      {userId && !inWishlist ? (
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
