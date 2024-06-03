'use client';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import React, { useState } from 'react';
import AccountInformation from '@/app/components/AccountInformation';
import AccountAddressInput from '@/app/components/AccountAddressInput';
import { handleModifyPersonalInformationClick } from '@/app/utils/userUtils';
import ChangePasswordPopup from '@/app/components/PopupForPassword';
import { postCallApi } from '@/app/api/post';

const MyAccountPage = () => {
  const { user, setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isChangePasswordPopupVisible, setIsChangePasswordPopupVisible] = useState(false);

  const ENDPOINT_FOR_PERSONAL_INFORMATION_MODIFY = '/api/user';
  const ENDPOINT_FOR_PASSWORD_MODIFY = '/user/password';

  const handleFocus = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.removeAttribute('readonly');
      ref.current.focus();
    }
  };

  const handleChangePasswordSubmit = async (oldPassword: string, newPassword: string) => {
    try {
      const result = await postCallApi(ENDPOINT_FOR_PASSWORD_MODIFY, { oldPassword, newPassword })
      if (result.success) {
        setSuccessMessage('Mot de passe changé avec succès');
      } else {
        setErrorMessage(result.message || 'Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      setErrorMessage('Erreur lors du changement de mot de passe');
    } finally {
      setIsChangePasswordPopupVisible(false);
      setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Vous n&apos;êtes pas autorisé à accéder à cette page
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
                  <AccountInformation
                    id="name"
                    label="Nom complet"
                    type="text"
                    value={user.name ?? ''}
                    handleFocus={handleFocus}
                    handleModifyPersonalInformationClick={(newInformation, informationType, ref) =>
                      handleModifyPersonalInformationClick(newInformation, informationType, ref, user, setUser, setSuccessMessage, setErrorMessage, ENDPOINT_FOR_PERSONAL_INFORMATION_MODIFY)
                    }
                  />
                  <AccountInformation
                    id="email"
                    label="Adresse e-mail"
                    type="email"
                    value={user.email}
                    handleFocus={handleFocus}
                    handleModifyPersonalInformationClick={(newInformation, informationType, ref) =>
                      handleModifyPersonalInformationClick(newInformation, informationType, ref, user, setUser, setSuccessMessage, setErrorMessage, ENDPOINT_FOR_PERSONAL_INFORMATION_MODIFY)
                    }
                  />
                  <div className="mt-8">
                    <button onClick={() => setIsChangePasswordPopupVisible(true)} className="text-blue-700 text-sm font-semibold">
                      Modifier mon mot de passe
                    </button>
                  </div>
                  {successMessage && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {errorMessage}
                    </div>
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
                  <AccountAddressInput
                    id="billingAddress"
                    label="Adresse de facturation"
                    value={user.billingAddress || ''}
                    handleFocus={handleFocus}
                  />
                  <AccountAddressInput
                    id="shippingAddress"
                    label="Adresse de livraison"
                    value={user.shippingAddress || ''}
                    handleFocus={handleFocus}
                  />
                  <div className="mt-8">
                    <Link href="/" className="text-blue-700 text-sm font-semibold block">
                      Ajouter une adresse de livraison
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChangePasswordPopup
          visible={isChangePasswordPopupVisible}
          onClose={() => setIsChangePasswordPopupVisible(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      </div>
    );
  }
};

export default MyAccountPage;
