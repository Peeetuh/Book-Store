import { useEffect, useState } from "react";
import { getUserWishlist } from "../../api";

const UserWishlist = ({ setIsLoading, token }) => {
  const [wishlist, setWishlist] = useState("");

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      try {
        const fetchedAccount = await getUserWishlist(token);
        setWishlist(fetchedAccount);
      } finally {
        setIsLoading(false);
      }
    };
    loadWishlist();
  }, [token, setIsLoading]);

  console.log("wishlist", wishlist)
  return (
    <>
      <h1>Wishlist</h1>
    </>
  );
};

export default UserWishlist;
