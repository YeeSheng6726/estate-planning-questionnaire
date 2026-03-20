'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  title: string;
  titleCn: string;
  subtitle: string;
  prefix: 'trustee' | 'substituteTrustee';
}

export function TrusteeSection({ register, errors, watch, title, titleCn, subtitle, prefix }: Props) {
  const trusteeData = watch(prefix);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">{title}</span>
          <span className="text-[#c9a962] ml-2">{titleCn}</span>
        </p>
      </div>

      <RadioGroup
        label="Appointment Type"
        labelCn="委任类型"
        options={[
          { value: 'spouse', label: 'Spouse', labelCn: '配偶' },
          { value: 'adultChild', label: 'Adult Child', labelCn: '成年子女' },
          { value: 'professional', label: 'Professional/Company', labelCn: '专业人士/公司' },
          { value: 'other', label: 'Other', labelCn: '其他' },
        ]}
        {...register(`${prefix}.appointmentType`)}
      />

      {trusteeData?.appointmentType === 'other' && (
        <Input
          label="Please provide details"
          labelCn="若选择其他，请提供资料"
          placeholder="e.g., Friend, relative, etc."
          {...register(`${prefix}.otherDetails`)}
        />
      )}

      {trusteeData?.appointmentType !== 'spouse' && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="font-medium text-[#1e3a5f] mb-4">{subtitle}</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name as per NRIC"
                labelCn="姓名"
                placeholder="As per NRIC"
                {...register(`${prefix}.fullName`)}
              />

              <Input
                label="NRIC"
                labelCn="身份证号码"
                placeholder="e.g., 700101-01-1234"
                {...register(`${prefix}.nric`)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Relationship"
                labelCn="关系"
                placeholder="e.g., Spouse, Son, etc."
                {...register(`${prefix}.relationship`)}
              />

              <Input
                label="Mobile No."
                labelCn="电话号码"
                type="tel"
                placeholder="+60123456789"
                {...register(`${prefix}.mobileNo`)}
              />
            </div>

            <Input
              label="Residential Address"
              labelCn="住宅地址"
              placeholder="Complete residential address"
              {...register(`${prefix}.address`)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
