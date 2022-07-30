const DisplayAllBooks = ({ allBooksData}) => {
  return (
    <section>
      <h4>Displaying All Books</h4>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Book ID#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
            </tr>
            {allBooksData.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <th>{book.price}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DisplayAllBooks;