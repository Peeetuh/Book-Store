import { useEffect, useState } from "react";
import { requestAuthor } from "../../api";
import { useParams } from "react-router-dom";

function Author(){
    const [author, setAuthor] = useState([]);
    const { authorName } = useParams()

    useEffect(()=> {
        const fetchAuthorData = async () => {
            const authorData = await requestAuthor(authorName);
            setAuthor(authorData);
        }
        fetchAuthorData();
    },[authorName])
    return(
        <section>
        <header>
        <h3>Authors - { authorName } </h3>
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