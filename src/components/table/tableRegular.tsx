// import Modal from "../Modal/addUser";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type TableProps<T> = {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
  }[];
  loading: Boolean;
  onEdit?: (item: T) => void;
};

export default function Table<T>({
  data,
  columns,
  onEdit,
  loading,
}: TableProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode } = useTheme();
  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const renderAddress = (address: any) => {
    if (!address) return "-";
    return (
      <div className="flex flex-col text-sm">
        <span>
          <strong>Street:</strong> {address.street}
        </span>
        <span>
          <strong>Suite:</strong> {address.suite}
        </span>
        <span>
          <strong>City:</strong> {address.city}
        </span>
        <span>
          <strong>Zipcode:</strong> {address.zipcode}
        </span>
        {address.geo && (
          <span>
            <strong>Geo:</strong> Lat: {address.geo.lat}, Lng: {address.geo.lng}
          </span>
        )}
      </div>
    );
  };
  const renderCompany = (company: any) => {
    if (!company) return "-";
    return (
      <div className="flex flex-col text-sm">
        <span>
          <strong>Name:</strong> {company.name}
        </span>
        <span>
          <strong>Catch Phrase:</strong> {company.catchPhrase}
        </span>
        <span>
          <strong>BS:</strong> {company.bs}
        </span>
      </div>
    );
  };
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const router = useRouter();
  return (
    <>
      {loading ? (
        <div role="status" className="animate-pulse">
          <div className="h-1.5 w-1/6 bg-gray-300 rounded-full dark:bg-blue-700 max-w-[640px] mb-2.5 mx-auto"></div>
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead
              className={`${
                darkMode ? "bg-[#1F2937]" : "bg-blue-700"
              } text-xs uppercase text-white`}
            >
              <tr>
                {columns.map((column) => (
                  <th key={column.key as any} className="px-6 py-3">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    darkMode
                      ? "bg-gray-900 hover:bg-blue-50 hover:text-black"
                      : "text-blue-950 even:bg-gray-50  border-b border-gray-200 hover:bg-blue-50"
                  } cursor-pointer`}
                  onClick={
                    isDashboard
                      ? () => {
                          sessionStorage.setItem(
                            "user-detail",
                            JSON.stringify(row)
                          );
                          router.push(`/user/${(row as any).id}`);
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={column.key as any}
                      className="p-2 border-b border-gray-200 align-top"
                    >
                      {column.key === "address"
                        ? renderAddress((row as any).address)
                        : column.key === "company"
                        ? renderCompany((row as any).company)
                        : typeof row[column.key] === "object"
                        ? JSON.stringify(row[column.key])
                        : String(row[column.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
