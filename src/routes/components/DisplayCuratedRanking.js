import { Link } from "react-router-dom";


function DisplayCuratedRanking({ topCuratedRanking, userId }) {
  return (
    <section>
      <header>
        <h3>Most Popular Books</h3>
      </header>
      <div className="curated-container">
        {topCuratedRanking.map((book) => {
          return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img src={book.imageLinkM} alt={book.title} />
                </Link>
              </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayCuratedRanking;
