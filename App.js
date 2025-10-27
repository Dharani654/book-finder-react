import React, { useState, useEffect, useCallback } from "react";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";

function useDebounce(value, delay = 450) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 450);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchBooks = useCallback(async (q) => {
    if (!q) {
      setBooks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        q
      )}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(debouncedQuery);
  }, [debouncedQuery, fetchBooks]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>📚 Book Finder</h1>

      <input
        type="text"
        value={query}
        placeholder="Search books by title..."
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          fontSize: "16px",
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && books.length === 0 && debouncedQuery && (
        <p>No results found.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {books.map((book) => (
          <BookCard key={book.key} book={book} onOpen={setSelected} />
        ))}
      </div>

      <BookModal book={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
