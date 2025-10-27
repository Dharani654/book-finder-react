import React from "react";

export default function BookCard({ book, onOpen }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150?text=No+Cover";

  return (
    <div
      onClick={() => onOpen(book)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <img
        src={coverUrl}
        alt={book.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3 style={{ fontSize: "16px", margin: "10px 0 5px" }}>{book.title}</h3>
      <p style={{ fontSize: "14px", color: "gray" }}>
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p style={{ fontSize: "12px", color: "#777" }}>
        {book.first_publish_year || ""}
      </p>
    </div>
  );
}
