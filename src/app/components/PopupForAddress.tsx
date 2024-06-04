import React, { use, useEffect } from 'react';
import { Address } from '@/app/interfaces/interfaces';
import { PopupProps } from '@/app/interfaces/interfaces';
import { getCallApi } from '../api/get';
import { useAuth } from '../context/AuthContext';
import { patchCallApi } from '../api/patch';

const PopupForAddress: React.FC<PopupProps> = ({ visible, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [addressDetails, setAddressDetails] = React.useState<Address | any>({
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
  } as Address);

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getCallApi('/user/addresses/', user?.accessToken);
      if (response.success && response.addresses && response.addresses.length > 0) {
        setAddressDetails(response.addresses[0]);
        console.log('Adresse récupérée avec succès:', response.addresses[0]);
      } else {
        console.error('Erreur lors de la récupération de l\'adresse:', response.message);
      }
    };
    fetchAddress();
  }, [user?.accessToken]); 

  if (!visible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails: Address) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(addressDetails);
    patchAddress(addressDetails);
  };



const patchAddress = async (addressDetails: Address) => {
  try {
    const response = await patchCallApi(`/user/addresses/1`, addressDetails, user?.accessToken);
    if (response.success) {
      console.log('Adresse modifiéé avec succès:', response.address);
    } else {
      console.error('Erreur lors de l\'ajout de l\'adresse:', response.message);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'adresse:', error);
  }
}





  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Veuillez renseigner votre nouvelle adresse</h2>
        <div className="space-y-2">
          <input name="label" type="text" placeholder="Lieu" value={addressDetails?.label} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="firstName" type="text" placeholder="Prénom" value={addressDetails?.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="lastName" type="text" placeholder="Nom" value={addressDetails?.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="address1" type="text" placeholder="Adresse 1" value={addressDetails?.address1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="address2" type="text" placeholder="Adresse 2 (optionnelle)" value={addressDetails?.address2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="city" type="text" placeholder="Ville" value={addressDetails?.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="postalCode" type="text" placeholder="Code postal" value={addressDetails?.postalCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="region" type="text" placeholder="Région" value={addressDetails?.region} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="country" type="text" placeholder="Pays" value={addressDetails?.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="phone" type="text" placeholder="Téléphone" value={addressDetails?.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <select name="type" value={addressDetails?.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="Livraison">Livraison</option>
            <option value="Paiement">Paiement</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Soumettre</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopupForAddress;
