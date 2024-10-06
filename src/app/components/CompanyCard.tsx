import React from 'react';
import type { Company } from '../../types/company';

type CompanyCardProps = Company & {
  isSelected?: boolean,
  onSelect?: (companyId: string) => void;
};

const CompanyCard : React.FC<CompanyCardProps> = ({
  name,
  email,
  logoUrl,
  isSelected = false,
  onSelect,
}) => {
  const defaultLogo = "/default.png";

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="flex flex-1 min-w-0 gap-x-4">
        <img alt="" src={logoUrl ?? defaultLogo} className="h-12 w-12 flex-none object-contain rounded-full bg-cyan-400" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{email}</p>
        </div>
      </div>
    </li>
  )
};

export default CompanyCard;