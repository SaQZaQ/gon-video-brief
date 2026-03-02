export default function Gon() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative flex h-64 w-48 animate-idle items-center justify-center rounded-3xl bg-emerald-100/80 shadow-inner">
        <div className="absolute top-6 h-14 w-14 rounded-full bg-emerald-300" />
        <div className="absolute bottom-8 h-24 w-20 rounded-2xl bg-emerald-400" />
        <span className="absolute bottom-3 text-xs font-medium uppercase tracking-wide text-emerald-900">
          GON Placeholder
        </span>
      </div>
    </div>
  );
}
