'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Textarea } from '@/components/ui/Textarea';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function SpecialConsiderationsSection({ register, setValue, watch }: Props) {
  const data = watch().specialConsiderations;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Special Considerations</span>
          <span className="text-[#c9a962] ml-2">特别考量</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Additional information to help structure your estate plan.
          <span className="text-[#c9a962] ml-1">帮助规划您的遗产计划的其他信息。</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <Checkbox
            label="Are you considering establishing an education fund?"
            labelCn="您是否考虑设立教育基金？"
            checked={data.educationFund}
            onChange={(checked) => setValue('specialConsiderations.educationFund', checked)}
          />

          {data.educationFund && (
            <div className="mt-4">
              <Input
                label="At what age would you like your children to receive their inheritance?"
                labelCn="您希望子女在几岁时获得继承权？"
                placeholder="e.g., 25 years old"
                {...register('specialConsiderations.childrenInheritanceAge')}
              />
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <Checkbox
            label="Do your parents require your ongoing financial support?"
            labelCn="您的父母是否需要您的持续财务支持？"
            checked={data.parentsNeedSupport}
            onChange={(checked) => setValue('specialConsiderations.parentsNeedSupport', checked)}
          />

          {data.parentsNeedSupport && (
            <div className="mt-4">
              <Textarea
                label="Please provide brief details"
                labelCn="请提供简要详情"
                placeholder="e.g., Monthly allowance of RM2000 each"
                rows={2}
                {...register('specialConsiderations.parentsSupportDetails')}
              />
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <Checkbox
            label="Do you have dependents with disabilities or special needs?"
            labelCn="您是否有残障或特殊需求的受抚养人？"
            checked={data.hasSpecialNeedsDependents}
            onChange={(checked) => setValue('specialConsiderations.hasSpecialNeedsDependents', checked)}
          />

          {data.hasSpecialNeedsDependents && (
            <div className="mt-4">
              <Textarea
                label="Please provide brief details"
                labelCn="请提供简要详情"
                placeholder="Describe the nature of disability or special needs and support required"
                rows={2}
                {...register('specialConsiderations.specialNeedsDetails')}
              />
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <Checkbox
            label="Would you like to set up a trust (Trustee) for your beneficiaries?"
            labelCn="您是否希望为受益人设立信托（受托人）？"
            checked={data.wantTrustee}
            onChange={(checked) => setValue('specialConsiderations.wantTrustee', checked)}
          />
        </div>
      </div>

      <div className="bg-[#c9a962]/10 p-4 rounded-lg mt-6">
        <p className="text-sm text-[#2d3748]">
          <strong>Note:</strong> Any additional information or specific wishes regarding your estate plan can be noted during our consultation.
          <span className="text-[#c9a962] ml-1"><strong>注：</strong>任何关于遗产计划的其他信息或具体愿望可在我们的咨询中注明。</span>
        </p>
      </div>
    </div>
  );
}
