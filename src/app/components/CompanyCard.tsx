import React from 'react';
import { Company } from '../../types/company';

const CompanyCard:React.FC<Company> = ({
  name,
  email,
  logoUrl,
}) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img alt="" src={logoUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{email}</p>
        </div>
      </div>
    </li>
  )
};

export default CompanyCard;