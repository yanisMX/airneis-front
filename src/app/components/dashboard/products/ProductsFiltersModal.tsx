import { Category, Material, ProductQuery } from "@/app/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";

export default function ProductsFiltersModal({ id, filters, categories, materials, defaultItemsPerPageLimit, setFilters, fetchProducts }: { id: string, filters: ProductQuery, categories: Category[], materials: Material[], defaultItemsPerPageLimit: number, setFilters: (filters: ProductQuery) => void, fetchProducts: () => void }) {
  const [selectedSortOption, setSelectedSortOption] = useState<string | undefined>(filters.sort);
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc" | undefined>(filters.order);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(filters.limit || 20);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [inStock, setInStock] = useState<boolean | undefined>(filters.stock);
  const [isFeatured, setFeatured] = useState<boolean | undefined>(filters.featured);

  const sortOptionsNames = {
    id: "Id",
    name: "Nom",
    price: "Prix",
    category: "Catégorie",
    stock: "Stock",
    createdAt: "Date de création"
  };

  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedCategories(categories.filter(category => filters.categories?.includes(category.id)));
    setSelectedMaterials(materials.filter(material => filters.materials?.includes(material.id)));
  }, [categories, materials]);

  useEffect(() => {
    if (minPriceRef.current) minPriceRef.current.value = filters.minPrice?.toString() || "";
    if (maxPriceRef.current) maxPriceRef.current.value = filters.maxPrice?.toString() || "";
  }, [filters]);

  const applyFilters = async () => {
    const categoryIds = selectedCategories.map(category => category.id);
    const materialIds = selectedMaterials.map(material => material.id);
    const minPrice = getPriceValue("minPrice");
    const maxPrice = getPriceValue("maxPrice");

    setFilters({
      ...filters,
      stock: inStock,
      categories: categoryIds,
      materials: materialIds,
      minPrice,
      maxPrice,
      page: undefined,
      featured: isFeatured,
      sort: selectedSortOption as any,
      order: selectedOrder,
      limit: selectedItemsPerPage
    });

    fetchProducts();
    closeDialog();
  }

  const resetFilters = () => {
    setSelectedSortOption(undefined);
    setSelectedOrder(undefined);
    setSelectedItemsPerPage(defaultItemsPerPageLimit);
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setInStock(undefined);
    setFeatured(undefined);
    if (minPriceRef.current) minPriceRef.current.value = "";
    if (maxPriceRef.current) maxPriceRef.current.value = "";

    setFilters({ limit: defaultItemsPerPageLimit });
  }

  function getPriceValue(inputId: string): number | undefined {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (!inputElement || inputElement.value?.length === 0) return undefined;

    const price = parseFloat(inputElement.value);
    if (isNaN(price)) throw new Error(`${inputId} is not a number`);

    return price;
  }

  const closeDialog = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  return <>
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box font-normal flex flex-col px-0">
        <div className="px-6">
          <h2 className="font-bold text-2xl mb-4">Paramètres de la recherche</h2>
        </div>

        <div className="overflow-auto px-6">
          <h3 className="font-bold text-xl mb-4">Options</h3>

          <div className="form-control gap-2 mb-4">
            <h3 className="font-bold" tabIndex={0}>Tri</h3>

            <div className="dropdown me-1">
              <div tabIndex={0} role="button" className="btn btn-xs">{(sortOptionsNames as any)[selectedSortOption as any] || "Par défaut"}<i className="fa-solid fa-chevron-down"></i></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm lg:menu-xs p-1 mt-2 border shadow bg-base-100 rounded-lg w-48 lg:w-32">
                <li className="menu-item">
                  <button className={`${selectedSortOption === undefined ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedSortOption(undefined)}>Par défaut</button>
                </li>

                {
                  Object.entries(sortOptionsNames).map(([key, name]) => (
                    <li className="menu-item" key={key}>
                      <button className={`${selectedSortOption === key ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setSelectedSortOption(key)}>{name}</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          <div className="form-control gap-2 mb-4">
            <h2 className="font-bold">Ordre</h2>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2 py-0">
                <input type="radio" name="radio-sort" className="radio radio-sm radio-primary" defaultChecked={filters.order === "asc" || filters.order === undefined} onChange={() => setSelectedOrder("asc")} />
                <span className="label-text">Croissant</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2 py-0">
                <input type="radio" name="radio-sort" className="radio radio-sm radio-primary" defaultChecked={filters.order === "desc"} onChange={() => setSelectedOrder("desc")} />
                <span className="label-text">Décroissant</span>
              </label>
            </div>
          </div>

          <div className="form-control gap-2 mb-4">
            <h2 className="font-bold">Éléments par page</h2>

            <input type="range" min="5" max="20" value={selectedItemsPerPage} className="range" step="5" onChange={(e) => setSelectedItemsPerPage(parseInt((e.target as HTMLInputElement).value))} />
            <div className="w-full flex justify-between text-xs px-2">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>

          <hr className="my-6 mt-8" />

          <h2 className="font-bold text-xl mb-2">Filtres</h2>

          <div className="form-control mb-6 flex">
            <h3 className="font-bold mb-2">À la une (featured)</h3>

            <div className="join">
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="featured" aria-label="Non"
                checked={isFeatured === false} onChange={() => setFeatured(false)} />
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="featured" aria-label="Non défini"
                checked={isFeatured === undefined} onChange={() => setFeatured(undefined)} />
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="featured" aria-label="Oui"
                checked={isFeatured === true} onChange={() => setFeatured(true)} />
            </div>
          </div>

          <div className="form-control mb-6 flex">
            <h3 className="font-bold mb-2">En stock</h3>

            <div className="join">
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="optionsInStock" aria-label="Non"
                checked={inStock === false} onChange={() => setInStock(false)} />
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="options" aria-label="Non défini"
                checked={inStock === undefined} onChange={() => setInStock(undefined)} />
              <input className="join-item btn btn-xs border border-gray-300" type="radio" name="options" aria-label="Oui"
                checked={inStock === true} onChange={() => setInStock(true)} />
            </div>
          </div>

          <div className="form-control mb-4">
            <h3 className="font-bold mb-2">Catégories</h3>

            {
              categories.map(category => (
                <label className="label cursor-pointer justify-start space-x-2 py-0 pb-2">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (!(e.target as HTMLInputElement).checked && selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== category));
                      } else if ((e.target as HTMLInputElement).checked && !selectedCategories.includes(category)) {
                        setSelectedCategories([...selectedCategories, category]);
                      }
                    }} />
                  <span className="label-text">{category.name}</span>
                </label>
              ))
            }
          </div>

          <div className="form-control mb-4">
            <h3 className="font-bold mb-2">Matériaux</h3>
            {
              materials.map(material => (
                <label className="label cursor-pointer justify-start space-x-2 py-0 pb-2">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-primary"
                    checked={selectedMaterials.includes(material)}
                    onChange={(e) => {
                      if (!(e.target as HTMLInputElement).checked && selectedMaterials.includes(material)) {
                        setSelectedMaterials(selectedMaterials.filter(selectedMaterial => selectedMaterial !== material));
                      } else if ((e.target as HTMLInputElement).checked && !selectedMaterials.includes(material)) {
                        setSelectedMaterials([...selectedMaterials, material]);
                      }
                    }} />
                  <span className="label-text">{material.name}</span>
                </label>
              ))
            }
          </div>

          <div>
            <h3 className="font-bold mb-2">Prix</h3>

            <div className="form-control flex-row mx-1 space-x-2">
              <label className="input input-sm input-bordered flex items-center p-0 ps-2">
                <i className="fa-solid fa-angle-left me-2"></i>Min<span className="ms-3">€</span>
                <input type="number" id="minPrice" name="minPrice" ref={minPriceRef} step={0.01} min={0} max={9999999999} placeholder="0.00" className="flex-1 w-1/2" />
              </label>
              <label className="input input-sm input-bordered flex items-center p-0 ps-2">
                <i className="fa-solid fa-angle-right me-2"></i>Max<span className="ms-3">€</span>
                <input type="number" id="maxPrice" name="maxPrice" ref={maxPriceRef} step={0.01} min={0} max={9999999999} placeholder="0.00" className="flex-1 w-1/2" />
              </label>
            </div>
          </div>
        </div>

        <div className="modal-action px-6">
          <form method="dialog" className="flex space-x-2">
            <button className="btn btn-sm btn-primary" onClick={() => applyFilters()}>Appliquer</button>
            <button className="btn btn-sm btn-error text-white" onClick={() => resetFilters()}>Réinitialiser</button>
            <button className="btn btn-sm" onClick={() => closeDialog()}>Annuler</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
}
