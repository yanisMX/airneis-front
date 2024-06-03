import { Category, Image as Media } from "@/app/interfaces/interfaces";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import MediaCreation from "../../MediaCreation";
import { useAuth } from "@/app/context/AuthContext";

export default function ProductCategoryCreationModal({ id, setSelectedCategory, fetchCategories }: { id: string, setSelectedCategory: (category: Category) => void, fetchCategories: () => void }) {
  const { user } = useAuth();
  const [key, setKey] = useState<number>(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<Media | null>(null);

  const [isFetching, setFetching] = useState<boolean>(false);
  const [isUploading, setUploading] = useState<boolean>(false);

  const createCategory = async () => {
    const name = nameRef.current?.value;

    if (!name || name.length < 3) {
      toast.error(() => <span>Le nom du matériau doit être renseigné.</span>);
      return;
    }

    try {
      setFetching(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user?.accessToken,
        },
        body: JSON.stringify({
          name,
          slug: slugRef.current!.value.length > 0 ? slugRef.current?.value : undefined,
          thumbnailId: thumbnail?.id
        })
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      const category = data.category as Category;

      setSelectedCategory(category);
      fetchCategories();

      toast.success(() => <span>La catégorie <b>{category.name}</b> a été créée.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la création de la catégorie.</span>);
    } finally {
      dialogRef.current?.close();
    }
  }

  const onClose = () => {
    setKey(key + 1);

    setFetching(false);
    setUploading(false);
    setThumbnail(null);

    nameRef.current!.value = "";
    slugRef.current!.value = "";
  }

  return <>
    <dialog id={id} ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={() => onClose()}>
      <div className="modal-box font-normal">
        <div>
          <h2 className="font-bold text-2xl mb-4">Créer une catégorie</h2>
        </div>

        <div className="form-control gap-2 mb-4">
          <label className="form-control w-full">
            <div className="label label-text font-bold">Nom</div>
            <input ref={nameRef} type="text" placeholder="Nom de la catégorie" className="input input-sm input-bordered w-full" disabled={isFetching} />
          </label>

          <label className="form-control w-full">
            <div className="label label-text font-bold">Slug</div>
            <input ref={slugRef} type="text" placeholder="Slug" className="input input-sm input-bordered w-full" disabled={isFetching} />
          </label>

          <div className="form-control w-full">
            <div className="label label-text font-bold">Image</div>
            <MediaCreation
              key={key}
              options={{ allowReupload: true }}
              onUploadStart={() => setUploading(true)}
              onUploadError={() => setUploading(false)}
              onUploadComplete={(media: Media) => {
                setUploading(false);
                setThumbnail(media);
              }} />
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex space-x-2">
            <button className="btn btn-sm" onClick={() => dialogRef.current?.close()} disabled={isFetching || isUploading}>Annuler</button>
            <button className="btn btn-sm btn-primary" onClick={() => createCategory()} disabled={isFetching || isUploading}>
              {isFetching ? <><span className="loading loading-spinner"></span> Création...</> : "Créer"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}
