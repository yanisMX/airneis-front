import React, { useEffect, useRef, useState } from 'react';
import { AccountAddressInputProps } from '@/app/interfaces/interfaces';
import PopupForAddress from './PopupForAddress';
import { useAuth } from '@/app/context/AuthContext';
import { postCallApi } from '../api/post';
import { getCallApi } from '../api/get';
import { Address } from 'cluster';


const AccountAddressInput: React.FC<AccountAddressInputProps> = ({
  id,
  label,
  value,
  handleFocus
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { user } = useAuth();
  const [address, setAddress] = useState<Address | any>({
    label: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    region: '',
    country: '',
    phone: '',
    type: 'billing'
  });

  const handlePopupSubmit = async (addressDetails: {
    label: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
    phone: string;
    type: 'billing' | 'shipping';
  }) => {
    setIsPopupVisible(false);
    try {
      const response = await postCallApi(`/user/addresses/`, addressDetails, user?.accessToken);
      if (response.success) {
      } else {
        console.error('Erreur lors de l\'ajout de l\'adresse:', response.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'adresse:', error);
    }
  };

  const onClose = () => {
    setIsPopupVisible(false);
  }

  const getAddress = async () => {
    try {
      const response = await getCallApi(`/user/addresses/`, user?.accessToken);
      if (response.success && response.addresses && response.addresses.length > 0) {
        setAddress(response.addresses[0]); 
      } else {
        console.error('Erreur lors de la récupération de l\'adresse:', response.message);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse:', error);
    }
  }

  
  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 text-left">
        {label}
      </label>
      <div className="mt-2 flex">
        <input
          value={address?.address1} 
          ref={inputRef}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
        />
        <button className="px-2" onClick={() => setIsPopupVisible(true)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="px-2">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <PopupForAddress
        visible={isPopupVisible}
        onClose={onClose}
        onSubmit={handlePopupSubmit}
      />
    </div>
  );
};

export default AccountAddressInput;
