import { Category, Image as Media, Material, Product, ProductCreation } from "@/app/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MediaLibraryItem from "./MediaLibraryItem";
import MediaSelectorModal from "./MediaSelectorModal";
import ProductCategoryCreationModal from "./products/new/ProductCategoryCreationModal";
import ProductMaterialCreationModal from "./products/new/ProductMaterialCreationModal";

export default function ProductForm({ product }: { product?: Product }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const priceBoxRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const selectCategoryRef = useRef<HTMLButtonElement>(null);
  const selectMaterialRef = useRef<HTMLButtonElement>(null);
  const selectMediaRef = useRef<HTMLButtonElement>(null);
  const selectBackgroundMediaRef = useRef<HTMLButtonElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);

  const [descCharCount, setDescCharCount] = useState<number>(0);

  const [isFetching, setFetching] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category || undefined);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>(product?.materials || []);
  const [selectedMedias, setSelectedMedias] = useState<Media[]>(product?.images || []);
  const [selectedBackgroundMedia, setSelectedBackgroundMedia] = useState<Media | undefined>(product?.backgroundImage || undefined);

  const processProductSave = () => {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const price = parseFloat(priceRef.current?.value || "");
    const stock = parseInt(stockRef.current?.value || "");
    const priority = parseInt(priorityRef.current?.value || "0");
    const slug = slugRef.current?.value;

    let errors: string[] = [];

    if (!name || name.length === 0) {
      errors.push("Le nom du produit est requis.");
      nameRef.current?.classList.add("input-error");
    }
    if (isNaN(price)) {
      errors.push("Le prix du produit est requis.");
      priceBoxRef.current?.classList.add("input-error");
    }
    if (price < 0) {
      errors.push("Le prix du produit ne peut pas être négatif.");
      priceBoxRef.current?.classList.add("input-error");
    }
    if (isNaN(stock)) {
      errors.push("Le stock du produit est requis.");
      stockRef.current?.classList.add("input-error");
    }
    if (stock < 0) {
      errors.push("Le stock du produit ne peut pas être négatif.");
      stockRef.current?.classList.add("input-error");
    }
    if (isNaN(priority)) {
      errors.push("La priorité du produit est incorrecte.");
      priorityRef.current?.classList.add("input-error");
    }
    if (priority < 0) {
      errors.push("La priorité du produit ne peut pas être négative.");
      priorityRef.current?.classList.add("input-error");
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

    const product: ProductCreation = {
      name: name as string,
      description,
      slug: slug!.length > 0 ? slug : undefined,
      price,
      stock,
      priority,
      categoryId: selectedCategory?.id ?? null,
      materialIds: selectedMaterials.map(material => material.id),
      imageIds: selectedMedias.map(media => media.id),
      backgroundImageId: selectedBackgroundMedia?.id ?? null
    };

    if (product) {
      updateProduct(product);
    } else {
      createProduct(product);
    }
  }

  const createProduct = async (product: ProductCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>Le produit <b>{data.product.name}</b> a été créé.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la création du produit.</span>);
    } finally {
      setFetching(false);
    }
  }

  const updateProduct = async (editedProduct: ProductCreation) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products/" + product!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedProduct)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>Le produit <b>{data.product.name}</b> a été mis à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour du produit.</span>);
    } finally {
      setFetching(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/categories");
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
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/materials");
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
    await fetchCategories();
    await fetchMaterials();
    setFetching(false);
  }

  useEffect(() => {
    const inputs = [nameRef, descriptionRef, priceRef, stockRef, priorityRef, slugRef,
      selectCategoryRef, selectMaterialRef, selectMediaRef, selectBackgroundMediaRef, createButtonRef];

    for (const input of inputs) {
      if (isFetching) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isFetching]);

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <div className="mb-8 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href={"/dashboard/products"} className="btn btn-neutral btn-circle btn-outline btn-sm">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h1 className="text-3xl font-semibold">
              {
                product ? (<>
                  <span className="sm:hidden">Édit.</span>
                  <span className="hidden sm:inline-block">Édition du</span>
                </>) : (<>
                  <span className="sm:hidden">Nouv.</span>
                  <span className="hidden sm:inline-block">Nouveau</span>
                </>)
              }
              <span> produit</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn btn-primary btn-sm" ref={createButtonRef} onClick={processProductSave}>
              {
                isFetching ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    <span>{product ? "Enregistrement" : "Création"}...</span>
                  </>
                ) : (
                  product ? "Enregistrer" : "Créer"
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
                    placeholder="Nom du produit"
                    defaultValue={product?.name}
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
                    placeholder="Description du produit"
                    defaultValue={product?.description}
                  ></textarea>
                  <div className="label justify-end">
                    <span className="label-text-alt opacity-75">
                      {descCharCount}/{descriptionRef.current?.maxLength || 0}
                    </span>
                  </div>
                </label>

                <label className="form-control w-full">
                  <div className="label label-text">
                    Prix
                    <span className="text-error">*</span>
                  </div>
                  <div ref={priceBoxRef} className={"input input-sm input-bordered flex items-center p-0 ps-2 overflow-hidden" + (isFetching ? " input-disabled" : "")}>
                    <span>€</span>
                    <input
                      ref={priceRef}
                      step={0.01}
                      min={0}
                      max={9999999999}
                      onChange={() => priceBoxRef.current?.classList.remove("input-error")}
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      placeholder="0.00"
                      defaultValue={product?.price}
                      className="flex-1 w-1/2 input-error" />
                  </div>
                </label>

                <div className="flex gap-2">
                  <label className="form-control w-full">
                    <div className="label label-text">
                      Stock
                      <span className="text-error">*</span>
                    </div>
                    <input
                      ref={stockRef}
                      step={1}
                      min={0}
                      onChange={() => stockRef.current?.classList.remove("input-error")}
                      type="number"
                      placeholder="Quantité disponible"
                      defaultValue={product?.stock}
                      className="input input-sm input-bordered w-full pe-0" />
                  </label>

                  <label className="form-control w-full">
                    <div className="label label-text">Priorité</div>
                    <input
                      ref={priorityRef}
                      step={1}
                      min={0}
                      onChange={() => priorityRef.current?.classList.remove("input-error")}
                      type="number"
                      placeholder="0"
                      defaultValue={product?.priority}
                      className="input input-sm input-bordered w-full pe-0"
                    />
                  </label>
                </div>

                <div className="flex justify-between gap-2">
                  <div className="form-control w-full">
                    <label className="label label-text">Catégorie</label>

                    <div className="dropdown">
                      <button ref={selectCategoryRef} tabIndex={0} role="button" className="btn btn-xs justify-between w-full border border-gray-300">
                        {selectedCategory?.name || "Aucune"}
                        <i className="fa-solid fa-chevron-down"></i>
                      </button>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm p-0 mt-2 border border-gray-300 shadow bg-base-100 rounded-lg w-full">
                        <div className="px-4 pt-2 pb-2 border-b border-gray-300">
                          <div className="flex items-center">
                            <span className="flex-1 font-bold">Catégories</span>
                            <button className="font-bold btn btn-xs" onClick={() => {
                              const modal = document.getElementById("category-creation-modal") as HTMLDialogElement;
                              modal.showModal();
                            }}>
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div className="max-h-56 overflow-y-auto p-1">
                          <li>
                            <button className={`${selectedCategory === undefined ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedCategory(undefined)}>Aucune</button>
                          </li>

                          {
                            categories.map(category => (
                              <li key={category.id}>
                                <button className={`${selectedCategory?.id === category.id ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedCategory(category)}>{category.name}</button>
                              </li>
                            ))
                          }
                        </div>
                      </ul>
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label label-text">Matériaux</label>

                    <div className="dropdown">
                      <button ref={selectMaterialRef} tabIndex={0} role="button" className="btn btn-xs justify-between w-full border border-gray-300">
                        {selectedMaterials.length == 0 ? "Aucun" : selectedMaterials.length + " matériau" + (selectedMaterials.length > 1 ? "x" : "")}
                        <i className="fa-solid fa-chevron-down"></i>
                      </button>

                      <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm p-0 mt-2 border border-gray-300 shadow bg-base-100 rounded-lg w-full">
                        <div className="px-4 pt-2 pb-2 border-b border-gray-300">
                          <div className="flex items-center">
                            <span className="flex-1 font-bold">Matériaux</span>
                            <button className="font-bold btn btn-xs" onClick={() => {
                              const modal = document.getElementById("material-creation-modal") as HTMLDialogElement;
                              modal.showModal();
                            }}>
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div className="max-h-56 overflow-y-auto p-1">
                          {
                            materials.map(material => (
                              <li key={material.id}>
                                <label className="label cursor-pointer justify-start py-1">
                                  <input type="checkbox" className="checkbox checkbox-xs rounded-md checkbox-primary"
                                    checked={selectedMaterials.some(selectedMaterial => selectedMaterial.id === material.id)}
                                    onChange={(e) => {
                                      if (!(e.target as HTMLInputElement).checked && selectedMaterials.some(selectedMaterial => selectedMaterial.id === material.id)) {
                                        setSelectedMaterials(selectedMaterials.filter(selectedMaterial => selectedMaterial.id !== material.id));
                                      } else if ((e.target as HTMLInputElement).checked && !selectedMaterials.some(selectedMaterial => selectedMaterial.id === material.id)) {
                                        setSelectedMaterials([...selectedMaterials, material]);
                                      }
                                    }} />
                                  <span className="label-text">{material.name}</span>
                                </label>
                              </li>
                            ))
                          }
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>

                <label className="form-control w-full">
                  <div className="label label-text">Slug</div>
                  <input
                    ref={slugRef}
                    maxLength={100}
                    onChange={() => slugRef.current?.classList.remove("input-error")}
                    type="text"
                    placeholder="Chemin d'accès"
                    defaultValue={product?.slug}
                    className="input input-sm input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm">Images</p>

                  <div className="rounded-lg border border-gray-300 overflow-hidden">
                    <div className={"grid gap-2 grid-cols-3 p-4 max-h-96 " + (selectedMedias.length > 6 ? " overflow-y-scroll" : "")}>
                      {
                        selectedMedias.length > 0 ? selectedMedias.map((media) => (
                          <MediaLibraryItem
                            key={media.id}
                            media={media}
                            selected={selectedMedias.some(m => m.id === media.id)}
                            disabled={isFetching}
                            onChange={(selected) => {
                              if (selected) {
                                setSelectedMedias([...selectedMedias, media]);
                              } else {
                                setSelectedMedias(selectedMedias.filter(m => m.id !== media.id));
                              }
                            }} />
                        )) : (
                          <span className="text-center text-sm opacity-60 col-span-full w-full">Aucune image sélectionnée</span>
                        )
                      }
                    </div>
                  </div>

                  <button
                    ref={selectMediaRef}
                    onClick={() => {
                      const modal = document.getElementById("medias-selector-modal") as HTMLDialogElement;
                      modal.showModal();
                    }}
                    className="btn btn-sm btn-primary w-full">
                    {selectedMedias.length > 0 ? "Ajouter" : "Sélectionner"} des images
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm">Image de fond</p>

                  <div className="relative flex justify-center items-center aspect-video rounded-lg overflow-hidden bg-slate-200 border border-gray-300">
                    {
                      selectedBackgroundMedia ? (<>
                        <Image
                          src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + selectedBackgroundMedia.filename}
                          alt={selectedBackgroundMedia.name}
                          width={1280}
                          height={720}
                          className="object-cover blur saturate-150 w-full h-full"
                        />

                        <Image
                          src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + selectedBackgroundMedia.filename}
                          alt={selectedBackgroundMedia.name}
                          width={1280}
                          height={720}
                          className="absolute top-0 left-0 object-contain w-full h-full"
                        />

                        <button
                          className="absolute top-3 right-3 w-7 h-7 btn text-white btn-xs bg-red-500 border-red-600 hover:border-red-600 hover:bg-red-600"
                          onClick={() => setSelectedBackgroundMedia(undefined)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </>) : (
                        <span className="text-center text-sm opacity-60">Aucune image sélectionnée</span>
                      )
                    }
                  </div>

                  <button
                    ref={selectBackgroundMediaRef}
                    onClick={() => {
                      const modal = document.getElementById("background-medias-selector-modal") as HTMLDialogElement;
                      modal.showModal();
                    }}
                    className="btn btn-sm btn-primary w-full"
                  >
                    {selectedBackgroundMedia ? "Choisir une autre" : "Sélectionner une"} image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductCategoryCreationModal id="category-creation-modal" setSelectedCategory={setSelectedCategory} fetchCategories={fetchCategories} />
      <ProductMaterialCreationModal id="material-creation-modal" selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials} fetchMaterials={fetchMaterials} />

      <MediaSelectorModal id="medias-selector-modal" options={{ multiple: true }} onSelect={(medias) => {
        const mediasToAdd = medias.filter(media => !selectedMedias.some(selectedMedia => selectedMedia.id === media.id));
        setSelectedMedias([...selectedMedias, ...mediasToAdd]);
      }} />

      <MediaSelectorModal id="background-medias-selector-modal" options={{ multiple: false }} onSelect={(medias) => { setSelectedBackgroundMedia(medias[0]); }} />
    </>
  )
};
