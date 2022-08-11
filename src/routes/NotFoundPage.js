import cat from "./components/Images/cat.png";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <main id="not-found-container">
      <header>
      <h2>404</h2>
      </header>
      <section>
        <p>We couldn't find the page you were looking for!</p>
        <p>How about this picture of a cat?</p>
        <img src={cat} alt="Pretty kitty" />
      </section>
    </main>
  )
}

export default NotFoundPage;