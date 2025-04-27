"use client";
import { RxDashboard } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { LuClipboardList } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function SideBar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { darkMode } = useTheme();
  return (
    <>
      <aside
        className={`${
          isOpen ? "fixed z-10 top-0 h-screen" : "sticky top-0 h-screen"
        } transition-all`}
      >
        <div
          className={`transition-all drop-shadow-lg drop-shadow-indigo-500/50  duration-700  rounded-r-xl ${
            isOpen ? "w-64 lg:w-80" : "w-24"
          } ${darkMode ? "bg-[#08183e]" : "bg-[#08318e]"}`}
        >
          {/* w-64 lg:w-80 */}
          <div className="flex justify-center min-h-screen">
            <div className="my-7">
              <div
                className="mt-4 gap-4 flex justify-center items-center p-2 cursor-pointer"
                onClick={onClose}
              >
                <Image
                  src="/logo-img.svg"
                  width={isOpen ? 70 : 40}
                  height={isOpen ? 70 : 40}
                  alt="Picture of the author"
                />
                {isOpen ? (
                  <div className="text-lg md:text-xl text-white">
                    Qubic Ball
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Link href="/dashboard">
                <div
                  className={`mt-12 gap-4 flex items-center ${
                    pathname == "/dashboard"
                      ? darkMode
                        ? "border-[#08183e] border-2 border-l-white"
                        : "border-[#08318e] border-2 border-l-white"
                      : ""
                  } ${!isOpen ? "justify-center" : "justify-start"}`}
                >
                  <RxDashboard color="white" size={24} />
                  {isOpen ? (
                    <div className="text-sm md:text-md text-white">
                      Dashboard
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
              <Link href="/post">
                <div
                  className={`mt-12 gap-4 flex items-center ${
                    pathname == "/post"
                      ? darkMode
                        ? "border-[#08183e] border-2 border-l-white"
                        : "border-[#08318e] border-2 border-l-white"
                      : ""
                  } ${!isOpen ? "justify-center" : "justify-start"}`}
                >
                  <LuClipboardList color="white" size={24} />
                  {isOpen ? (
                    <div className="text-sm md:text-md text-white">Posts</div>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
      {/* <div
        className={`fixed h-screen transition-all duration-300 bg-[#08318e] ${
          isOpen ? "w-1/6" : "w-16"
        } shadow-xl rounded-r-xl`}
      > */}

      {/* </div> */}
    </>
  );
}
