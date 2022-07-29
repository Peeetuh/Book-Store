import { Link, Route, Routes } from "react-router-dom";
import CartForm from "./CartForm";

function DisplayCuratedRanking({ topCuratedRanking, userId }) {
  return (
    <section>
      <header>
        <h3>Most Popular Books</h3>
      </header>
      <div className="curated-container">
        {topCuratedRanking.map((book) => {
          return (
            <>
              <div key={book.id}>
                <Link to={`/${book.id}`}>
                  <img src={book.imageLinkM} alt={book.title} />
                </Link>
                <Link to={`/authors/${book.author}`}>
                <p> By {book.author}</p>
                </Link>
                <CartForm userId={userId} />
              </div>
              <Routes>
                <Route path={`/${book.id}`} />
              </Routes>
            </>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayCuratedRanking;
