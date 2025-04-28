"use client";
import { useEffect, useState } from "react";
import Table from "@/components/table/tableRegular";
import { IoIosSearch, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";

type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
};

export default function Post() {
  const [post, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<{ key: keyof Post; header: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { darkMode } = useTheme();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPost(data);
        if (data.length) {
          const dynamicColumns = (Object.keys(data[0]) as (keyof Post)[]).map(
            (key) => ({
              key,
              header: key.charAt(0).toUpperCase() + key.slice(1),
            })
          );
          dynamicColumns.shift();
          setColumns(dynamicColumns);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  const filteredPosts = post.filter((array) =>
    Object.values(array).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedPost = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <div className="">
            <form className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute z-1 inset-y-0 start-0 flex items-center ps-3">
                  <IoIosSearch size={24} color={darkMode ? "white" : "black"} />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className={`${
                    darkMode
                      ? "bg-gray-900 text-white border border-blue-100 focus:border-sky-100 focus:outline focus:outline-sky-100"
                      : "text-gray-700 bg-gray-50 border border-blue-100 focus:border-sky-500 focus:outline focus:outline-sky-500"
                  } block w-full p-2 ps-10 text-sm  rounded-lg`}
                  placeholder="Search ..."
                  required
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <Table<Post> data={paginatedPost} columns={columns} loading={loading} />
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex flex-col md:flex-row justify-end items-center gap-5 p-5">
            <div>
              <select
                id="small"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className={`${
                  darkMode
                    ? "bg-gray-900 border border-blue-100 focus:border-sky-500 focus:outline focus:outline-sky-500"
                    : "text-gray-700 bg-gray-50 border border-blue-100 focus:border-sky-500 focus:outline focus:outline-sky-500"
                } block  p-2 not-visited:text-sm  rounded-lg `}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            <div className="col-span-12 justify-end flex items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${
                  darkMode ? "bg-gray-900 border" : "bg-blue-500 text-white"
                } z-1 p-1 md:p-2 rounded disabled:opacity-50 cursor-pointer`}
              >
                <IoIosArrowBack />
              </button>
              <span
                className={`${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm md:text-md mx-3`}
              >
                Page {currentPage} of{" "}
                {Math.ceil(filteredPosts.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredPosts.length / itemsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredPosts.length / itemsPerPage)
                }
                className={`${
                  darkMode ? "bg-gray-900 border" : "bg-blue-500 text-white"
                } z-1 p-1 md:p-2 rounded disabled:opacity-50 cursor-pointer`}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
