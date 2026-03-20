'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelCn?: string;
  error?: string;
  options: { value: string; label: string; labelCn?: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, labelCn, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#2d3748] mb-1">
            {label}
            {labelCn && <span className="text-[#c9a962] ml-1 text-xs">{labelCn}</span>}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#c9a962] focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          ref={ref}
          {...props}
        >
          <option value="">Select / 选择</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {option.labelCn ? ` ${option.labelCn}` : ''}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
