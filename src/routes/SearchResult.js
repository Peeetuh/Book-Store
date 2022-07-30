

function SearchResult({searchResult}){
    return(
        <div>
            <h2>
                Search Result
            </h2>
            <div className="curated-container">
            {searchResult.map(book =>{
                return(
                    <div key={book.id}>
                        <img src={book.imageLinkS} alt={book.title}/>
                    </div>
                )
            })}

        </div>
        </div>
    )
};

export default SearchResult;