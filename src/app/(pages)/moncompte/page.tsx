'use client';
import { postCallAPI } from '@/app/api/post';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import React, { useState } from 'react';

const MyAccountPage = () => {
  const { user, setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const API_FOR_ADDRESS_DELETE = `https://c1bb0d8a5f1d.airneis.net/api/user/addresses/${user?.id}`;
  const API_FOR_PERSONAL_INFORMATION_MODIFY =
    'https://c1bb0d8a5f1d.airneis.net/api/user';

  const handleModifyPersonalInformationClick = async (
    newInformation: string | null,
    informationType: string,
  ) => {
    if (newInformation) {
      try {
        const response = await postCallAPI(
          API_FOR_PERSONAL_INFORMATION_MODIFY,
          { [informationType]: newInformation },
        );
        if (response.success) {
          setUser({
            ...user,
            [informationType]: newInformation,
            email: user?.email || '',
          });
        } else {
          setErrorMessage(
            'Erreur lors de la modification des informations personnelles',
          );
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  const handleDeleteClick = async (addressType: string, addressId: string) => {
    try {
      const response = await postCallAPI(API_FOR_ADDRESS_DELETE, {
        addressType,
        addressId,
      });
      if (response.success) {
        setUser({ ...user, [addressType]: '', email: user?.email || '' });
      } else {
        setErrorMessage("Erreur lors de la suppression de l'adresse");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Vous n&apos;êtes pas autorisé à acceder à cette page
        </p>
      </div>
    );
  } else {
    return (
      <div className="content-below-navbar min-h-screen">
        <div className="flex min-h-full flex-col px-6 py-12 lg:px-8">
          <div className="text-center text-4xl font-bold">Mon compte</div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8">
              <div className="sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-2xl font-semi-bold leading-9 text-gray-900 tracking-wide text-left">
                  Mes informations personnelles
                </h2>
              </div>

              <div className="mt-10 sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Nom complet
                    </label>
                    <div className="mt-2 flex">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={user.name}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                      />
                      <button
                        className="pl-2"
                        onClick={() =>
                          handleModifyPersonalInformationClick(
                            prompt('Nouveau nom:', user.name),
                            'name',
                          )
                        }
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Adresse e-mail
                    </label>
                    <div className="mt-2 flex">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                      />
                      <button
                        className="pl-2"
                        onClick={() =>
                          handleModifyPersonalInformationClick(
                            prompt('Nouvel email:', user.email),
                            'email',
                          )
                        }
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/"
                      className="text-blue-700 text-sm font-semibold block"
                    >
                      Modifier mon mot de passe
                    </Link>
                  </div>
                  {errorMessage && (
                    <div className="text-red-500 text-sm">{errorMessage}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-9">
              <div className="sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-2xl font-semi-bold leading-9 text-gray-900 tracking-wide text-left">
                  Mes adresses
                </h2>
              </div>

              <div className="mt-10 sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="billingAddress"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Adresse de facturation
                    </label>
                    <div className="mt-2 flex">
                      <input
                        id="billingAddress"
                        name="billingAddress"
                        type="text"
                        value={user.billingAddress}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                      />
                      <button className="px-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick('billing', 'billingAddressId')
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="shippingAddress"
                      className="block text-sm font-medium leading-6 text-gray-900 text-left"
                    >
                      Adresse de livraison
                    </label>
                    <div className="mt-2 flex">
                      <input
                        id="shippingAddress"
                        name="shippingAddress"
                        type="text"
                        value={user.shippingAddress}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                      />
                      <button className="px-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick('shipping', 'shippingAddressId')
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="mt-8">
                      <Link
                        href="/"
                        className="text-blue-700 text-sm font-semibold block"
                      >
                        Ajouter une adresse de livraison
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyAccountPage;
