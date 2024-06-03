import React, { useRef } from 'react';
import { AccountInformationInputProps } from '@/app/interfaces/interfaces';



const AccountInformationInput: React.FC<AccountInformationInputProps> = ({
  id,
  label,
  type,
  value,
  handleFocus,
  handleModifyPersonalInformationClick
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 text-left">
        {label}
      </label>
      <div className="mt-2 flex">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          readOnly
          ref={inputRef}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 text-left"
        />
        <button
          className="pl-2"
          onClick={() => {
            handleFocus(inputRef);
            const newValue = prompt(`Nouveau ${label.toLowerCase()}:`, value);
            handleModifyPersonalInformationClick(newValue || '', id as 'name' | 'email', inputRef);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};

export default AccountInformationInput;
