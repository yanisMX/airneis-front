'use client';
import { useEffect, useRef, useState } from 'react';
import { getCallApi } from '@/app/api/get';
import { Product } from '@/app/interfaces/interfaces';
import { handleAddToCart } from '@/app/utils/cartUtils';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { postCallApi } from '@/app/api/post';
import Link from 'next/link';
import toast from 'react-hot-toast';

const ProductDetailsPage = ({ params }: { params: { slug: string } }) => {
  const ENDPOINT_FOR_PRODUCT = `/products/slug/${params.slug}`;
  const ENDPOINT_FOR_ADD_TO_CART = '/user/basket';

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const { shoppingCart, setShoppingCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [messageDisplay, setMessageDisplay] = useState('');
  const { user } = useAuth();

  const carouselModalRef = useRef<HTMLDialogElement>(null);

  const addToCartForUserConnected = async () => {
    if (product && user && user.accessToken) {
      try {
        if (shoppingCart.items.some((item) => item.product.id === product.id)) {
          const updatedCart = handleAddToCart(product, shoppingCart);
          setShoppingCart(updatedCart);
        } else {
          const response = await postCallApi(
            ENDPOINT_FOR_ADD_TO_CART,
            { productId: product.id, quantity: 1 },
            user.accessToken,
          );
          if (response.success) {
            setMessageDisplay('Produit ajouté au panier.');
            const updatedCart = handleAddToCart(product, shoppingCart);
            setShoppingCart(updatedCart);
          } else {
            setMessageDisplay("Impossible d'ajouter le produit au panier.");
          }
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  const addToCartForUserNotConnected = () => {
    if (product) {
      const updatedCart = handleAddToCart(product, shoppingCart);
      setShoppingCart(updatedCart);
    } else {
      console.error("Impossible d'ajouter le produit au panier.");
    }
  };

  const addToCart = (): void => {
    if (product && isLoggedIn) {
      addToCartForUserConnected();
    } else if (product && !isLoggedIn) {
      addToCartForUserNotConnected();
    }

    toast.success(() => <>Article ajouté au panier.</>);
  };

  const fetchDataProduct = async () => {
    const response = await getCallApi(ENDPOINT_FOR_PRODUCT);
    try {
      if (response.success) {
        setProduct(response.product);
      } else {
        console.error('Impossible de récupérer le produit');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (product) {
      const fetchSimilarProducts = async () => {
        const response = await getCallApi(`/products?categories=${product.category?.id ?? ""}`);
        try {
          if (response.success) {
            const similar: Product[] = response.products;
            setSimilarProducts(similar.filter((p) => p.id !== product.id));
          } else {
            console.error('Impossible de récupérer les produits similaires');
          }
        } catch (error: any) {
          console.error(error.message);
        }
      };
      fetchSimilarProducts();
    }
  }, [product]);

  useEffect((): void => {
    fetchDataProduct();
  }, [params.slug]);

  return (
    <main className="min-h-screen">
      <div className='container mx-auto relative flex flex-col w-full h-[400px]'>
        {product ? (
          <Image
            src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + '/' + product?.backgroundImage?.filename}
            alt={product?.name ?? ""}
            width={1280}
            height={720}
            className='object-cover w-full h-full shadow-lg'
          />
        ) : (
          <div className="skeleton w-full h-full"></div>
        )}
        <div className='absolute -bottom-1/3 left-0 flex justify-center xl:justify-start w-full'>
          <div className='gap-4 xl:gap-8 flex flex-col xl:flex-row xl:items-center'>
            <div className='relative aspect-square w-64 h-64 rounded-2xl xl:ms-20 shadow-lg border border-gray-300 overflow-hidden'>
              {product ? (
                <>
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + '/' + product?.images[0]?.filename}
                    alt={product.name}
                    width={300}
                    height={300}
                    className='object-cover w-full h-full cursor-pointer'
                    onClick={() => carouselModalRef.current?.showModal()}
                  />

                  {
                    product.images.length > 1 && (
                      <div className="xl:hidden absolute right-4 bottom-4 px-2 py-1 bg-black bg-opacity-60 text-white text-sm rounded-lg">+{product.images.length}</div>
                    )
                  }
                </>
              ) : (
                <div className='skeleton w-full h-full'></div>
              )}
            </div>

            {
              product && product.images.length > 1 && (
                <div className="flex justify-center">
                  <button className='btn btn-sm border border-gray-300 xl:mt-24' onClick={() => carouselModalRef.current?.showModal()}>
                    <span className="xl:hidden">Voir plus</span>
                    <span className="hidden xl:inline">Voir {product?.images.length} autres images</span>
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6 my-48'>
        <div className='flex'>
          <div className='flex-1'>

            {product ? (
              <>
                <h1 className='text-4xl font-bold'>{product.name}</h1>

                <p className='text-xl mt-4'>
                  <span className='font-bold'>{product.price} €</span>
                  <span className='mx-4'>&bull;</span>

                  {
                    product?.stock === 0 ? (
                      <span className='text-red-500'>Rupture de stock</span>
                    ) : (
                      <span className='text-green-500'>{product?.stock} en stock</span>
                    )
                  }
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="skeleton h-10 w-48"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="skeleton h-8 w-20"></div>
                  <div className="skeleton h-4 w-4"></div>
                  <div className="skeleton h-8 w-28"></div>
                </div>
              </div>
            )}
          </div>

          <div>
            {product ? (
              <button className='btn btn-primary' onClick={addToCart}>
                <i className="fa-solid fa-cart-plus"></i>
                <span className='hidden lg:inline'>Ajouter au panier</span>
              </button>
            ) : (
              <div className="skeleton h-12 w-12 lg:w-44"></div>
            )}
          </div>
        </div>

        <div className='mb-16'>
          <div className='mt-12'>
            {
              product ? (
                product.description.split("\n").map((line, i) => (
                  <p key={i}>{line}<br /></p>
                ))
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-1/3"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-2/5"></div>
                  <div className="skeleton h-4 w-4/5"></div>
                  <div className="skeleton h-4 w-4/6"></div>
                  <div className="skeleton h-4 w-2/5"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-4/5"></div>
                  <div className="skeleton h-4 w-1/3"></div>
                  <div className="skeleton h-4 w-4/6"></div>
                </div>
              )
            }
          </div>
        </div>

        <div className='mb-16'>
          {
            product ? (
              <>
                <h2 className='mb-8 text-2xl font-semibold'>Informations supplémentaires</h2>

                <p>
                  <i className="fa-solid fa-tags me-2"></i>
                  <span className='font-semibold me-2'>Catégorie :</span>

                  {
                    product?.category ? (
                      <span>{product.category.name}</span>
                    ) : (
                      <span className='opacity-60'>Non renseignée</span>
                    )
                  }
                </p>

                <p>
                  <i className="fa-solid fa-cubes me-2"></i>
                  <span className='font-semibold me-2'>Matériaux :</span>

                  {
                    product?.materials ? (
                      <span>{product.materials.map((m) => m.name).join(', ')}</span>
                    ) : (
                      <span className='opacity-60'>Non renseignés</span>
                    )
                  }
                </p>
              </>
            ) : (
              <>
                <div>
                  <div className="flex gap-2 mb-10">
                    <div className="skeleton h-6 w-36"></div>
                    <div className="skeleton h-6 w-48"></div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <div className="skeleton h-4 w-4"></div>
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-4 w-48"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="skeleton h-4 w-4"></div>
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-4 w-20"></div>
                  </div>
                </div>
              </>
            )
          }
        </div>

        {
          product && (
            <div>
              <h2 className='mb-8 text-2xl font-semibold'>Produits similaires</h2>
              {similarProducts.length === 0 && <p className='opacity-60'>Aucun produit similaire</p>}

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                {
                  similarProducts.map((product, i) => (<>
                    <div className='relative w-full bg-red-50 aspect-square rounded-2xl overflow-hidden border border-gray-300 shadow-md'>
                      <Image
                        src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + product.images[0]?.filename}
                        width={300}
                        height={300}
                        alt={product.name}
                        className='w-full h-full object-cover'
                      />

                      <div className='absolute left-0 top-0 text-xl m-4 p-2 bg-black bg-opacity-40 rounded-lg text-white'>
                        {product.name}
                      </div>

                      <div className='absolute left-4 bottom-4'>
                        <Link href={`/produitdetails/${product.slug}`} className='btn btn-sm border-gray-300'>
                          Voir le produit
                        </Link>
                      </div>
                    </div>
                  </>))
                }
              </div>
            </div>
          )
        }
      </div>

      <dialog ref={carouselModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box sm:w-11/12 sm:max-w-5xl">
          <h3 className="font-bold text-2xl mb-4">Images du produit</h3>
          
          <div className="modal-body">
            <div className="flex gap-4">
              <div className="carousel w-full h-[600px]">
                {
                  product && product.images.map((image, i) => (
                    <div key={i} id={"slide" + i} className="carousel-item relative w-full">
                      <Link href={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + image.filename} target="_blank" className="w-full h-full">
                        <Image src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + image.filename}
                          width={1280}
                          height={720}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                      <div className="absolute left-0 bottom-0 w-full p-8 flex items-center justify-center">
                        <div className="bg-black bg-opacity-60 px-4 py-2 rounded-xl text-white">{i + 1} / {product.images.length}</div>
                      </div>
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${i === 0 ? product.images.length - 1 : i - 1}`} className="btn btn-circle bg-black bg-opacity-50 backdrop-filter backdrop-blur border-none text-white">❮</a> 
                        <a href={`#slide${i === product.images.length - 1 ? 0 : i + 1}`} className="btn btn-circle bg-black bg-opacity-50 backdrop-filter backdrop-blur border-none text-white">❯</a>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="">
              <button className="btn btn-sm border border-gray-300">Fermer</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default ProductDetailsPage;
