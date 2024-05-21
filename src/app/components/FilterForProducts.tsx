"use client"
import { Category, Material } from "../interfaces/interfaces";
import { FilterForProductsProps } from "../interfaces/interfaces";


const FilterForProducts: React.FC<FilterForProductsProps> = ({ 
  categories,
  materials,
  selectedCategories,
  setSelectedCategories,
  selectedMaterials,
  setSelectedMaterials
 }) => {

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleMaterialChange = (materialId: number) => {
    if (selectedMaterials.includes(materialId)) {
      setSelectedMaterials(selectedMaterials.filter((id) => id !== materialId));
    } else {
      setSelectedMaterials([...selectedMaterials, materialId]);
    }
  };


  return (
    <div className="space-y-4 sm:pr-3 sm:ml-3 full-width sm:block hidden">
      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden "
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4  text-gray-900 transition"
        >
          <span className="text-sm font-medium pr-9"> Catégories </span>

          <span className="transition group-open:-rotate-180 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
              Réinitialiser
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {categories.map((category : Category) => (
              <li key={category.id}>
                <label className="gap-2">
                  <div className="block">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      className="size-5 rounded border-gray-300" 
                      onChange={() => handleCategoryChange(category.id)}
                      checked={selectedCategories.includes(category.id)}/>
                    <span className="text-sm font-medium text-gray-700"> {category.name} </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </details>



      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span className="text-sm font-medium"> Matériaux </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
              Réinitialiser
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {materials.map((material: Material) => (
              <li key={material.id}>
                <label className="gap-2">
                  <div className="block">
                    <input
                      type="checkbox"
                      id={`material-${material.id}`}
                      className="size-5 rounded border-gray-300"
                      onChange={() => handleMaterialChange(material.id)}
                      checked={selectedMaterials.includes(material.id)}
                    />
                    <span className="text-sm font-medium text-gray-700">{material.name}</span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </details>
      <details
        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span className="text-sm font-medium"> Prix </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">Le prix le plus chère est de 500€ </span>

            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
              Réinitialiser
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">€</span>

                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="De"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>

              <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">€</span>

                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="à"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      </details>
   </div>
)
}


export default FilterForProducts;