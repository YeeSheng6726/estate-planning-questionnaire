'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}

export function PersonalInfoSection({ register, errors, watch }: Props) {
  const watchData = watch();
  const gender = watchData.personalInfo?.gender;
  const religion = watchData.personalInfo?.religion;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Full Name as per NRIC</span>
          <span className="text-[#c9a962] ml-2">姓名</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          labelCn="姓名"
          placeholder="As per NRIC"
          error={errors.personalInfo?.fullName?.message}
          {...register('personalInfo.fullName')}
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
            error={errors.personalInfo?.gender?.message}
            horizontal
            {...register('personalInfo.gender')}
          />
          {gender === 'others' && (
            <Input
              label="Please specify"
              labelCn="请注明"
              placeholder="Enter your gender"
              {...register('personalInfo.genderOther')}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          labelCn="生日日期"
          type="date"
          error={errors.personalInfo?.dateOfBirth?.message}
          {...register('personalInfo.dateOfBirth')}
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
            error={errors.personalInfo?.religion?.message}
            {...register('personalInfo.religion')}
          />
          {religion === 'Other' && (
            <Input
              label="Please specify"
              labelCn="请注明"
              placeholder="Enter your religion"
              {...register('personalInfo.religionOther')}
            />
          )}
        </div>
      </div>

      <Input
        label="Residential Address"
        labelCn="住宅地址"
        placeholder="Complete address"
        error={errors.personalInfo?.residentialAddress?.message}
        {...register('personalInfo.residentialAddress')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="NRIC No."
          labelCn="身份证号码"
          placeholder="e.g., 700101-01-1234"
          {...register('personalInfo.nricNo')}
        />

        <div className="space-y-1">
          <Input
            label="Passport No."
            labelCn="护照号码"
            placeholder="If applicable / 如适用"
            {...register('personalInfo.passportNo')}
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
          placeholder="e.g., Malaysian"
          error={errors.personalInfo?.nationality?.message}
          {...register('personalInfo.nationality')}
        />

        <Input
          label="Mobile No."
          labelCn="电话号码"
          type="tel"
          placeholder="e.g., +60123456789"
          error={errors.personalInfo?.mobileNo?.message}
          {...register('personalInfo.mobileNo')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          labelCn="电子邮箱"
          type="email"
          placeholder="email@example.com"
          error={errors.personalInfo?.email?.message}
          {...register('personalInfo.email')}
        />

        <Select
          label="Marital Status"
          labelCn="婚姻状况"
          options={[
            { value: 'Single', label: 'Single', labelCn: '未婚' },
            { value: 'Married', label: 'Married', labelCn: '已婚' },
            { value: 'Divorced', label: 'Divorced', labelCn: '离异' },
            { value: 'Widowed', label: 'Widowed', labelCn: '丧偶' },
          ]}
          error={errors.personalInfo?.maritalStatus?.message}
          {...register('personalInfo.maritalStatus')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Occupation"
          labelCn="职业"
          placeholder="Your profession"
          error={errors.personalInfo?.occupation?.message}
          {...register('personalInfo.occupation')}
        />

        <Input
          label="Name of Employer"
          labelCn="公司名字"
          placeholder="Company name"
          {...register('personalInfo.employerName')}
        />
      </div>
    </div>
  );
}
