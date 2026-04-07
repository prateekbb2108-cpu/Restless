export function Header() {
  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">architecture</span>
        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-slate-50">Restless</span>
      </div>
      <button className="text-blue-600 dark:text-blue-400 font-bold text-sm px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-xl active:scale-95 duration-150">
        Create
      </button>
    </header>
  );
}
