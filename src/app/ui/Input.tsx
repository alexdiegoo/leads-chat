'use client'

import * as Label from '@radix-ui/react-label';
import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col">
      <Label.Root htmlFor={inputId} className="mb-1 text-gray-700 text-sm">
        {label}
      </Label.Root>
      <input
        id={inputId}
        className={clsx(
          "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500",
          className
        )}
        {...props}
      />
    </div>
  );
};
