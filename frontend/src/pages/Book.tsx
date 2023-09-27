import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Book.css"

interface BookData {
    title: string;
    desc: string;
    cover: string;
}

const Book = () => {
    const [books, setBooks] = useState<BookData[]>([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBooks();
    }, []);

    return (
        <div className="bookElement">
            <h1>Book Component</h1>
            <div className="books">
                {books.map((book, index) => (
                    <div className="book" key={index}>
                        {book.cover && <img src={book.cover} alt={book.desc} />}
                        <h2>{book.title}</h2>
                        <h4>{book.desc}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Book;
