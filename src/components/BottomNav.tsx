export function BottomNav({ activeNav, setActiveNav, onExportClick }: { activeNav: string, setActiveNav: (nav: string) => void, onExportClick: () => void }) {
  const navItems = [
    { id: 'build', icon: 'edit_note', label: 'Build' },
    { id: 'export', icon: 'picture_as_pdf', label: 'Export' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe pt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-2xl pb-6">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => {
            if (item.id === 'export') {
              onExportClick();
            } else {
              setActiveNav(item.id);
            }
          }}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 active:scale-90 duration-200 ${
            activeNav === item.id
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
              : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">{item.icon}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
