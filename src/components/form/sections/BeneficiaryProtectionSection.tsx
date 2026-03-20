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

export function BeneficiaryProtectionSection({ register, errors, setValue, watch }: Props) {
  const data = watch().beneficiaryProtection;
  const hasExclusions = data?.hasExclusions;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Beneficiary Protection</span>
          <span className="text-[#c9a962] ml-2">受益人保护</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Do you wish to exclude anyone from your estate? Are there any beneficiaries who require special protection?
          <span className="text-[#c9a962] ml-1">您是否希望将某些人排除在遗产继承之外？是否有需要特别保护的受益人？</span>
        </p>
      </div>

      <RadioGroup
        label="Do you have any exclusions or special protection needs?"
        labelCn="您是否有任何排除或特别保护需求？"
        options={[
          { value: 'true', label: 'Yes', labelCn: '是' },
          { value: 'notApplicable', label: 'Not Applicable', labelCn: '不适用' },
        ]}
        horizontal
        {...register('beneficiaryProtection.hasExclusions', {
          setValueAs: (v) => v === 'true' ? true : v === 'false' ? false : v,
        })}
      />

      {hasExclusions === true && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Textarea
            label="Please provide brief details"
            labelCn="请提供简要详情"
            placeholder="e.g., Excluding a child due to marital problems, special protection needed for beneficiary with debt issues, etc."
            rows={4}
            {...register('beneficiaryProtection.description')}
          />
        </div>
      )}
    </div>
  );
}
