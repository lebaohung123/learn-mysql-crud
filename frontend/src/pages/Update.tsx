import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BookData {
    title: string;
    desc: string;
    cover: string;
    price: number;
}
const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookID = location.pathname.split("/")[2];
    const [book, setBook] = useState<BookData>({
        title: "",
        desc: "",
        cover: "",
        price: 0,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };
    const handleClick = async () => {
        try {
            await axios.put("http://localhost:8000/books/" + bookID, book);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchDataBook = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/books/" + bookID
                );
                setBook(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataBook();
    }, [bookID]);
    return (
        <div className="form">
            <h1>Update book</h1>
            <input
                type="text"
                placeholder="title"
                onChange={handleChange}
                name="title"
                value={book.title}
            />
            <input
                type="text"
                placeholder="desc"
                onChange={handleChange}
                name="desc"
                value={book.desc}
            />
            <input
                type="number"
                placeholder="price"
                onChange={handleChange}
                name="price"
                value={book.price}
            />
            <input
                type="text"
                placeholder="cover"
                onChange={handleChange}
                name="cover"
                value={book.cover}
            />
            <button onClick={handleClick} className="formBtn">
                Update
            </button>
        </div>
    );
};

export default Update;
