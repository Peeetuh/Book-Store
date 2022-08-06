import { useEffect, useState } from "react";
import {
  DisplayCuratedRanking,
  DisplayHighestRanking,
  DisplayFeatured,
} from "./components";
import {
  requestCuratedRanking,
  requestTopRated,
  requestFeatured,
} from "../api";

function Home({ userId, username, setIsLoading, setGuestCart }) {
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
  }, [setIsLoading]);

  return (
    <main>
      <h1 className="title-home">TBM Bookstore</h1>
      <DisplayCuratedRanking
        topCuratedRanking={topCuratedRanking}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
      />
      <DisplayHighestRanking
        topRated={topRated}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
      />
      <DisplayFeatured
        featured={featured}
        userId={userId}
        setIsLoading={setIsLoading}
        setGuestCart={setGuestCart}
      />
    </main>
  );
}

export default Home;
