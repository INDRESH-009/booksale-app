"use client";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "", price: "", condition: "", seller: "" });

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newBook = await res.json();
    setBooks([...books, newBook]);
    setFormData({ title: "", author: "", price: "", condition: "", seller: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Books for Sale</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Condition"
          value={formData.condition}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Seller"
          value={formData.seller}
          onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Book</button>
      </form>

      <ul className="mt-4">
        {books.map((book) => (
          <li key={book._id} className="border p-2 my-2">
            <strong>{book.title}</strong> by {book.author} - ₹{book.price} ({book.condition})
          </li>
        ))}
      </ul>
    </div>
  );
}
