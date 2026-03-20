'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  title: string;
  titleCn: string;
  prefix: 'parentsTestator' | 'parentsSpouse';
}

export function ParentInfoSection({ register, errors, watch, title, titleCn, prefix }: Props) {
  const watchData = watch();
  const fatherStatus = watchData[prefix]?.fatherStatus;
  const motherStatus = watchData[prefix]?.motherStatus;
  
  const isSpouseParents = prefix === 'parentsSpouse';
  const showNotApplicable = isSpouseParents;

  const statusOptions = [
    { value: 'living', label: 'Living', labelCn: '在世' },
    { value: 'deceased', label: 'Deceased', labelCn: '已故' },
    ...(showNotApplicable ? [{ value: 'notApplicable', label: 'Not Applicable', labelCn: '不适用' }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">{title}</span>
          <span className="text-[#c9a962] ml-2">{titleCn}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-[#1e3a5f] mb-3">
            Father / 父亲
          </h4>
          <div className="space-y-4">
            <RadioGroup
              label="Status"
              labelCn="状况"
              options={statusOptions}
              horizontal
              {...register(`${prefix}.fatherStatus`)}
            />
            {fatherStatus !== 'deceased' && fatherStatus !== 'notApplicable' && (
              <Input
                label="Full Name"
                labelCn="姓名"
                placeholder="Father's name"
                {...register(`${prefix}.fatherName`)}
              />
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-[#1e3a5f] mb-3">
            Mother / 母亲
          </h4>
          <div className="space-y-4">
            <RadioGroup
              label="Status"
              labelCn="状况"
              options={statusOptions}
              horizontal
              {...register(`${prefix}.motherStatus`)}
            />
            {motherStatus !== 'deceased' && motherStatus !== 'notApplicable' && (
              <Input
                label="Full Name"
                labelCn="姓名"
                placeholder="Mother's name"
                {...register(`${prefix}.motherName`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
