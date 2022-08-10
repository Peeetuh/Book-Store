import { useEffect, useState } from "react";
import { getUserWishlist } from "../../api";

const UserWishlist = ({ token }) => {
  const [wishlist, setWishlist] = useState("");

  useEffect(() => {
    const loadWishlist = async () => {
      const fetchedAccount = await getUserWishlist(token);
      setWishlist(fetchedAccount);
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
