"use client";
import React, { useState } from "react";
import Modal from "./Modal";

export default function AddNoteModal({
  open,
  onClose,
  onAdd,}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    onAdd({ title: title.trim() || "Untitled", body: body.trim() });
    setTitle("");
    setBody("");
  }

  const charCount = body.length;

  return (
    <Modal open={open} onClose={onClose} title="New note">
      <form onSubmit={submit} className="space-y-4">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        <textarea
          rows={7}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write something memorable..."
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        />
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{charCount} chars</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-slate-200 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-600 px-4 py-1.5 text-white hover:bg-fuchsia-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
