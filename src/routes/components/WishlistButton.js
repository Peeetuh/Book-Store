import { addBookToWishlist } from "../../api";

const WishlistButton = ({userId, bookId, token}) => {
  const addToWishlist = async (event) => {
    event.preventDefault();
    const wishlistBook = await addBookToWishlist(token, userId, bookId);
    console.log("wishlistBook", wishlistBook)
    alert("Book added to wishlist");
  };

  return (
    <>
      <button onClick={addToWishlist}>Add to Wishlist</button>
    </>
  );
};

export default WishlistButton;
