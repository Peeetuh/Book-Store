import { Link } from "react-router-dom";

function DisplayFeatured({ featured }) {
  return (
    <section>
      <header>
        <h3>Featured Books</h3>
      </header>
      <div className="curated-container">
        {featured.map((book) => {
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

export default DisplayFeatured;
