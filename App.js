import React, { useState, useEffect, useCallback } from "react";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  // Fetch books from Open Library API
  const fetchBooks = useCallback(async (q) => {
    if (!q) return;
    setLoading(true);
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
      q
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    setBooks(data.docs || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      fetchBooks(query);
    } else {
      setBooks([]);
    }
  }, [query, fetchBooks]);

  return (
    <div className="App">
      <h1>
        <span role="img" aria-label="books">
          📚
        </span>{" "}
        Book Finder
      </h1>

      <input
        type="text"
        placeholder="Search books by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="spinner"></div>}

      {!loading && books.length === 0 && query.length > 2 && (
        <p>😕 No books found. Try another title!</p>
      )}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.key} book={book} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <BookModal book={selected} onClose={() => setSelected(null)} />
      )}

      <footer className="footer">
        Built with ❤️ by <strong>Dharani</strong>
      </footer>
    </div>
  );
}
