"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "notes",
      });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>

          <Link href={`/notes/${note.id}`}>View details</Link>

          <button
            type="button"
            className={css.button}
            onClick={() => deleteMutation.mutate(note.id)}
            disabled={deleteMutation.isPending}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}