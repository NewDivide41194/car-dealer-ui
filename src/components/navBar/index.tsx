import ThemeSwitch from "../elements/themeSwitch";
import SearchInput from "../input/searchInput";

const NavBar = () => {
  return (
    <nav className="flex justify-between flex-wrap items-center py-2 px-4 dark:bg-gray-800 bg-gray-200 dark:text-white">
      <p className="text-3xl font-bold dark:text-gray-300 text-gray-800">
        Car Dealer
      </p>
      <SearchInput />
      <ThemeSwitch />
    </nav>
  );
};

export default NavBar;
