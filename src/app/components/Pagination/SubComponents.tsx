'use client';

import React, {ReactNode} from 'react';

interface PageControllerButtonProps {
  onClick: () => void,
  isDisabled?: boolean,
  isCurrent?: boolean,
  children: ReactNode;
}

export const PageControllerButton: React.FC<PageControllerButtonProps> = ({
  onClick,
  isDisabled = false,
  children
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      aria-current="page"
      className={`relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
    >
      {children}
    </button>
  )
};

export const PageNumberButton: React.FC<PageControllerButtonProps> = ({
  onClick,
  isDisabled = false,
  isCurrent = false,
  children
}) => {
  const currentClassName = "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const defaultClassName = "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      aria-current="page"
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${isCurrent ? currentClassName : defaultClassName}`}
    >
      {children}
    </button>
  )
};
