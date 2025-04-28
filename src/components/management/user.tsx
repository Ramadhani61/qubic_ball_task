import { useEffect, useState } from "react";
import Table from "@/components/table/tableRegular";
import { IoIosSearch, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";

type User = {
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
};

export default function User() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<{ key: keyof User; header: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<keyof User | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        if (data.length) {
          const dynamicColumns = (Object.keys(data[0]) as (keyof User)[]).map(
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
    fetchUsers();
  }, []);
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
  const paginatedUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div>
        <div className="flex justify-end mb-4 gap-2">
          <div className="">
            <select
              className={`${
                darkMode
                  ? "bg-gray-900 rounded-lg border border-blue-100 focus:border-sky-100 focus:outline focus:outline-sky-100"
                  : "text-gray-700 rounded-lg bg-gray-50 border border-blue-100 focus:border-sky-500 focus:outline focus:outline-sky-500"
              } p-2 text-sm`}
              value={sortField}
              onChange={(e) => setSortField(e.target.value as keyof User)}
            >
              <option>Sort by</option>
              {columns.map((col) => (
                <option key={col.key} value={col.key}>
                  {col.header}
                </option>
              ))}
            </select>
          </div>
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
        <Table<User>
          data={paginatedUsers}
          columns={columns}
          loading={loading}
        />
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
                {Math.ceil(filteredUsers.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredUsers.length / itemsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
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
