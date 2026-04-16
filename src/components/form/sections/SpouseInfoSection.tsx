'use client';

import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function SpouseInfoSection({ register, watch, setValue }: Props) {
  const spouseData = watch('spouseInfo');
  const maritalStatus = watch('personalInfo.maritalStatus');
  const isMarried = maritalStatus === 'Married' || maritalStatus === 'Contemplation';
  const gender = spouseData?.gender;
  const religion = spouseData?.religion;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Spouse Information</span>
          <span className="text-[#c9a962] ml-2">配偶信息</span>
        </p>
      </div>

      {!isMarried && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
          <p className="text-amber-800 text-sm">
            Note: This section is not applicable as you indicated you are not married.
          </p>
          <p className="text-amber-600 text-sm mt-1">
            注：如您未已婚，此部分不适用。
          </p>
        </div>
      )}

      <Checkbox
        label="Spouse Information Not Applicable"
        labelCn="配偶信息不适用"
        checked={!spouseData.isApplicable}
        onChange={(checked) => setValue('spouseInfo.isApplicable', !checked)}
      />

      {spouseData.isApplicable && (
        <div className="space-y-6 mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              labelCn="姓名"
              placeholder="As per NRIC"
              {...register('spouseInfo.fullName')}
            />

            <div className="space-y-2">
              <RadioGroup
                label="Gender"
                labelCn="性别"
                options={[
                  { value: 'male', label: 'Male', labelCn: '男性' },
                  { value: 'female', label: 'Female', labelCn: '女性' },
                  { value: 'others', label: 'Others', labelCn: '其它' },
                ]}
                horizontal
                {...register('spouseInfo.gender')}
              />
              {gender === 'others' && (
                <Input
                  label="Please specify"
                  labelCn="请注明"
                  placeholder="Enter gender"
                  {...register('spouseInfo.genderOther')}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              labelCn="生日日期"
              type="date"
              {...register('spouseInfo.dateOfBirth')}
            />

            <div className="space-y-2">
              <Select
                label="Religion"
                labelCn="宗教"
                options={[
                  { value: 'Buddhist', label: 'Buddhist', labelCn: '佛教徒' },
                  { value: 'Christian', label: 'Christian', labelCn: '基督教' },
                  { value: 'Islam', label: 'Islam', labelCn: '伊斯兰教' },
                  { value: 'Hindu', label: 'Hindu', labelCn: '印度教' },
                  { value: 'Catholic', label: 'Catholic', labelCn: '天主教' },
                  { value: 'Other', label: 'Other', labelCn: '其它' },
                ]}
                {...register('spouseInfo.religion')}
              />
              {religion === 'Other' && (
                <Input
                  label="Please specify"
                  labelCn="请注明"
                  placeholder="Enter religion"
                  {...register('spouseInfo.religionOther')}
                />
              )}
            </div>
          </div>

          <Input
            label="Residential Address"
            labelCn="住宅地址"
            placeholder="Complete address"
            {...register('spouseInfo.residentialAddress')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="NRIC No."
              labelCn="身份证号码"
              placeholder="e.g., 700101-01-1234"
              {...register('spouseInfo.nricNo')}
            />

            <div className="space-y-1">
              <Input
                label="Passport No."
                labelCn="护照号码"
                placeholder="If applicable"
                {...register('spouseInfo.passportNo')}
              />
              <p className="text-xs text-gray-500 italic">
                For foreigners / 外籍人士
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nationality / Residency"
              labelCn="国籍/居住地"
              {...register('spouseInfo.nationality')}
            />

            <Input
              label="Mobile No."
              labelCn="电话号码"
              type="tel"
              {...register('spouseInfo.mobileNo')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              labelCn="电子邮箱"
              type="email"
              {...register('spouseInfo.email')}
            />

            <Input
              label="Occupation"
              labelCn="职业"
              {...register('spouseInfo.occupation')}
            />
          </div>

          <Input
            label="Name of Employer"
            labelCn="公司名字"
            {...register('spouseInfo.employerName')}
          />
        </div>
      )}
    </div>
  );
}
