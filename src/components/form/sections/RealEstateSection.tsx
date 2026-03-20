'use client';

import { useCallback, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormData, RealEstate } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function RealEstateSection({ register, setValue, watch }: Props) {
  const properties: RealEstate[] = watch('realEstate') || [];
  const allNotApplicable = properties.length > 0 && properties.every(p => p.isNotApplicable);

  useEffect(() => {
    if (properties.length === 0) {
      const defaultProperty: RealEstate = {
        id: `${Date.now()}-default`,
        isNotApplicable: false,
        propertyType: '',
        propertyTypeOther: '',
        ownership: 'sole',
        ownershipOther: '',
        address: '',
        mainBeneficiaries: '',
        substituteBeneficiaries: '',
        hasMortgageInsurance: false,
      };
      setValue('realEstate', [defaultProperty]);
    }
  }, []);

  const addProperty = useCallback(() => {
    const newProperty: RealEstate = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      isNotApplicable: false,
      propertyType: '',
      propertyTypeOther: '',
      ownership: 'sole',
      ownershipOther: '',
      address: '',
      mainBeneficiaries: '',
      substituteBeneficiaries: '',
      hasMortgageInsurance: false,
    };
    setValue('realEstate', [...properties, newProperty]);
  }, [properties, setValue]);

  const removeProperty = useCallback((index: number) => {
    if (properties.length <= 1) return;
    const updated = properties.filter((_, i) => i !== index);
    setValue('realEstate', updated);
  }, [properties, setValue]);

  const toggleAllNotApplicable = useCallback((checked: boolean) => {
    if (checked) {
      const updated = properties.map(p => ({ ...p, isNotApplicable: true }));
      setValue('realEstate', updated);
    }
  }, [properties, setValue]);

  const propertyTypes = [
    { value: 'Condominium', label: 'Condominium', labelCn: '公寓' },
    { value: 'Landed Property', label: 'Landed Property', labelCn: '有地住宅' },
    { value: 'Commercial', label: 'Commercial', labelCn: '商业地产' },
    { value: 'Industrial', label: 'Industrial', labelCn: '工业地产' },
    { value: 'Land', label: 'Land', labelCn: '土地' },
    { value: 'Other', label: 'Other', labelCn: '其它' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Real Estate / Properties</span>
          <span className="text-[#c9a962] ml-2">房地产</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          List all properties you own. Maximum 6 properties.
          <span className="text-[#c9a962] ml-1">请列出您拥有的所有房产，最多6处。</span>
        </p>
      </div>

      <Checkbox
        label="Tick if Not Applicable"
        labelCn="若不适用，请勾选"
        checked={allNotApplicable}
        onChange={toggleAllNotApplicable}
      />

      <div className="space-y-4">
        {properties.map((property, index) => (
          <div key={property.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-[#1e3a5f]">
                Property {index + 1} / 房产 {index + 1}
              </h4>
              {properties.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeProperty(index)}
                  className="text-red-500 border-red-300 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Checkbox
                label="Not Applicable"
                labelCn="不适用"
                checked={property.isNotApplicable}
                onChange={(checked) => setValue(`realEstate.${index}.isNotApplicable`, checked)}
              />

              {!property.isNotApplicable && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Select
                        label="Property Type"
                        labelCn="物业类型"
                        options={propertyTypes}
                        {...register(`realEstate.${index}.propertyType`)}
                      />
                      {property.propertyType === 'Other' && (
                        <Input
                          label="Please specify"
                          labelCn="请注明"
                          placeholder="Enter property type"
                          {...register(`realEstate.${index}.propertyTypeOther`)}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <RadioGroup
                        label="Ownership"
                        labelCn="拥有权"
                        options={[
                          { value: 'sole', label: 'Sole Name', labelCn: '个人' },
                          { value: 'joint', label: 'Joint Name', labelCn: '联名' },
                        ]}
                        horizontal
                        {...register(`realEstate.${index}.ownership`)}
                      />
                      {property.ownership === 'joint' && (
                        <Input
                          label="Please specify"
                          labelCn="请注明"
                          placeholder="Joint owner name(s)"
                          {...register(`realEstate.${index}.ownershipOther`)}
                        />
                      )}
                    </div>
                  </div>

                  <Input
                    label="Full Address"
                    labelCn="完整地址"
                    placeholder="Complete property address"
                    {...register(`realEstate.${index}.address`)}
                  />

                  <Input
                    label="Main Beneficiary(ies) + Distribution"
                    labelCn="主要受益人 + 分配额"
                    placeholder="e.g., John 50%, Mary 50%"
                    {...register(`realEstate.${index}.mainBeneficiaries`)}
                  />

                  <Input
                    label="Substitute Beneficiary(ies) + Distribution"
                    labelCn="代替受益人 + 分配额"
                    placeholder="e.g., Peter 100%"
                    {...register(`realEstate.${index}.substituteBeneficiaries`)}
                  />

                  <Checkbox
                    label="Has mortgage insurance (MRTA/Life Insurance)"
                    labelCn="已有房贷保险覆盖"
                    checked={property.hasMortgageInsurance}
                    onChange={(checked) => setValue(`realEstate.${index}.hasMortgageInsurance`, checked)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!allNotApplicable && properties.length < 6 && (
        <Button
          type="button"
          variant="secondary"
          onClick={addProperty}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Property / 添加房产
        </Button>
      )}

      {properties.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No properties added yet</p>
          <Button type="button" variant="secondary" onClick={addProperty}>
            <Plus size={16} className="mr-2" />
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  );
}
