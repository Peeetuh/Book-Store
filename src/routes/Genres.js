import { Link, Outlet } from "react-router-dom";

function Genres({ genres, setGenreSelect }) {
  return (
    <main>
      <header>
        <h2>Browse Books by Genre</h2>
      </header>
      <section>
        {genres.map((genre) => {
          return (
            <div key={genres.indexOf(genre)}>
              <Link
                to={`/genres/${genre}`}
                onClick={() => setGenreSelect(genre)}
              >
                <div>
                  <span>{genre}</span>
                </div>
              </Link>
            </div>
          );
        })}
        <Outlet />
      </section>
    </main>
  );
}

export default Genres;
