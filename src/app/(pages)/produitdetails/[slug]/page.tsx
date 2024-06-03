'use client';
import { useEffect, useState } from 'react';
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

    toast.success(() =>  <>Article ajouté au panier.</>);
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
        const response = await getCallApi(`/products?categories=${product.category ?.id ?? ""}`);
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
        {
          product ? (
            <>
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + '/' + product?.backgroundImage?.filename}
                alt={product.name}
                width={1280}
                height={720}
                className='object-cover w-full h-full shadow-lg'
              />
              <div className='absolute -bottom-1/3 left-0 flex justify-center xl:justify-start w-full'>
                <div className='aspect-square w-64 h-64 rounded-2xl xl:ms-20 shadow-lg border border-gray-300 overflow-hidden'>
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + '/' + product?.images[0]?.filename}
                    alt={product.name}
                    width={300}
                    height={300}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )
        }
      </div>
      <div className='container mx-auto px-6 my-48'>
        <div className='flex'>
          <div className='flex-1'>
            <h1 className='text-4xl font-bold'>{product?.name ?? ""}</h1>
            <p className='text-xl mt-4'>
              <span className='font-bold'>{product?.price ?? ""} €</span>
              <span className='mx-4'>&bull;</span>
              
              {
                product?.stock === 0 ? (
                  <span className='text-red-500'>Rupture de stock</span>
                ) : (
                  <span className='text-green-500'>{product?.stock} en stock</span>
                )
              }
            </p>
          </div>
          <div>
            <button className='btn btn-primary' onClick={addToCart}>
              <i className="fa-solid fa-cart-plus"></i>
              <span className='hidden lg:inline'>Ajouter au panier</span>
            </button>
          </div>
        </div>

        <div className='mb-16'>
          <div className='mt-12'>
            {product?.description.split("\n").map((line, i) => (
              <p key={i}>{line}<br /></p>
            ))}
          </div>
        </div>
        
        <div className='mb-16'>
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
        </div>

        <div>
          <h2 className='mb-8 text-2xl font-semibold'>Produits similaires</h2>
          { similarProducts.length === 0 && <p className='opacity-60'>Aucun produit similaire</p> }

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

       
      </div>
    </main>
  );
};

export default ProductDetailsPage;
