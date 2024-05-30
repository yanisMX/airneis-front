"use client";

import CategoriesBulkDeleteModal from "@/app/components/dashboard/categories/CategoriesBulkDeleteModal";
import CategoriesDeleteModal from "@/app/components/dashboard/categories/CategoriesDeleteModal";
import CategoriesFiltersModal from "@/app/components/dashboard/categories/CategoriesFiltersModal";
import CategoriesPagination from "@/app/components/dashboard/categories/CategoriesPagination";
import CategoriesSearch from "@/app/components/dashboard/categories/CategoriesSearch";
import { Category, CategoryFilters, CategoryPagination } from "@/app/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Categories() {
  const defaultItemsPerPageLimit = 20;
  const categoryMaxDescLength = 150;

  const [isFetching, setFetching] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [pagedCategories, setPagedCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [categoryPagination, setCategoryPagination] = useState<CategoryPagination>({ categoryCount: 0, totalPages: 0, limit: defaultItemsPerPageLimit, page: 1 });
  const [filters, setFilters] = useState<CategoryFilters>({ sort: undefined, order: undefined, limit: defaultItemsPerPageLimit, page: 1 });
  const [areFiltersActive, setFiltersActive] = useState(false);

  const fetchCategories = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories");
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des catégories.</span>);
    } finally {
      setFetching(false);
    }
  }

  const filter = (key: string) => () => {
    const tempFilters = filters;

    if (tempFilters.sort === key) {
      if (tempFilters.order === "asc") {
        tempFilters.order = "desc";
      } else if (tempFilters.order === "desc") {
        tempFilters.sort = undefined;
        tempFilters.order = undefined;
      }
    } else {
      tempFilters.sort = key as any;
      tempFilters.order = "asc";
    }

    setFilters({ ...tempFilters, page: 1 });
  }

  const getPage = (categories: Category[], pagination: CategoryPagination) => {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    return categories.slice(start, end);
  }

  const filterCategories = () => {
    let filtered = categories;

    if (filters.search) {
      filtered = filtered.filter((category) => category.name.toLowerCase().includes(filters.search!.toLowerCase()));
    }

    if (filters.sort && filters.order) {
      filtered = filtered.sort((a, b) => {
        if (filters.sort === "id") {
          return filters.order === "asc" ? a.id - b.id : b.id - a.id;
        }

        if (filters.sort === "name") {
          return filters.order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }

        if (filters.sort === "createdAt") {
          return filters.order === "asc" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt);
        }

        if (filters.sort === "updatedAt") {
          return filters.order === "asc" ? a.updatedAt.localeCompare(b.updatedAt) : b.updatedAt.localeCompare(a.updatedAt);
        }

        return 0;
      });
    }

    if (filters.sort === undefined || filters.order === undefined) {
      filtered = filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }

  const processPagination = (categories: Category[]) => {
    const totalPages = Math.ceil(categories.length / filters.limit);
    const tempCategoryPagination: CategoryPagination = { categoryCount: categories.length, limit: categoryPagination.limit, page: 1, totalPages };

    if (tempCategoryPagination.limit !== filters.limit) {
      tempCategoryPagination.limit = filters.limit;
    }

    setCategoryPagination(tempCategoryPagination);
    setPagedCategories(getPage(categories, tempCategoryPagination));
  };

  useEffect(() => {
    setFiltersActive(
      filters.sort !== undefined ||
      filters.order !== undefined ||
      filters.search !== undefined ||
      filters.limit !== defaultItemsPerPageLimit
    );
  }, [filters]);

  useEffect(() => {
    const filtered = filterCategories();
    processPagination(filtered);
  }, [categories, filters]);

  useEffect(() => {
    const filtered = filterCategories();
    setPagedCategories(getPage(filtered, categoryPagination));
  }, [categoryPagination]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const tableHeaders = [
    { key: "id", label: "Id", sortable: true, responsive: true },
    { key: "name", label: "Nom", sortable: true, responsive: false },
    { key: "actions", label: "Actions", responsive: true }
  ];

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-semibold">Catégories</h1>

            <button className="btn btn-outline opacity-40 btn-xs p-1" onClick={() => fetchCategories()}>
              <i className="fa-solid fa-sync"></i>
            </button>
          </div>

          <div className="hidden md:block">
            <CategoriesSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
          </div>

          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-bottom">
              <button tabIndex={0} role="button" className="btn btn-outline btn-sm m-1" disabled={selectedCategories.length === 0}>
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

            <Link href={"/dashboard/categories/new"} className="btn btn-primary btn-sm">
              <i className="fa-solid fa-plus"></i><span>Nouvelle<span className="hidden xl:inline"> catégorie</span></span>
            </Link>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <CategoriesSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
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

                          setSelectedCategories((e.target as HTMLInputElement).checked ? categories : []);
                        }
                      } />
                    </label>
                  </th>
                  {
                    tableHeaders.map((header, index) => (
                      <th key={index} className={"whitespace-nowrap px-2 " + (header.responsive ? "hidden lg:table-cell" : "")}>
                        {header.sortable ?
                          <button className="btn btn-xs btn-ghost hidden lg:inline-block" onClick={filter(header.key)}>
                            <span className="me-1">{header.label}</span>
                            {header.key === filters.sort ?
                              filters.order === "asc" ? <i className="fa-solid fa-arrow-up-short-wide"></i> : <i className="fa-solid fa-arrow-down-wide-short"></i> : ""}
                          </button> : <span className="hidden lg:inline">{header.label}</span>
                        }
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
                          <div className="avatar self-start">
                            <div className="mask mask-squircle w-12 h-12">
                              <div className="skeleton h-12 w-12"></div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2"><div className="skeleton h-4 w-32"></div></div>
                            <div className="opacity-50"><div className="skeleton h-3 w-48"></div></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <div className="skeleton h-4 w-12"></div>
                          <div className="skeleton h-4 w-12"></div>
                        </div>
                      </td>
                    </tr>
                  </>
                  ) :
                    pagedCategories.map((category) => (
                      <tr key={category.id}>
                        <th className="whitespace-nowrap pe-0 w-12">
                          <label>
                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary border-gray-300" onChange={(e) => {
                              if ((e.target as HTMLInputElement).checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter((p) => p.id !== category.id));
                              }
                            }} />
                          </label>
                        </th>
                        <td className="whitespace-nowrap hidden lg:table-cell">{category.id}</td>
                        <td className="ps-0 xl:ps-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar self-start">
                              <div className="mask mask-squircle w-12 h-12">
                                <Link href={"/dashboard/categories/" + category.id}>
                                  <Image width="64" height="64" src={category.thumbnail ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + category.thumbnail.filename : "/product-placeholder.png"} alt={category.name} />
                                </Link>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-bold"><Link href={"/dashboard/categories/" + category.id}>{category.name}<span className="ms-1 font-normal opacity-50">#{category.id}</span></Link></div>
                              <div className="text-sm">
                                <div className="opacity-50">
                                  {category.description ? category.description.substring(0, categoryMaxDescLength) + (category.description.length > categoryMaxDescLength ? "..." : "") : "Aucune description"}
                                </div>
                              </div>
                            </div>
                            <div className="lg:hidden">
                              <button className="self-end btn btn-xs text-white bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600" onClick={() => {
                                const element = document.getElementById("delete-category-" + category.id);
                                (element as HTMLDialogElement).showModal();
                              }}>
                                <i className="fa-solid fa-trash-can w-full 2xl:w-auto"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap hidden lg:table-cell">
                          <div className="flex flex-row gap-2">
                            <Link href={"/dashboard/categories/" + category.id} className="btn btn-primary btn-xs w-auto">
                              <i className="fa-solid fa-eye"></i>Détails
                            </Link>

                            <button className="flex-nowrap btn btn-outline btn-xs text-red-500 border-red-500 hover:text-red-50 hover:border-red-500 hover:bg-red-500" onClick={() => {
                              const element = document.getElementById("delete-category-" + category.id);
                              (element as HTMLDialogElement).showModal();
                            }}>
                              <i className="fa-solid fa-trash-can w-auto"></i>Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-0 lg:py-6 xl:p-0 xl:mt-6">
        <CategoriesPagination pagination={categoryPagination} setPagination={setCategoryPagination} filters={filters} setFilters={setFilters} />
      </div>

      <CategoriesFiltersModal id="categories-filters" filters={filters} defaultItemsPerPageLimit={defaultItemsPerPageLimit} setFilters={setFilters} fetchCategories={fetchCategories} />
      <CategoriesBulkDeleteModal id="bulk-delete-modal" categories={selectedCategories} fetchCategories={fetchCategories} />
      {categories.map((category) => <CategoriesDeleteModal key={category.id} id={"delete-category-" + category.id} category={category} fetchCategories={fetchCategories} />)}
    </>
  )
}