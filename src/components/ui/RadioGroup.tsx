'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
  labelCn?: string;
  description?: string;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  labelCn?: string;
  options: RadioOption[];
  error?: string;
  horizontal?: boolean;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className = '', label, labelCn, options, error, horizontal, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#2d3748] mb-2">
            {label}
            {labelCn && <span className="text-[#c9a962] ml-1 text-xs">{labelCn}</span>}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className={horizontal ? 'flex flex-wrap gap-4' : 'space-y-2'}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`
                flex items-start gap-3 cursor-pointer group
                ${horizontal ? 'flex-1 min-w-[120px]' : ''}
              `}
            >
              <input
                type="radio"
                value={option.value}
                className="mt-1 w-4 h-4 text-[#1e3a5f] border-gray-300 focus:ring-[#c9a962] cursor-pointer"
                ref={ref}
                {...props}
              />
              <div className="flex-1">
                <span className="text-[#2d3748] group-hover:text-[#1e3a5f] transition-colors">
                  {option.label}
                  {option.labelCn && <span className="text-[#c9a962] text-xs ml-1">{option.labelCn}</span>}
                </span>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
