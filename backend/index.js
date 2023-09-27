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

app.get("/books", (req, res) => {
    const q = "SELECT * From test.books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.cover];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8000, () => {
    console.log("Server is running on Port 8000");
});
