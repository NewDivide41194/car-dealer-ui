import { lazy, memo, Suspense } from "react";

const ThemeSwitch = lazy(() => import("../elements/themeSwitch"));
const SearchInput = lazy(() => import("../input/searchInput"));

const NavBar = () => {
  return (
    <nav className="flex justify-between flex-wrap items-center py-2 px-4 dark:bg-gray-800 bg-gray-300 dark:text-white">
      <p className="text-3xl font-bold dark:text-gray-300 text-gray-800">
        Car Dealer
      </p>
      <Suspense fallback={<div>Loading Nav Components...</div>}>
        <SearchInput />
        <ThemeSwitch />
      </Suspense>
    </nav>
  );
};

export default memo(NavBar);
