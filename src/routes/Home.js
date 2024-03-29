import { useEffect, useState } from "react";
import {
  DisplayCuratedRanking,
  DisplayHighestRanking,
  DisplayFeatured,
  LogOutToast,
  AddToCartToast,
} from "./components";
import {
  requestCuratedRanking,
  requestTopRated,
  requestFeatured,
} from "../api";
import "./Home.css";

function Home({
  token,
  userId,
  username,
  setIsLoading,
  setGuestCart,
  toast,
  setToast,
  cartToast,
  setCartToast,
  cartItem,
  setCartItem,
}) {
  const [topCuratedRanking, setTopCuratedRanking] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchCuratedRanking = async () => {
      setIsLoading(true);
      try {
        const dataCurated = await requestCuratedRanking();
        setTopCuratedRanking(dataCurated);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCuratedRanking();

    const fetchTopRated = async () => {
      setIsLoading(true);
      try {
        const dataTopRated = await requestTopRated();
        setTopRated(dataTopRated);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopRated();

    const fetchFeatured = async () => {
      setIsLoading(true);
      try {
        const dataFeatured = await requestFeatured();
        setFeatured(dataFeatured);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
    setTimeout(() => {
      setToast(false);
    }, 5500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="home-container">
      {toast && <LogOutToast setToast={setToast} />}
      {cartToast && (
        <AddToCartToast setCartToast={setCartToast} cartItem={cartItem} />
      )}
      <h1 className="title-home">TBM Bookstore</h1>
      <DisplayCuratedRanking
        token={token}
        topCuratedRanking={topCuratedRanking}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
        setCartToast={setCartToast}
        setCartItem={setCartItem}
      />
      <DisplayHighestRanking
        token={token}
        topRated={topRated}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
        setCartToast={setCartToast}
        setCartItem={setCartItem}
      />
      <DisplayFeatured
        token={token}
        featured={featured}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
        setCartToast={setCartToast}
        setCartItem={setCartItem}
      />
    </main>
  );
}

export default Home;
