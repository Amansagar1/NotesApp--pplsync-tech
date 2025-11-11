export default function Fab({
  onClick,
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full
                 bg-fuchsia-500 text-white text-2xl shadow-xl ring-1 ring-white/20
                 transition will-change-transform hover:scale-105 active:scale-95"
    >
      ✎
    </button>
  );
}
