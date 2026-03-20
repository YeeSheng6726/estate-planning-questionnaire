'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FormData, Beneficiary } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function BeneficiarySection({ register, errors, setValue, watch }: Props) {
  const beneficiaries = watch().beneficiaries || [];

  const addBeneficiary = () => {
    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      fullName: '',
      relationship: '',
      relationshipOther: '',
      nric: '',
      mobileNo: '',
      address: '',
    };
    const updated = [...beneficiaries, newBeneficiary];
    setValue('beneficiaries', updated);
  };

  const removeBeneficiary = (index: number) => {
    const updated = beneficiaries.filter((_, i) => i !== index);
    setValue('beneficiaries', updated);
  };

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

       <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input
             label="No. of Children"
             labelCn="孩子数目"
             type="number"
             min="0"
             placeholder="0"
             {...register('beneficiaries', { valueAsNumber: true })}
           />
         </div>
       </div>
       
       <div className="space-y-4">
         {beneficiaries.length === 0 && (
           <div className="text-center p-6 bg-gray-50 rounded-lg">
             <p className="text-gray-500 mb-4">No beneficiaries added yet</p>
           </div>
         )}

        {beneficiaries.map((beneficiary, index) => (
          <div key={beneficiary.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-[#1e3a5f]">
                Beneficiary {index + 1} / 受益人 {index + 1}
              </h4>
              {beneficiaries.length > 0 && (
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
                  {...register(`beneficiaries.${index}.fullName`)}
                />

                <div className="space-y-2">
                  <Select
                    label="Relationship"
                    labelCn="关系"
                    options={relationshipOptions}
                    {...register(`beneficiaries.${index}.relationship`)}
                  />
                  {beneficiary.relationship === 'Other' && (
                    <Input
                      label="Please specify"
                      labelCn="请注明"
                      placeholder="Enter relationship"
                      {...register(`beneficiaries.${index}.relationshipOther`)}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="NRIC No."
                  labelCn="身份证号码"
                  placeholder="e.g., 700101-01-1234"
                  {...register(`beneficiaries.${index}.nric`)}
                />

                <Input
                  label="Mobile No."
                  labelCn="电话号码"
                  type="tel"
                  {...register(`beneficiaries.${index}.mobileNo`)}
                />
              </div>

              <Input
                label="Residential Address"
                labelCn="住宅地址"
                {...register(`beneficiaries.${index}.address`)}
              />
            </div>
          </div>
        ))}
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
