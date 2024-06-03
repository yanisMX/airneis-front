"use client";

import OrderAddress from "@/app/components/dashboard/orders/details/OrderAddress";
import { useAuth } from "@/app/context/AuthContext";
import { Order, OrderDto, OrderStatus, OrderStatusLabels } from "@/app/interfaces/interfaces";
import { formatDateString } from "@/app/utils/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function OrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [order, setOrder] = useState<Order>();
  const [status, setStatus] = useState<keyof typeof OrderStatusLabels>("pending");
  const [isFetching, setFetching] = useState<boolean>(true);

  const [isSaving, setSaving] = useState<boolean>(false);

  const processOrderSave = () => {
    setSaving(true);

    const orderData: OrderDto = {
      status: status as OrderStatus
    };

    updateOrder(orderData);
  }

  const updateOrder = async (editedUser: OrderDto) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/orders/" + order!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(editedUser)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>La commande a été mise à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour de l'utilisateur.</span>);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const inputs = [saveButtonRef];

    for (const input of inputs) {
      if (isSaving) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isSaving]);

  const fetchOrder = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/orders/" + id, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setOrder(data.order);
      setStatus(data.order.status);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Commande <span className="opacity-50">#{id}</span> inexistant.</span>);
      router.push("/dashboard/users");
    }
  }

  useEffect(() => {
    fetchOrder(+id);
  }, [id]);

  return (
    <>
      {
        isFetching || !order ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="mb-8 px-5 lg:px-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Link href={"/dashboard/orders"} className="btn btn-neutral btn-circle btn-outline btn-sm">
                    <i className="fa-solid fa-chevron-left"></i>
                  </Link>
                  <h1 className="text-3xl font-semibold">
                    <span className="sm:hidden">Édit.</span>
                    <span className="hidden sm:inline-block">Édition de la</span>
                    <span> commande</span>
                  </h1>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="btn btn-primary btn-sm" ref={saveButtonRef} onClick={processOrderSave}>
                    {
                      isSaving ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        "Enregistrer"
                      )
                    }
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-grow lg:rounded-xl border overflow-hidden">
              <div className="h-full overflow-y-auto">
                <div className="overflow-x-auto p-4 h-full" tabIndex={0}>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-10">

                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-lg">Informations générales</h2>

                        <div className="flex gap-2">
                          <label className="form-control w-full">
                            <div className="label label-text">Id</div>
                            <input type="text" value={order.id} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                          </label>

                          <div className="w-full">
                            <h3 className="label label-text" tabIndex={0}>Status</h3>

                            <div className="dropdown me-1 w-full">
                              <div tabIndex={0} role="button" className="btn btn-xs justify-between items-center w-full">{OrderStatusLabels[status]}<i className="fa-solid fa-chevron-down"></i></div>
                              <ul tabIndex={0} className="dropdown-content z-[1] menu menu-xs p-1 mt-2 border shadow bg-base-100 rounded-lg w-48 lg:w-32">
                                {
                                  Object.keys(OrderStatusLabels).map((statusMap, index) => (
                                    <li key={index} onClick={() => setStatus(statusMap as keyof typeof OrderStatusLabels)} className="menu-item">
                                      <button className={`${statusMap === status ? "font-bold bg-primary-content text-primary" : ""}`}>{OrderStatusLabels[statusMap as keyof typeof OrderStatusLabels]}</button>
                                    </li>

                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <label className="form-control w-full">
                            <div className="label label-text">Utilisateur</div>
                            <input type="text" value={order.user?.name ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                          </label>

                          <label className="form-control w-full">
                            <div className="label label-text">Email</div>
                            <input type="text" value={order.user?.email ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                          </label>
                        </div>

                        <div className="flex gap-2">
                          <label className="form-control w-full">
                            <div className="label label-text">Date de création</div>
                            <input type="text" value={formatDateString(order.createdAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                          </label>

                          <label className="form-control w-full">
                            <div className="label label-text">Dernière mise à jour</div>
                            <input type="text" value={formatDateString(order.updatedAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-lg">Adresse de facturation</h2>

                        <OrderAddress address={order.billingAddress} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-lg">Adresse de livraison</h2>

                        <OrderAddress address={order.shippingAddress} />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-lg">Produits</h2>

                        <div className="overflow-x-auto rounded-lg border border-gray-300">
                          <table className="table w-full">
                            <thead className="bg-base-200">
                              <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                order.products.map((product, index) => (
                                  <tr key={index} className="hover:bg-base-200 hover:bg-opacity-20 transition duration-200 hover:cursor-pointer">
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price} €</td>
                                    <td>{product.quantity}</td>
                                    <td>{(parseFloat(product.price) * product.quantity).toFixed(2)} €</td>
                                  </tr>
                                ))
                              }

                              <tr className="bg-base-200">
                                <td colSpan={4} className="text-right font-semibold">Total</td>
                                <td>{order.products.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0).toFixed(2)} €</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
};
