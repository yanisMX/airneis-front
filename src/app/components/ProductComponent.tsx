import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductComponentProps } from '@/app/interfaces/interfaces';

const ProductComponent = ({ product, i }: ProductComponentProps) => {
  const router = useRouter();

  return (
    <article className="p-6 sm:flex-row-reverse" key={i}>
      <div className="card w-60 h-96 bg-base-100 shadow-md flex flex-col ">
        {' '}
        {/* Hauteur fixe ajoutée ici */}
        <figure className="relative">
          <Image
            src={product.images[0] ? (process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + product.images[0].filename) : (process.env.NEXT_PUBLIC_HOST + "/product-placeholder.png")}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain w-full h-full"
          />
        </figure>
        <div className="card-body p-6 flex flex-col">
          <h2 className="card-title overflow-hidden text-nowrap">{product.name}</h2>
          <p
            className="text-ellipsis overflow-hidden"
            style={{ maxHeight: '4.5em', overflow: 'hidden' }}
          >
            {product.description}
          </p>

          <div className="card-actions space-between pt-4 flex-grow items-center flex">
            <p>{product.price} €</p>
            <button
              className="btn btn-primary btn-sm mt-auto"
              onClick={() => router.push(`/produitdetails/${product.slug}`)}
            >
              Détails
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default ProductComponent;
