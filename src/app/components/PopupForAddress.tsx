import React from 'react';
import { Address } from '@/app/interfaces/interfaces';
import { PopupProps } from '@/app/interfaces/interfaces';

const PopupForAddress: React.FC<PopupProps> = ({ visible, onClose, onSubmit }) => {
  const [addressDetails, setAddressDetails] = React.useState({
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

  if (!visible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(addressDetails);
  };



  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Veuillez renseigner votre nouvelle adresse</h2>
        <div className="space-y-2">
          <input name="label" type="text" placeholder="Lieu" value={addressDetails.label} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="firstName" type="text" placeholder="Prénom" value={addressDetails.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="lastName" type="text" placeholder="Nom" value={addressDetails.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="address1" type="text" placeholder="Adresse 1" value={addressDetails.address1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="address2" type="text" placeholder="Adresse 2 (optionnelle)" value={addressDetails.address2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="city" type="text" placeholder="Ville" value={addressDetails.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="postalCode" type="text" placeholder="Code postal" value={addressDetails.postalCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="region" type="text" placeholder="Région" value={addressDetails.region} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="country" type="text" placeholder="Pays" value={addressDetails.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="phone" type="text" placeholder="Téléphone" value={addressDetails.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <select name="type" value={addressDetails.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
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
