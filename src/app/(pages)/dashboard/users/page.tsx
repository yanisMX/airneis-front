"use client";

import UsersBulkDeleteModal from "@/app/components/dashboard/users/UsersBulkDeleteModal";
import UsersDeleteModal from "@/app/components/dashboard/users/UsersDeleteModal";
import UsersFiltersModal from "@/app/components/dashboard/users/UsersFiltersModal";
import UsersPagination from "@/app/components/dashboard/users/UsersPagination";
import UsersSearch from "@/app/components/dashboard/users/UsersSearch";
import { ProductQuery, User, UserPagination, UserQuery } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Users() {
  const defaultItemsPerPageLimit = 20;

  const [isFetching, setFetching] = useState(true);

  const [users, setUsers] = useState<User[]>([]);

  const [productPagination, setProductPagination] = useState<UserPagination>({ page: 1, totalPages: 1, userCount: 0, limit: defaultItemsPerPageLimit });
  const [filters, setFilters] = useState<UserQuery>({ limit: defaultItemsPerPageLimit });

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [areFiltersActive, setFiltersActive] = useState(false);

  const generateQueryString = (params: ProductQuery): string => {
    const queryParts: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Join arrays with commas
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`);
        } else {
          // Append key=value, ensuring proper URL encoding
          const parsedValue = typeof value === "boolean" ? Number(value) : value;
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(parsedValue))}`);
        }
      }
    });
    return queryParts.join("&");
  };

  const fetchUsers = async () => {
    setFetching(true);
    setSelectedUsers([]);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users?" + generateQueryString(filters));
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setUsers(data.users);
      setProductPagination({ ...data });
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des utilisateurs.</span>);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchUsers();

    const _filters = { ...filters };
    delete _filters.page;
    delete _filters.limit;
    delete _filters.search;

    if (Object.keys(_filters).length > 0) {
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }
  }, [filters]);

  const tableHeaders = [
    { key: "id", label: "Id", responsive: true },
    { key: "name", label: "Nom", responsive: false },
    { key: "email", label: "Email", responsive: true },
    { key: "role", label: "Rôle", responsive: true },
    { key: "actions", label: "Actions", responsive: true }
  ];

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-semibold">Utilisateurs</h1>

            <button className="btn btn-outline opacity-40 btn-xs p-1" onClick={() => fetchUsers()}>
              <i className="fa-solid fa-sync"></i>
            </button>
          </div>

          <div className="hidden md:block">
            <UsersSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
          </div>

          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-bottom">
              <button tabIndex={0} role="button" className="btn btn-outline btn-sm m-1" disabled={selectedUsers.length === 0}>
                Actions<span className="hidden xl:inline"> de masse</span><i className="fa-solid fa-caret-down"></i>
              </button>

              <ul tabIndex={0} className="dropdown-content z-[1] menu menu-xs mt-2 p-1 shadow bg-base-100 rounded-lg w-52 border">
                <li>
                  <button className="text-red-500 hover:bg-red-100 hover:text-red-600" onClick={
                    () => {
                      const element = document.getElementById("bulk-delete-modal");
                      (element as HTMLDialogElement).showModal();
                    }
                  }>
                    <i className="fa-solid fa-trash-can"></i>Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <UsersSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
        </div>
      </div>

      <div className="flex-grow lg:rounded-xl border overflow-hidden">
        <div className="h-full overflow-y-scroll">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    <label>
                      <input type="checkbox" className="checkbox checkbox-sm checkbox-primary border-gray-300" onChange={
                        (e) => {
                          const checkboxes = document.querySelectorAll("input[type=checkbox]");
                          checkboxes.forEach((checkbox) => {
                            (checkbox as HTMLInputElement).checked = (e.target as HTMLInputElement).checked;
                          });

                          setSelectedUsers((e.target as HTMLInputElement).checked ? users : []);
                        }
                      } />
                    </label>
                  </th>
                  {
                    tableHeaders.map((header, index) => (
                      <th key={index} className={"whitespace-nowrap px-2 " + (header.responsive ? "hidden xl:table-cell" : "")}>
                        <span className="hidden xl:inline">{header.label}</span>
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  isFetching ? Array.from({ length: 8 }).map((_, index) => <>
                    <tr key={index}>
                      <td><div className="skeleton h-8 w-8"></div></td>
                      <td><div className="skeleton h-4 w-6"></div></td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="mb-2"><div className="skeleton h-4 w-32"></div></div>
                            <div className="opacity-50"><div className="skeleton h-3 w-48"></div></div>
                          </div>
                        </div>
                      </td>
                      <td><div className="skeleton h-4 w-24"></div></td>
                      <td><div className="skeleton h-4 w-12"></div></td>
                      <td>
                        <div className="flex space-x-2">
                          <div className="skeleton h-4 w-12"></div>
                          <div className="skeleton h-4 w-12"></div>
                        </div>
                      </td>
                    </tr>
                  </>
                  ) :
                    users.map((user) => (
                      <tr key={user.id}>
                        <th className="whitespace-nowrap pe-0 w-12">
                          <label>
                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary border-gray-300" onChange={(e) => {
                              if ((e.target as HTMLInputElement).checked) {
                                setSelectedUsers([...selectedUsers, user]);
                              } else {
                                setSelectedUsers(selectedUsers.filter((p) => p.id !== user.id));
                              }
                            }} />
                          </label>
                        </th>
                        <td className="whitespace-nowrap hidden lg:table-cell">{user.id}</td>
                        <td className="ps-0 xl:ps-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <div className="font-bold">
                                <Link href={"/dashboard/users/" + user.id}>
                                  {user.name}
                                  <span className="ms-1 font-normal opacity-50">#{user.id}</span>
                                </Link>
                              </div>
                              <div className="text-xs lg:hidden">
                                <p><span className="font-bold me-1">Email :</span><Link href={"mailto:" + user.email}>{user.email}</Link></p>
                                <p><span className="font-bold me-1">Rôle :</span>{user.role}</p>
                              </div>
                            </div>
                            <div className="lg:hidden">
                              <button className="self-end btn btn-xs text-white bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600" onClick={() => {
                                const element = document.getElementById("delete-user-" + user.id);
                                (element as HTMLDialogElement).showModal();
                              }}>
                                <i className="fa-solid fa-trash-can w-full 2xl:w-auto"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap hidden lg:table-cell"><Link href={"mailto:" + user.email}>{user.email}</Link></td>
                        <td className="whitespace-nowrap hidden lg:table-cell">{user.role}</td>
                        <th className="whitespace-nowrap hidden lg:table-cell">
                          <div className="flex flex-row px-3 gap-1">
                            <Link href={"/dashboard/users/" + user.id} className="btn btn-primary btn-xs w-auto">
                              <i className="fa-solid fa-eye"></i>Détails
                            </Link>

                            <button className="flex-nowrap btn btn-outline btn-xs text-red-500 border-red-500 hover:text-red-50 hover:border-red-500 hover:bg-red-500" onClick={() => {
                              const element = document.getElementById("delete-user-" + user.id);
                              (element as HTMLDialogElement).showModal();
                            }}>
                              <i className="fa-solid fa-trash-can w-auto"></i>Supprimer
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-0 lg:py-6 xl:p-0 xl:mt-6">
        <UsersPagination pagination={productPagination} filters={filters} setFilters={setFilters} />
      </div>

      <UsersFiltersModal id="users-filters" filters={filters} defaultItemsPerPageLimit={defaultItemsPerPageLimit} setFilters={setFilters} fetchUsers={fetchUsers} />
      <UsersBulkDeleteModal id="bulk-delete-modal" users={selectedUsers} fetchUsers={fetchUsers} />
      {users.map((user) => <UsersDeleteModal key={user.id} id={"delete-user-" + user.id} user={user} fetchUsers={fetchUsers} />)}
    </>
  )
}