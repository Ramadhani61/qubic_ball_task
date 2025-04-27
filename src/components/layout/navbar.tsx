import { usePathname } from "next/navigation";
import { LuText } from "react-icons/lu";
import { useTheme } from "@/context/ThemeContext";
import { PiMoonLight } from "react-icons/pi";
import { RiSunLine } from "react-icons/ri";
interface Navbar {
  showDrawer: Boolean;
  setShowDrawer: any;
}
const Navbar = (props: Navbar) => {
  const pathname = usePathname();
  const pathNameToTitle: Record<string, string> = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/user": "User List",
    "/post": "Post",
  };
  const { darkMode, toggleDarkMode } = useTheme(); // << Panggil dari Context
  let title = pathNameToTitle[pathname] || "Page";

  if (pathname.startsWith("/user/")) {
    title = "Detail User";
  }
  return (
    <div className="mt-8 px-4 w-full">
      <div
        className={`${
          darkMode ? "dark:bg-gray-900" : "bg-white"
        } h-16 border-left transition-colors rounded-xl flex items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-4 mx-5">
          {/* <div className="cursor">
            <button
              onClick={() => props?.setShowDrawer(!props?.showDrawer)}
              className="cursor-pointer"
            >
              <LuText color={`${!darkMode ? "black" : "white"}`} />
            </button>
          </div> */}
          <div className={`${darkMode ? 'text-white':'text-gray-600' }text-xl font-medium capitalize`}>
            {title}
          </div>
        </div>
        <div className="flex items-center mx-5">
          <button onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <PiMoonLight color="white" size={24} />
            ) : (
              <RiSunLine color="black" size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
