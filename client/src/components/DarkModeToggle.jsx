export default function DarkModeToggle() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-black text-white dark:bg-yellow-400 dark:text-black mb-4"
    >
      Toggle Dark Mode
    </button>
  );
}
