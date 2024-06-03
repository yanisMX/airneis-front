"use client";

import OrdersPagination from "@/app/components/dashboard/orders/OrdersPagination";
import { MediaQuery, Order, OrderPagination, OrderQuery, OrderStatusLabels } from "@/app/interfaces/interfaces";
import { formatDateString } from "@/app/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Orders() {
  const router = useRouter();

  const defaultItemsPerPageLimit = 20;

  const [isFetching, setFetching] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const [orderPagination, setOrderPagination] = useState<OrderPagination>({ page: 1, totalPages: 1, orderCount: 0, limit: defaultItemsPerPageLimit });
  const [filters, setFilters] = useState<OrderQuery>({ limit: defaultItemsPerPageLimit });

  const [areFiltersActive, setFiltersActive] = useState(false);

  const generateQueryString = (params: MediaQuery): string => {
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

  const fetchOrders = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/orders?" + generateQueryString(filters));
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setOrders(data.orders);
      setOrderPagination({ ...data });
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des médias.</span>);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchOrders();

    const _filters = { ...filters };
    delete _filters.page;
    delete _filters.limit;

    if (Object.keys(_filters).length > 0) {
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }
  }, [filters]);

  const tableHeaders = [
    { key: "id", label: "Id", sortable: false, responsive: true },
    { key: "user", label: "Utilisateur", sortable: false, responsive: true },
    { key: "productCount", label: "Produits", sortable: false, responsive: true },
    { key: "status", label: "Status", sortable: false, responsive: true },
    { key: "createdAt", label: "Date de création", sortable: false, responsive: true },
    { key: "actions", label: "Actions", responsive: true }
  ];

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-semibold">Commandes</h1>

            <button className="btn btn-outline opacity-40 btn-xs p-1" onClick={() => fetchOrders()}>
              <i className="fa-solid fa-sync"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow lg:rounded-xl border overflow-hidden">
        <div className="h-full overflow-y-scroll">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  {
                    tableHeaders.map((header, index) => (
                      <th key={index} className={"whitespace-nowrap px-2 " + (header.responsive ? "hidden xl:table-cell" : "")}>
                        <span>{header.label}</span>
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  isFetching ? Array.from({ length: 8 }).map((_, index) => <>
                    <tr key={index}>
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
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap hidden xl:table-cell">
                          <span className="select-none">#</span>
                          <Link href={"/dashboard/orders/" + order.id}>{order.id}</Link>
                        </td>
                        <td className="ps-0 xl:ps-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full px-4 xl:px-0">
                              <div className="font-bold xl:hidden">
                                <Link href={"/dashboard/orders/" + order.id}><span className="select-none">Commande #</span>{order.id}</Link>
                              </div>

                              <div className="xl:hidden mb-2">
                                {order.products.length} produits, {order.products.reduce((acc, product) => acc + product.quantity, 0)} articles
                              </div>

                              <div className="font-bold max-w-xs md:max-w-lg text-ellipsis overflow-hidden">
                                {
                                  order.user ? (
                                    <Link href={"/dashboard/users/" + order.user.id}>
                                      <span className="font-normal">{order.user.name}</span>
                                    </Link>
                                  ) : (
                                    <span className="opacity-50">Utilisateur supprimé</span>
                                  )
                                }
                              </div>

                              <div className="text-sm">
                                <div className="grid grid-cols-2 md:w-2/3">
                                  {order.user && <p className="text-xs my-1">
                                    <span className="text-nowrap">
                                      <span className="font-semibold me-1">Email :</span>
                                      <Link href={"mailto:" + order.user.email}>{order.user.email}</Link>
                                    </span>
                                  </p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap hidden xl:table-cell">
                          <Link href={"/dashboard/orders/" + order.id}>
                            {order.products.length} produits, {order.products.reduce((acc, product) => acc + product.quantity, 0)} articles
                          </Link>
                        </td>
                        <td className="whitespace-nowrap hidden xl:table-cell">{OrderStatusLabels[order.status]}</td>
                        <td className="whitespace-nowrap hidden xl:table-cell">{formatDateString(order.createdAt)}</td>
                        <th className="whitespace-nowrap hidden xl:table-cell">
                          <div className="flex flex-col 2xl:flex-row px-3 gap-1 2xl:gap-2">
                            <Link href={"/dashboard/orders/" + order.id} className="btn btn-primary btn-xs w-auto flex-nowrap">
                              <i className="fa-solid fa-eye"></i><span className="hidden xl:inline">Détails</span>
                            </Link>
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
        <OrdersPagination pagination={orderPagination} filters={filters} setFilters={setFilters} />
      </div>
    </>
  )
}