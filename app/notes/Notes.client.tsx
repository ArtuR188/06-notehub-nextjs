"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api"; // або "@/lib/api/notes" якщо у тебе так
// Якщо FetchNotesResponse не експортований — прибери цей імпорт, він не критичний

export default function NotesClient() {
  const [page] = useState(1);
  const perPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, ""],
    queryFn: () => fetchNotes({ page, perPage, search: "" }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data || data.notes.length === 0) return <p>No notes found</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: "white" }}>Notes</h1>

      <ul style={{ color: "white" }}>
        {data.notes.map((note) => (
          <li key={note.id} style={{ marginBottom: 12 }}>
            <b>{note.title}</b> — <span>{note.tag}</span>
            <div>{note.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}