import React from "react";

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          width: "90%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <img
          src={coverUrl}
          alt={book.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

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
          {book.subject
            ? book.subject.slice(0, 10).join(", ")
            : "Not available"}
        </p>
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noreferrer"
        >
          View on OpenLibrary
        </a>
      </div>
    </div>
  );
}
