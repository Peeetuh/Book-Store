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

                <Link to={`/authors/${book.author}`}>
                <p> By {book.author}</p>
                </Link>
                <CartForm userId={userId} />
              </div>
          );
        })}
      </div>
    </section>
  );
}

export default DisplayCuratedRanking;
