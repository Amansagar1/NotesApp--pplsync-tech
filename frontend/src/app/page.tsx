"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddNoteModal from "../components/AddNoteModal";
import Fab from "../components/Fab";
import { listNotes, updateNote, deleteNote } from "../Web/ApiControllers";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    listNotes()
      .then((data) => setNotes(data))
      .catch(() => setNotes([]));
  }, []);

  const handleAdd = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const previous = [...notes];
    setNotes((n) => n.filter((note) => note.id !== id));

    deleteNote(id)
      .then(() => {})
      .catch(() => {
        alert("Failed to delete note.");
        setNotes(previous);
      });
  };

  const handleEdit = (note: Note) => {
    const newTitle = prompt("Edit title", note.title);
    if (newTitle === null) return;
    const newBody = prompt("Edit content", note.body);
    if (newBody === null) return;

    const updatedNote = { ...note, title: newTitle, body: newBody };
    const previous = [...notes];
    setNotes((n) => n.map((x) => (x.id === note.id ? updatedNote : x)));

    updateNote(note.id, { title: newTitle, body: newBody })
      .then(() => {})
      .catch(() => {
        alert("Failed to update note.");
        setNotes(previous);
      });
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">{greeting}</h1>
          <span className="text-sm text-slate-400">{notes.length} total</span>
        </header>

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-base text-slate-300">
              No notes found. Create your first note to get started.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {notes.map((note) => (
              <article
                key={note.id}
                className="mb-4 break-inside-avoid rounded-xl border border-white/10 bg-white/10 p-4 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="rounded p-1 hover:bg-white/5"
                      aria-label="Edit note"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="rounded p-1 hover:bg-red-600/10"
                      aria-label="Delete note"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200/90">
                  {note.body}
                </p>
                <time className="mt-3 block text-xs text-slate-400">
                  {new Date(note.createdAt).toLocaleString()}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>

      <Fab onClick={() => setShowModal(true)} ariaLabel="Add note" />

      <AddNoteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
      />
    </main>
  );
}
