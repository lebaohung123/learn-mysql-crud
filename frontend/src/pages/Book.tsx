import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BookData {
    id: number;
    title: string;
    desc: string;
    cover: string;
    price: number;
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
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/books/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bookElement">
            <h1>Book Component</h1>
            <div className="books">
                {books.map((book, index) => (
                    <div className="book" key={index}>
                        {book.cover && <img src={book.cover} alt={book.desc} />}
                        <h2>{book.title}</h2>
                        <h4>{book.desc}</h4>
                        <h5>{book.price}</h5>
                        <button className="update">
                            <Link to={`/update/${book.id}`}>Update</Link>
                        </button>
                        <button
                            className="delete"
                            onClick={() => handleDelete(book.id)}   
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    );
};

export default Book;
