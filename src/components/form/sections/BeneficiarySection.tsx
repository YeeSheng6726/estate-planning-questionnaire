'use client';

import { useCallback, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FormData, Beneficiary } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function BeneficiarySection({ register, setValue, watch }: Props) {
  const beneficiaries: Beneficiary[] = watch('beneficiaries') || [];

  useEffect(() => {
    if (beneficiaries.length === 0) {
      const defaultBeneficiary: Beneficiary = {
        id: `${Date.now()}-default`,
        fullName: '',
        relationship: '',
        relationshipOther: '',
        nric: '',
        mobileNo: '',
        address: '',
      };
      setValue('beneficiaries', [defaultBeneficiary], { shouldValidate: false });
    }
  }, []);

  const addBeneficiary = useCallback(() => {
    const newBeneficiary: Beneficiary = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      fullName: '',
      relationship: '',
      relationshipOther: '',
      nric: '',
      mobileNo: '',
      address: '',
    };
    const updated = [...beneficiaries, newBeneficiary];
    setValue('beneficiaries', updated, { shouldValidate: false });
  }, [beneficiaries, setValue]);

  const removeBeneficiary = useCallback((index: number) => {
    if (beneficiaries.length <= 1) return;
    const updated = beneficiaries.filter((_, i) => i !== index);
    setValue('beneficiaries', updated, { shouldValidate: false });
  }, [beneficiaries, setValue]);

  const relationshipOptions = [
    { value: 'Son', label: 'Son', labelCn: '儿子' },
    { value: 'Daughter', label: 'Daughter', labelCn: '女儿' },
    { value: 'Spouse', label: 'Spouse', labelCn: '配偶' },
    { value: 'Father', label: 'Father', labelCn: '父亲' },
    { value: 'Mother', label: 'Mother', labelCn: '母亲' },
    { value: 'Sibling', label: 'Sibling', labelCn: '兄弟姐妹' },
    { value: 'Grandchild', label: 'Grandchild', labelCn: '孙子女' },
    { value: 'Other', label: 'Other', labelCn: '其它' },
  ];

  const childCountOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Children & Beneficiaries</span>
          <span className="text-[#c9a962] ml-2">子女及受益人</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Add your children and other beneficiaries. Maximum 10.
          <span className="text-[#c9a962] ml-1">请添加您的子女及其他受益人，最多10位。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="No. of Legitimate Children"
          labelCn="合法子女人数"
          options={childCountOptions}
          {...register('noOfLegitimateChildren')}
        />
      </div>

      <div className="space-y-4">
        {beneficiaries.map((beneficiary, index) => {
          const relationshipKey = `beneficiaries.${index}.relationship` as const;
          const currentRelationship = beneficiary.relationship;

          return (
            <div key={beneficiary.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-[#1e3a5f]">
                  Beneficiary {index + 1} / 受益人 {index + 1}
                </h4>
                {beneficiaries.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBeneficiary(index)}
                    className="text-red-500 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    labelCn="姓名"
                    placeholder="As per NRIC"
                    {...register(`beneficiaries.${index}.fullName` as const)}
                  />

                  <div className="space-y-2">
                    <Select
                      label="Relationship"
                      labelCn="关系"
                      options={relationshipOptions}
                      {...register(relationshipKey)}
                    />
                    {currentRelationship === 'Other' && (
                      <Input
                        label="Please specify"
                        labelCn="请注明"
                        placeholder="Enter relationship"
                        {...register(`beneficiaries.${index}.relationshipOther` as const)}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="NRIC No."
                    labelCn="身份证号码"
                    placeholder="e.g., 700101-01-1234"
                    {...register(`beneficiaries.${index}.nric` as const)}
                  />

                  <Input
                    label="Mobile No."
                    labelCn="电话号码"
                    type="tel"
                    {...register(`beneficiaries.${index}.mobileNo` as const)}
                  />
                </div>

                <Input
                  label="Residential Address"
                  labelCn="住宅地址"
                  {...register(`beneficiaries.${index}.address` as const)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {beneficiaries.length < 10 && (
        <Button
          type="button"
          variant="secondary"
          onClick={addBeneficiary}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Beneficiary / 添加受益人
        </Button>
      )}
    </div>
  );
}
