import { useEffect, useState } from "react";
import { requestAuthor } from "../../api";

function Author(){
    const [author, setAuthor] = useState([]);

    useEffect(()=> {
        const fetchAuthorData = async () => {
            const authorData = await requestAuthor();
            setAuthor(authorData);
        }
        fetchAuthorData();
    },[])
    return(
        <section>
        <header>
        <h3>Authors</h3>
        </header>
        <div className="authorPage">
        {author.map(book =>{
        return(
            <div key={book.id}>
                <img src={book.imageLinkS} alt={book.title}/>
            </div>
        )
        })}
            </div>
    </section>
    )
};

export default Author;