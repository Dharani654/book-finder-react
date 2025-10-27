import React from "react";

export default function BookModal({ book, onClose }) {
  const coverId = book.cover_i;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <img src={imageUrl} alt={book.title} style={{ width: "120px" }} />
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong>{" "}
          {book.author_name ? book.author_name.join(", ") : "Unknown"}
        </p>
        <p>
          <strong>First Published:</strong> {book.first_publish_year || "N/A"}
        </p>
        <p>
          <strong>Subjects:</strong>{" "}
          {book.subject ? book.subject.slice(0, 5).join(", ") : "Not available"}
        </p>
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noreferrer"
        >
          🔗 View on Open Library
        </a>
      </div>
    </div>
  );
}
