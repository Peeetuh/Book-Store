import { addBookToWishlist } from "../../api";

const WishlistButton = ({userId, bookId, token}) => {
  const addToWishlist = async (event) => {
    event.preventDefault();
    await addBookToWishlist(token, userId, bookId);
    alert("Book added to wishlist");
  };

  return (
    <>
      <button onClick={addToWishlist}>+Wishlist</button>
    </>
  );
};

export default WishlistButton;
