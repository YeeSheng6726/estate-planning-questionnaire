'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Textarea } from '@/components/ui/Textarea';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function FinancialDependentSection({ register, errors, setValue, watch }: Props) {
  const data = watch().financialDependent;
  const hasDependents = data?.hasDependents;

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

      <RadioGroup
        label="Do you have financial dependents?"
        labelCn="您是否有经济依赖者？"
        options={[
          { value: 'false', label: 'No', labelCn: '否' },
          { value: 'true', label: 'Yes', labelCn: '是' },
          { value: 'notApplicable', label: 'Not Applicable', labelCn: '不适用' },
        ]}
        horizontal
        {...register('financialDependent.hasDependents', {
          setValueAs: (v) => v === 'true' ? true : v === 'false' ? false : v,
        })}
      />

      {hasDependents === true && (
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
