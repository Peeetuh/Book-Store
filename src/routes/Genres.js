import { Link, Outlet } from "react-router-dom";
import Card from "./Card";
import Comedy from "./components/Images/comedy.png"
import Horror from "./components/Images/horror.png"
import GeneralFiction from "./components/Images/generalfiction.png"
import Mystery from "./components/Images/mystery.png"
import Thriller from "./components/Images/thriller.png"
import Romance from "./components/Images/romance.png"
import ScienceFiction from "./components/Images/sciencefiction.png"

function Genres({ genres, setGenreSelect }) {
  return (
    <main>
      <header>
        <h2>Browse Books by Genre</h2>
      </header>
      <div>
    
      </div>
      <section className="genre-cards">
        {genres.map((genre) => {
          let imgSrc
          if (genre === "Comedy") {
           imgSrc = Comedy
          } if (genre === "Horror") {
            imgSrc = Horror
          } if (genre === "Romance") {
            imgSrc = Romance
          } if (genre === "Thriller") {
            imgSrc = Thriller
          } if (genre === "Science-Fiction") {
            imgSrc = ScienceFiction
          } if (genre === "General Fiction") {
            imgSrc = GeneralFiction
          } if (genre === "Mystery") {
            imgSrc = Mystery
          }

          return (
            <Card key={genres.indexOf(genre)}
            img={imgSrc}
              Link={<Link className="genre-link"
                to={`/genres/${genre}`}
                onClick={() => setGenreSelect(genre)}
              >
                <div>
                  <span>{genre}</span>
                </div>
              </Link>}
             />
          );
        })}
        <Outlet />
      </section>
    </main>
  );
}

export default Genres;
