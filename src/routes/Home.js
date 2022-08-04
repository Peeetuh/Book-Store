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

function Home({ userId, username }) {
  const [topCuratedRanking, setTopCuratedRanking] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchCuratedRanking = async () => {
      const dataCurated = await requestCuratedRanking();
      setTopCuratedRanking(dataCurated);
    };
    fetchCuratedRanking();

    const fetchTopRated = async () => {
      const dataTopRated = await requestTopRated();
      setTopRated(dataTopRated);
    };
    fetchTopRated();

    const fetchFeatured = async () => {
      const dataFeatured = await requestFeatured();
      setFeatured(dataFeatured);
    };
    fetchFeatured();
  }, []);

  return (
    <main>
      <h1 className="title-home">TBM Bookstore</h1>
      <DisplayCuratedRanking
        topCuratedRanking={topCuratedRanking}
        userId={userId}
      />
      <DisplayHighestRanking topRated={topRated} userId={userId} />
      <DisplayFeatured featured={featured} userId={userId} />
    </main>
  );
}

export default Home;
