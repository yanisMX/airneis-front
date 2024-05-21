import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductComponentProps } from "@/app/interfaces/interfaces";



const ProductComponent = ({ product, i } : ProductComponentProps) => {
    const router = useRouter();

    return (
        <article className="p-6 sm:flex-row-reverse" key={i}>
            <div className="card w-60 h-96 bg-base-100 shadow-xl flex flex-col "> {/* Hauteur fixe ajoutée ici */}
                <figure className="relative w-60 h-32">
                    <Image
                        src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images[0].filename}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </figure>
                <div className="card-body flex flex-col">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="text-ellipsis overflow-hidden" style={{ maxHeight: '4.5em', overflow: 'hidden' }}>{product.description}</p>

                    <div className="card-actions space-between pt-4 flex-grow">
                        <p className="mt-auto pb-2.5">{product.price} €</p>
                        <button className="btn btn-primary mt-auto" onClick={() => router.push(`/produitdetails/${product.slug}`)}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
export default ProductComponent;