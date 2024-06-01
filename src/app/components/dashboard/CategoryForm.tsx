import { Category, CategoryCreation, Image as Media } from "@/app/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MediaSelectorModal from "./MediaSelectorModal";

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const selectThumbnailRef = useRef<HTMLButtonElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);

  const [descCharCount, setDescCharCount] = useState<number>(category?.description?.length || 0);

  const [isFetching, setFetching] = useState<boolean>(false);

  const [selectedThumbnail, setSelectedThumbnail] = useState<Media | undefined>(category?.thumbnail || undefined);

  const processCategorySave = () => {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const slug = slugRef.current?.value;

    let errors: string[] = [];

    if (!name || name.length === 0) {
      errors.push("Le nom de la catégorie est requise.");
      nameRef.current?.classList.add("input-error");
    }

    if (errors.length > 0) {
      toast.error(() => <span>
        <p className="font-bold mb-2">Un ou plusieurs champs sont incorrects :</p>
        <ul className="list-disc list-inside">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </span>);
      return;
    }

    setFetching(true);

    const rebuiltCategory: CategoryCreation = {
      name: name as string,
      description,
      slug: slug!.length > 0 ? slug : undefined,
      thumbnailId: selectedThumbnail?.id ?? null
    };

    if (category) {
      updateCategory(rebuiltCategory);
    } else {
      createCategory(rebuiltCategory);
    }
  }

  const createCategory = async (category: CategoryCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>La catégorie <b>{data.category.name}</b> a été créée.</span>);
      router.push("/dashboard/categories/" + data.category.id);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la création de la catégorie.</span>);
      setFetching(false);
    }
  }

  const updateCategory = async (editedCategory: CategoryCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories/" + category!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCategory)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>La catégorie <b>{data.category.name}</b> a été mise à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour de la catégorie.</span>);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    const inputs = [nameRef, descriptionRef, slugRef, selectThumbnailRef, createButtonRef];

    for (const input of inputs) {
      if (isFetching) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isFetching]);

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href={"/dashboard/categories"} className="btn btn-neutral btn-circle btn-outline btn-sm">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h1 className="text-3xl font-semibold">
              {
                category ? (<>
                  <span className="sm:hidden">Édit.</span>
                  <span className="hidden sm:inline-block">Édition de la</span>
                </>) : (<>
                  <span className="sm:hidden">Nouv.</span>
                  <span className="hidden sm:inline-block">Nouvelle</span>
                </>)
              }
              <span> catégorie</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn btn-primary btn-sm" ref={createButtonRef} onClick={processCategorySave}>
              {
                isFetching ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    <span>{category ? "Enregistrement" : "Création"}...</span>
                  </>
                ) : (
                  category ? "Enregistrer" : "Créer"
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
              <div className="flex flex-col gap-y-2">
                <label className="form-control w-full">
                  <div className="label label-text">
                    Nom
                    <span className="text-error">*</span>
                  </div>
                  <input
                    ref={nameRef}
                    maxLength={100}
                    onChange={() => nameRef.current?.classList.remove("input-error")}
                    type="text"
                    placeholder="Nom de la catégorie"
                    defaultValue={category?.name}
                    className="input input-sm input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <textarea
                    ref={descriptionRef}
                    maxLength={5000}
                    onChange={(e) => setDescCharCount(e.target.value.length)}
                    className="textarea textarea-bordered h-24"
                    placeholder="Description de la catégorie"
                    defaultValue={category?.description}
                  ></textarea>
                  <div className="label justify-end">
                    <span className="label-text-alt opacity-75">
                      {descCharCount}/{descriptionRef.current?.maxLength || 0}
                    </span>
                  </div>
                </label>

                <label className="form-control w-full">
                  <div className="label label-text">Slug</div>
                  <input
                    ref={slugRef}
                    maxLength={100}
                    onChange={() => slugRef.current?.classList.remove("input-error")}
                    type="text"
                    placeholder="Chemin d'accès"
                    defaultValue={category?.slug}
                    className="input input-sm input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm">Image de fond</p>

                <div className="relative flex justify-center items-center aspect-video rounded-lg overflow-hidden bg-slate-200 border border-gray-300">
                  {
                    selectedThumbnail ? (<>
                      <Image
                        src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + selectedThumbnail.filename}
                        alt={selectedThumbnail.name}
                        width={1280}
                        height={720}
                        className="object-cover blur saturate-150 w-full h-full"
                      />

                      <Image
                        src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + selectedThumbnail.filename}
                        alt={selectedThumbnail.name}
                        width={1280}
                        height={720}
                        className="absolute top-0 left-0 object-contain w-full h-full"
                      />

                      <button
                        className="absolute top-3 right-3 w-7 h-7 btn text-white btn-xs bg-red-500 border-red-600 hover:border-red-600 hover:bg-red-600"
                        onClick={() => setSelectedThumbnail(undefined)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </>) : (
                      <span className="text-center text-sm opacity-60">Aucune image sélectionnée</span>
                    )
                  }
                </div>

                <button
                  ref={selectThumbnailRef}
                  onClick={() => {
                    const modal = document.getElementById("thumbnail-media-selector-modal") as HTMLDialogElement;
                    modal.showModal();
                  }}
                  className="btn btn-sm btn-primary w-full"
                >
                  {selectedThumbnail ? "Choisir une autre" : "Sélectionner une"} image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaSelectorModal id="thumbnail-media-selector-modal" options={{ multiple: false }} onSelect={(medias) => { setSelectedThumbnail(medias[0]); }} />
    </>
  )
};
