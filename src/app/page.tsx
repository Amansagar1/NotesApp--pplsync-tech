"use client";
import React, { useState, useMemo } from "react";
import AddNoteModal from "../components/AddNoteModal";
import Fab from "../components/Fab";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
};

export default function NotesPage() {
  const [items, setItems] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);

  const insertNote = (data: { title: string; body: string }) => {
    const note: Note = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...data,
    };
    setItems((prev) => [note, ...prev]);
    setShowModal(false);
  };

  const dayMessage = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">

      <div className="mx-auto max-w-6xl px-5 py-8">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-base text-slate-300">
              Nothing here yet. Add a new note to begin.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((note) => (
              <article
                key={note.id}
                className="mb-4 break-inside-avoid rounded-xl border border-white/10 bg-white/10 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <h3 className="text-sm font-semibold text-white">
                  {note.title}
                </h3>
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
        onAdd={insertNote}
      />
    </main>
  );
}
