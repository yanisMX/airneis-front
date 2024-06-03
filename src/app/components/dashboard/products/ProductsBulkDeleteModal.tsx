import { useAuth } from "@/app/context/AuthContext";
import { Product } from "@/app/interfaces/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductsBulkDeleteModal({ id, products, fetchProducts }: { id: string, products: Product[], fetchProducts: () => void }) {
  const { user } = useAuth();
  const [isFetching, setFetching] = useState(false);

  const deleteProduct = async () => {
    setFetching(true);

    let deletedProducts = 0;
    for (const product of products) {
      if (await deleteProductById(product))
        deletedProducts++;
    }

    closeDialog();
    setFetching(false);

    if (deletedProducts > 0) {
      toast.success(() => <span>{deletedProducts} produit{deletedProducts > 1 ? "s" : ""} a{deletedProducts > 1 ? "ont" : ""} bien été supprimé{deletedProducts > 1 ? "s" : ""}.</span>);
    } else {
      toast.error(() => <span>Aucun produit n&apos;a été supprimé.</span>);
    }

    fetchProducts();
  }

  const deleteProductById = async (product: Product): Promise<boolean> => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products/" + product.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + user?.accessToken,
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      return true;
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la suppression du produit <b>{product.name}</b> <span className="opacity-50">#{product.id}</span>.</span>);
    }

    return false;
  }

  const closeDialog = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  return <>
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box font-normal">
        <h3 className="font-bold text-xl pb-4">Confirmer la suppression</h3>
        <p className="pb-8">Êtes-vous sur de vouloir supprimer <b>{products.length} produit{products.length > 1 ? "s" : ""}</b> ?</p>
        <p>Cette action est irréversible.</p>
        <div className="modal-action">
          <form method="dialog" className="flex">
            <button className="btn btn-sm btn-error text-white me-2" onClick={() => deleteProduct()} disabled={isFetching}>
              {isFetching ? <><span className="loading loading-spinner"></span> Suppression...</> : "Supprimer"}
            </button>
            <button className="btn btn-sm" disabled={isFetching}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}