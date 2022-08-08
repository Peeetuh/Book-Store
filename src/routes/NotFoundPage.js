import cat from "./components/Images/cat.png";

const NotFoundPage = () => {
  return (
    <main>
      <header>
      <h2>404</h2>
      </header>
      <section>
        <p>We couldn't find the page you were looking for!<br />
        How about this picture of a cat?</p>
        <img src={cat} alt="Pretty kitty" />
      </section>
    </main>
  )
}

export default NotFoundPage;