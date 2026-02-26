import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
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
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}