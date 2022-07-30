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

function Home({ userId }) {
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
      <h1>Home</h1>
      <DisplayCuratedRanking
        topCuratedRanking={topCuratedRanking}
        userId={userId}
      />
      <DisplayHighestRanking topRated={topRated} />
      <DisplayFeatured featured={featured} />
    </main>
  );
}

export default Home;
