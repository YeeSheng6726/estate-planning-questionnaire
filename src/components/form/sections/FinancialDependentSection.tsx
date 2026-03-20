'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function FinancialDependentSection({ register, errors, setValue, watch }: Props) {
  const data = watch().financialDependent;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Financial Dependents</span>
          <span className="text-[#c9a962] ml-2">经济依赖者</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Are there any individuals (e.g., godchildren, distant relatives, friends) who rely on you financially?
          <span className="text-[#c9a962] ml-1">除了法定家庭成员外，是否有其他人士在经济上依赖您？</span>
        </p>
      </div>

      <Checkbox
        label="Yes, I have financial dependents"
        labelCn="有其他经济依赖者"
        checked={data.hasDependents}
        onChange={(checked) => setValue('financialDependent.hasDependents', checked)}
      />

      {data.hasDependents && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Textarea
            label="Please describe the nature of support"
            labelCn="请描述资助性质"
            placeholder="e.g., Monthly allowance to a friend, support for godchildren's education, etc."
            rows={4}
            {...register('financialDependent.description')}
          />
        </div>
      )}
    </div>
  );
}
