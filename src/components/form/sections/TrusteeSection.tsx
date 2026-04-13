'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Textarea } from '@/components/ui/Textarea';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  title: string;
  titleCn: string;
  subtitle: string;
  prefix: 'trustee' | 'substituteTrustee';
}

export function TrusteeSection({ register, watch, title, titleCn, subtitle, prefix }: Props) {
  const trusteeData = watch(prefix);
  const appointmentType = trusteeData?.appointmentType;
  const showDetails = appointmentType && appointmentType !== 'spouse';
  const isProfessional = appointmentType === 'professional';

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
          { value: 'professional', label: 'Professional Company', labelCn: '专业公司' },
          { value: 'other', label: 'Other', labelCn: '其他' },
        ]}
        {...register(`${prefix}.appointmentType`)}
      />

      {showDetails && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="font-medium text-[#1e3a5f] mb-4">{subtitle}</h4>

          {isProfessional ? (
            <div className="space-y-4">
              <Input
                label="Estate Planning Company / Trustee Company Name"
                labelCn="遗产规划公司/受托公司名称"
                placeholder="Enter company name"
                {...register(`${prefix}.fullName`)}
              />
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-medium text-[#1e3a5f] mb-4">Remarks / 备注</h4>
                <Textarea
                  label="Additional details not mentioned above"
                  labelCn="上述未提及的其他详情"
                  placeholder="Enter any additional details"
                  rows={3}
                  {...register(`${prefix}.remarks`)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
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

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-medium text-[#1e3a5f] mb-4">Remarks / 备注</h4>
                <Textarea
                  label="Additional details not mentioned above"
                  labelCn="上述未提及的其他详情"
                  placeholder="Enter any additional details"
                  rows={3}
                  {...register(`${prefix}.remarks`)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
