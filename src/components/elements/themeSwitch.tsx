import { JSX, memo, useCallback, useEffect } from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { toggleTheme } from "../../features/themeSlice";

const ThemeSwitch = (): JSX.Element => {
  const darkMode = useAppSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const className = "dark";
    const bodyClass = document.documentElement.classList;
    darkMode ? bodyClass.add(className) : bodyClass.remove(className);
  }, [darkMode]);
  const onThemeSwitch = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={darkMode}
        className="sr-only peer"
        onChange={onThemeSwitch}
      />
      <span
        data-cy={"switch-theme"}
        className="me-3 text-sm text-gray-800 dark:text-gray-500 font-bold dark:font-normal"
      >
        Light
      </span>
      <div className="bg-gray-500 relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
      <span className="ms-3 text-sm text-gray-500 dark:text-gray-300 dark:font-bold">
        Dark
      </span>
    </label>
  );
};

export default memo(ThemeSwitch);
