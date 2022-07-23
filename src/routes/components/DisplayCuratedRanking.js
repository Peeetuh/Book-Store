

function DisplayCuratedRanking({topCuratedRanking}){

    return(
        <section>
            <header>
            <h3>Most Popular Books</h3>
            </header>
            <div className="curated-container">
           {topCuratedRanking.map(book => {
            return (
                <div key={book.id}>
                    <img src={book.imageLinkM} alt={book.title}/>
                </div>
            )
           })}
            </div>
        </section>
    )
};

export default DisplayCuratedRanking;