export default function FormActions({
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <div className="mt-5 flex items-center justify-between ">
      <button
        type="submit"
        className="inline-flex w-40 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      >
        {primaryLabel}
      </button>

      <a
        href={secondaryHref}
        className="w-40 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-slate-200 hover:bg-white/10"
      >
        {secondaryLabel}
      </a>
    </div>
  );
}
