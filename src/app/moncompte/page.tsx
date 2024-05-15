import Link from 'next/link';
import React from 'react';

const MyAccountPage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '********',
    shippingAddress: '1234 Main St, Anytown, USA',
    billingAddress: '1234 Main St, Anytown, USA',
  };

  return (
    <div className="content-below-navbar">
      <div className="flex min-h-full flex-col px-6 py-12 lg:px-8">
        <div className='text-center text-4xl font-bold'>Mon compte</div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8">
            <div className="sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-2xl font-semi-bold leading-9 tracking-tight text-gray-900 tracking-wide text-left">
                Mes informations personnelles
              </h2>
            </div>

            <div className="mt-10 sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Nom complet
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={user.name}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Adresse e-mail
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                    />
                  </div>

                  <div className='mt-8'>
                  <Link  href="/" className=' text-blue-700 text-sm font-semibold block'>Modifier mon adresse mail</Link>
                  <Link  href="/" className=' text-blue-700 text-sm font-semibold'>Modififier mon nom</Link>

                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-9">
            <div className="sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-2xl font-semi-bold leading-9 tracking-tight text-gray-900 tracking-wide text-left">
                Mes adresses
              </h2>
            </div>

            <div className="mt-10 sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Adresse de facturation
                  </label>
                  <div className="mt-2">
                    <input
                      id="billingAddress"
                      name="billingAddress"
                      type="text"
                      value={user.billingAddress}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="shippingAddress" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Adresse de livraison
                  </label>
                  <div className="mt-2">
                    <input
                      id="shippingAddress"
                      name="shippingAddress"
                      type="text"
                      value={user.shippingAddress}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                    />
                  </div>
                  <div className='mt-8 '>
                  <Link  href="/" className=' text-blue-700 text-sm font-semibold block'>Ajouter une adresse de livraison</Link>
                  <Link  href="/" className=' text-blue-700 text-sm font-semibold block'>Supprimer une adresse de livraison</Link>
                  <Link  href="/" className=' text-blue-700 text-sm font-semibold block'>Modifier mon adresse de facturation</Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;