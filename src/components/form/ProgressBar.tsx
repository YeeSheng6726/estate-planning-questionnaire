'use client';

import { motion } from 'framer-motion';
import { Section } from '@/lib/types';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  sections: Section[];
  currentStep: number;
}

export function ProgressBar({ sections, currentStep }: ProgressBarProps) {
  const progress = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {sections.length}
        </span>
        <span className="text-sm font-medium text-[#1e3a5f]">
          {sections[currentStep]?.shortTitle}
        </span>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#c9a962] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`
                flex flex-col items-center
                ${index <= currentStep ? 'text-[#1e3a5f]' : 'text-gray-400'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                transition-all duration-300
                ${index < currentStep ? 'bg-[#1e3a5f] text-white' : ''}
                ${index === currentStep ? 'bg-[#c9a962] text-white ring-4 ring-[#c9a962]/20' : ''}
                ${index > currentStep ? 'bg-gray-200 text-gray-500' : ''}
              `}>
                {index < currentStep ? <Check size={14} /> : index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
