export default function Field({
  label,
  type = "text",
  name,
  placeholder,
  onChange,
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-200">{label}</span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-emerald-500/30"
      />
    </label>
  );
}
