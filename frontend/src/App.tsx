import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import Add from "./pages/Add";
import Update from "./pages/Update";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Book />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update" element={<Update />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
