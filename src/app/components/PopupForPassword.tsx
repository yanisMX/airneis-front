import React, { useState } from 'react';
import {ChangePasswordPopupProps} from '@/app/interfaces/interfaces'

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ visible, onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!visible) return null;

  const handleSubmit = () => {
    onSubmit(oldPassword, newPassword);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Changer le mot de passe</h2>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Ancien mot de passe"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Soumettre
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
