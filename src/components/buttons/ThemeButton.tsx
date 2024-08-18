import { useTheme } from 'next-themes';
import * as react from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = react.useState(false);
  react.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <button
        className='transition-all duration-300 p-2'
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        {mounted ? (
          <>{theme === 'light' ? <FaMoon size={40} /> : <FaSun size={40} />}</>
        ) : (
          <FaSun size={40} />
        )}
      </button>
    </>
  );
};

export default ThemeButton;
