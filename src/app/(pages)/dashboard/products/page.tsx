"use client";

import ProductsSearch from "@/app/components/dashboard/products/ProductsSearch";
import { useAuth } from "@/app/context/AuthContext";
import { Category, Material, Product, ProductPagination, ProductQuery } from "@/app/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductsBulkDeleteModal from "../../../components/dashboard/products/ProductsBulkDeleteModal";
import ProductsDeleteModal from "../../../components/dashboard/products/ProductsDeleteModal";
import ProductsFiltersModal from "../../../components/dashboard/products/ProductsFiltersModal";
import ProductsPagination from "../../../components/dashboard/products/ProductsPagination";

export default function Products() {
  const { user } = useAuth();

  const defaultItemsPerPageLimit = 20;
  const productMaxDescLength = 150;

  const [isFetching, setFetching] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [productPagination, setProductPagination] = useState<ProductPagination>({ page: 1, totalPages: 1, productCount: 0, limit: defaultItemsPerPageLimit });
  const [filters, setFilters] = useState<ProductQuery>({ limit: defaultItemsPerPageLimit });

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
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

  const fetchProducts = async () => {
    setSelectedProducts([]);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products?" + generateQueryString(filters), {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setProducts(data.products);
      setProductPagination({ ...data });
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des produits.</span>);
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories", {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des catégories.</span>);
    }
  }

  const fetchMaterials = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials", {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setMaterials(data.materials);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des matériaux.</span>);
    }
  }

  async function fetchAll() {
    setFetching(true);
    await fetchProducts();
    await fetchCategories();
    await fetchMaterials();
    setFetching(false);
  }

  useEffect(() => {
    fetchAll();

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
    { key: "id", label: "Id", sortable: true, responsive: true },
    { key: "name", label: "Nom", sortable: true, responsive: false },
    { key: "category", label: "Catégorie", sortable: true, responsive: true },
    { key: "price", label: "Prix", sortable: true, responsive: true },
    { key: "stock", label: "Stock", sortable: true, responsive: true },
    { key: "actions", label: "Actions", responsive: true }
  ];

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

    setFilters({ ...tempFilters, page: undefined });
  }

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-semibold">Produits</h1>

            <button className="btn btn-outline opacity-40 btn-xs p-1" onClick={() => fetchAll()}>
              <i className="fa-solid fa-sync"></i>
            </button>
          </div>

          <div className="hidden md:block">
            <ProductsSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
          </div>

          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-bottom">
              <button tabIndex={0} role="button" className="btn btn-outline btn-sm m-1" disabled={selectedProducts.length === 0}>
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

            <Link href={"/dashboard/products/new"} className="btn btn-primary btn-sm">
              <i className="fa-solid fa-plus"></i>Nouveau<span className="hidden xl:inline"> produit</span>
            </Link>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <ProductsSearch filters={filters} setFilters={setFilters} areFiltersActive={areFiltersActive} />
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

                          setSelectedProducts((e.target as HTMLInputElement).checked ? products : []);
                        }
                      } />
                    </label>
                  </th>
                  {
                    tableHeaders.map((header, index) => (
                      <th key={index} className={"whitespace-nowrap px-2 " + (header.responsive ? "hidden xl:table-cell" : "")}>
                        {header.sortable ?
                          <button className="btn btn-xs btn-ghost hidden xl:inline-block" onClick={filter(header.key)}>
                            <span className="me-1">{header.label}</span>
                            {header.key === filters.sort ?
                              filters.order === "asc" ? <i className="fa-solid fa-arrow-up-short-wide"></i> : <i className="fa-solid fa-arrow-down-wide-short"></i> : ""}
                          </button> : <span className="hidden xl:inline">{header.label}</span>
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
                      <td><div className="skeleton h-4 w-24"></div></td>
                      <td><div className="skeleton h-4 w-12"></div></td>
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
                    products.map((product) => (
                      <tr key={product.id}>
                        <th className="whitespace-nowrap pe-0 w-12">
                          <label>
                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary border-gray-300" onChange={(e) => {
                              if ((e.target as HTMLInputElement).checked) {
                                setSelectedProducts([...selectedProducts, product]);
                              } else {
                                setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
                              }
                            }} />
                          </label>
                        </th>
                        <td className="whitespace-nowrap hidden xl:table-cell">{product.id}</td>
                        <td className="ps-0 xl:ps-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar self-start">
                              <div className="mask mask-squircle w-12 h-12">
                                <Link href={"/dashboard/products/" + product.id}>
                                  <Image width="64" height="64" src={product.images[0] ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + product.images[0].filename : "/product-placeholder.png"} alt={product.name} />
                                </Link>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="font-bold"><Link href={"/dashboard/products/" + product.id}>{product.name}<span className="ms-1 font-normal opacity-50">#{product.id}</span></Link></div>
                              <div className="text-sm">
                                <div className="opacity-50">
                                  {product.description ? product.description.substring(0, productMaxDescLength) + (product.description.length > productMaxDescLength ? "..." : "") : "Aucune description"}
                                </div>
                                <div className="mt-3 xl:hidden">
                                  <div className="grid grid-cols-2 mb-2 md:w-2/3">
                                    <p className="text-xs"><span className="font-semibold me-1">Prix :</span>{product.price}</p>
                                    <p className="text-xs"><span className="font-semibold me-1">Stock :</span>{product.stock}</p>
                                  </div>
                                  <div className="flex">
                                    <div className="flex flex-col flex-1">
                                      <p className="text-xs col-span-full"><span className="font-semibold me-1">Catégorie :</span>{product.category?.name ?? <span className="opacity-50">Aucune</span>}</p>
                                      <p className="text-xs col-span-full"><span className="font-semibold me-1">Matériaux :</span>
                                        {product.materials.map((material) => material.name).join(", ") || <span className="opacity-50">Aucun</span>}
                                      </p>
                                    </div>

                                    <button className="self-end btn btn-xs text-white bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600" onClick={() => {
                                      const element = document.getElementById("delete-product-" + product.id);
                                      (element as HTMLDialogElement).showModal();
                                    }}>
                                      <i className="fa-solid fa-trash-can w-full 2xl:w-auto"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap hidden xl:table-cell">
                          {product.category ? <Link href={"/dashboard/categories/" + product.category.id}>{product.category.name}</Link> : <i className="opacity-50">Aucune catégorie</i>}
                        </td>
                        <td className="whitespace-nowrap hidden xl:table-cell">{product.price} €</td>
                        <td className="whitespace-nowrap hidden xl:table-cell">{product.stock}</td>
                        <th className="whitespace-nowrap hidden xl:table-cell">
                          <div className="flex flex-col 2xl:flex-row px-3 gap-1 2xl:gap-2">
                            <Link href={"/dashboard/products/" + product.id} className="btn btn-primary btn-xs w-full 2xl:w-auto">
                              <i className="fa-solid fa-eye"></i><span className="hidden xl:inline">Détails</span>
                            </Link>

                            <button className="flex-nowrap btn btn-outline btn-xs text-red-500 border-red-500 hover:text-red-50 hover:border-red-500 hover:bg-red-500" onClick={() => {
                              const element = document.getElementById("delete-product-" + product.id);
                              (element as HTMLDialogElement).showModal();
                            }}>
                              <i className="fa-solid fa-trash-can w-full 2xl:w-auto"></i><span className="hidden xl:inline">Supprimer</span>
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
        <ProductsPagination pagination={productPagination} filters={filters} setFilters={setFilters} />
      </div>

      <ProductsFiltersModal id="products-filters" filters={filters} categories={categories} materials={materials} defaultItemsPerPageLimit={defaultItemsPerPageLimit} setFilters={setFilters} fetchProducts={fetchProducts} />
      <ProductsBulkDeleteModal id="bulk-delete-modal" products={selectedProducts} fetchProducts={fetchProducts} />
      {products.map((product) => <ProductsDeleteModal key={product.id} id={"delete-product-" + product.id} product={product} fetchProducts={fetchProducts} />)}
    </>
  )
}