'use client';

import { motion } from 'framer-motion';
import { Section } from '@/lib/types';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  sections: Section[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressBar({ sections, currentStep, onStepClick }: ProgressBarProps) {
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
              className="group relative flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  transition-all duration-300 cursor-pointer
                  ${index < currentStep ? 'bg-[#1e3a5f] text-white hover:bg-[#2d4a6f]' : ''}
                  ${index === currentStep ? 'bg-[#c9a962] text-white ring-4 ring-[#c9a962]/20' : ''}
                  ${index > currentStep ? 'bg-gray-200 text-gray-500 hover:bg-gray-300' : ''}
                `}
                title={section.title}
              >
                {index < currentStep ? <Check size={14} /> : index + 1}
              </button>
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="font-medium">{section.title}</div>
                <div className="text-gray-300">{section.titleCn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
