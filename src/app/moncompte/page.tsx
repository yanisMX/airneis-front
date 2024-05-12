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
        <div className="sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-4xl font-bold leading-9 tracking-tight text-gray-900 tracking-wide text-left">
            Mes informations
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
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
               Adresse de facturation
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                />
              </div>
            </div>

              <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
               Adresse de livraison
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.shippingAddress}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
                />
             </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default MyAccountPage;