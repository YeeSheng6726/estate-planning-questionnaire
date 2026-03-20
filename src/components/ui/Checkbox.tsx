'use client';

interface CheckboxProps {
  id?: string;
  label: string;
  labelCn?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ id, label, labelCn, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`
          w-5 h-5 border-2 rounded transition-all duration-200
          peer-checked:bg-[#1e3a5f] peer-checked:border-[#1e3a5f]
          peer-focus:ring-2 peer-focus:ring-[#c9a962] peer-focus:ring-offset-2
          ${checked ? 'bg-[#1e3a5f] border-[#1e3a5f]' : 'border-gray-300 bg-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}>
          {checked && (
            <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-[#2d3748] group-hover:text-[#1e3a5f] transition-colors">
        {label}
        {labelCn && <span className="text-[#c9a962] text-xs ml-1">{labelCn}</span>}
      </span>
    </label>
  );
}
