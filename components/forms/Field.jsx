export default function Field({ label, type = "text", name, placeholder, onChange }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-emerald-500/20 placeholder:text-slate-400 focus:ring-4"
      />
    </label>
  );
}
