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
        <h3>{ authorName } </h3>
        <img className="authorPic"
        style={{width:400, height:400}}
        src="https://i.imgur.com/rwZzeOM.png" alt="awful"></img>
        <p>
            
        </p>
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