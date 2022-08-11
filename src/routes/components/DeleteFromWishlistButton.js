import { getUserWishlist, deleteBookFromWishlist } from "../../api";

const DeleteFromWishlistButton = ({ token, wishlistId, setWishlist }) => {
  const clickHandler = async (e) => {
    e.preventDefault();
    const result = await deleteBookFromWishlist(token, wishlistId);
    console.log("delete result", result);
    const fetchedWishlist = await getUserWishlist(token);
    setWishlist(fetchedWishlist || []);
  };
  return <button onClick={clickHandler}>Remove from Wishlist</button>;
};

export default DeleteFromWishlistButton;
