import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, logoutUser } = useAuth();

  const handleNavbarMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlelogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 sticky top-0 start-0 end-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:p-2">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse mx-2"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white text-[#2B3A67] py-2 px-4 rounded-full font-bold">
                A
              </span>
              <h2 className="font-semibold text-white">Authentication App</h2>
            </div>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={handleNavbarMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          <div className="flex items-center justify-between gap-x-3">
            <ul className="font-medium flex p-4 md:p-0 mt-4 md:flex-row items-center md:space-x-8 rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!token && (
                <>
                  <li>
                    <Link
                      to={"register"}
                      className="block py-2 font-semibold px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#2B3A67] md:p-0 dark:text-white md:dark:hover:text-[#2B3A67] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"login"}
                      className="block py-2 font-semibold px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#2B3A67] md:p-0 dark:text-white md:dark:hover:text-[#2B3A67] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              {token && (
                <li>
                  <Link
                    to={"login"}
                    className="block py-2 font-semibold px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#2B3A67] md:p-0 dark:text-white md:dark:hover:text-[#2B3A67] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={handlelogout}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
