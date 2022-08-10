import { useEffect, useState } from "react";
import { getUserWishlist } from "../../api";

const UserWishlist = ({ token }) => {
  const [wishlist, setWishlist] = useState("");
  
  useEffect(() => {
    const loadWishlist = async () => {
      const fetchedWishlist = await getUserWishlist(token);
      setWishlist(fetchedWishlist);
    };
    loadWishlist();
  }, [token]);

  console.log("wishlist", wishlist);
  return (
    <>
      <h1>Wishlist</h1>
    </>
  );
};

export default UserWishlist;
