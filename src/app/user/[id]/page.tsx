"use client";

import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Widget from "@/components/card/widget";
import { MdOutlineVerified } from "react-icons/md";
import { useParams } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
}

interface UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
  company: Company;
}
interface PostDetail {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const UserDetailPage = () => {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [post, setPost] = useState<PostDetail | null>(null);
  const { id } = useParams();
  const { darkMode } = useTheme();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user-detail");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await res.json();
        setPost(data);
      } catch (error) {
      } finally {
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-4">
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <Widget height="auto" title="Detail">
            <div className="grid grid-cols-12">
              <div className="col-span-12 mb-6">
                <div className={darkMode ? "text-white" : "text-blue-900"}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FaCircleUser size={70} color="gray" />
                      <div className="font-medium">
                        <div className="flex gap-2">
                          <div className="text-xl">{user?.name || "-"} </div>
                          <MdOutlineVerified size={26} color="green" />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.username || "-"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          alert("Maaf, Fitur ini dalam tahap pengembangan")
                        }
                      >
                        <FiEdit
                          color="blue"
                          size={20}
                          className="cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 mb-6">
                <hr className="mx-12 text-gray-300" />
              </div>
              <div className="col-span-12">
                <div
                  className={`${
                    darkMode
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-700"
                  }"p-6  rounded-lg w-full"`}
                >
                  <h3 className="text-lg font-medium mb-4">Profile Info</h3>

                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Address
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {user?.address ? (
                          <>
                            {user.address.street}, {user.address.suite},<br />
                            {user.address.city}, {user.address.zipcode}
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Phone
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {user?.phone || "-"}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Email
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {user?.email || "-"}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Company
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {user?.company?.name || "-"}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Website
                      </div>
                      <div className="mb-2 text-blue-500 text-sm md:text-base">
                        {user?.website || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 mb-6 mt-6">
                <hr className="mx-12 text-gray-300" />
              </div>
              <div className="col-span-12">
                <div
                  className={`${
                    darkMode
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-700"
                  }"p-6  rounded-lg w-full"`}
                >
                  <h3 className="text-lg font-medium mb-4">Post Info</h3>

                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Title
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {post?.title || "-"}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                      <div
                        className={`${
                          darkMode ? "text-white" : "text-gray-600"
                        } "mb-2 font-semibold"`}
                      >
                        Content
                      </div>
                      <div
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-500 "
                        } "mb-2 text-sm md:text-base"`}
                      >
                        {post?.body || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
