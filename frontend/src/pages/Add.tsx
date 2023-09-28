import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookData {
    title: string;
    desc: string;
    cover: string;
    price: number | null;
}
const Add = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState<BookData>({
        title: "",
        desc: "",
        cover: "",
        price: null,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };
    const handleClick = async () => {
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="form">
            <h1>Add new book</h1>
            <input
                type="text"
                placeholder="title"
                onChange={handleChange}
                name="title"
            />
            <input
                type="text"
                placeholder="desc"
                onChange={handleChange}
                name="desc"
            />
            <input
                type="number"
                placeholder="price"
                onChange={handleChange}
                name="price"
            />
            <input
                type="text"
                placeholder="cover"
                onChange={handleChange}
                name="cover"
            />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default Add;
