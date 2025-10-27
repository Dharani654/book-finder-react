import React from "react";

export default function BookCard({ book, onOpen }) {
  const coverId = book.cover_i;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="book-card" onClick={() => onOpen(book)}>
      <img src={imageUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong>{" "}
        {book.author_name ? book.author_name.join(", ") : "Unknown"}
      </p>
      <p>
        <strong>Year:</strong>{" "}
        {book.first_publish_year ? book.first_publish_year : "N/A"}
      </p>
    </div>
  );
}
