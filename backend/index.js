const express = require("express");
const mysql = require("mysql2");
const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test",
});
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello Word!");
});

app.get("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const q = "SELECT * From books WHERE id = ?";
    db.query(q, bookID, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/books", (req, res) => {
    const q = "SELECT * From books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const q = `DELETE FROM books WHERE id = ?`;
    db.query(q, bookID, (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
});

app.put("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const q =
        "UPDATE books SET  `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(q, [...values, bookID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

app.listen(8000, () => {
    console.log("Server is running on Port 8000");
});
