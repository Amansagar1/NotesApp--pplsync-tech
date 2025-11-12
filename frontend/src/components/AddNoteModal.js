"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { createNote } from "../Web/ApiControllers";

export default function AddNoteModal({ open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;

    setLoading(true);
    const noteData = {
      title: title.trim() || "Untitled",
      body: body.trim(),
    };

    createNote(noteData)
      .then((response) => {
        const formatted = {
          id: response.id || response._id || crypto.randomUUID(),
          title: response.title || noteData.title,
          body: response.body || noteData.body,
          createdAt:
            response.createdAt ||
            (response.created_on
              ? Date.parse(response.created_on)
              : Date.now()),
        };
        onAdd(formatted);
        setTitle("");
        setBody("");
        onClose();
      })
      .catch((error) => {
        const msg =
          error?.detail || error?.message || "Could not save the note.";
        alert(msg);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Note">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={7}
          placeholder="Start typing your note..."
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{body.length} characters</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-slate-200 hover:bg-white/10 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-fuchsia-600 px-4 py-1.5 text-white hover:bg-fuchsia-500 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
