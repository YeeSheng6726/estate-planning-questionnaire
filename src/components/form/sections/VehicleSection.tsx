'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormData, Vehicle } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function VehicleSection({ register, errors, setValue, watch }: Props) {
  const vehicles = watch().vehicles || [];
  const allDistributedEqually = vehicles.length > 0 && vehicles.every(v => v.distributeEqually);

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plateNumber: '',
      distributeEqually: allDistributedEqually,
      beneficiary: '',
      substituteBeneficiary: '',
    };
    setValue('vehicles', [...vehicles, newVehicle]);
  };

  const removeVehicle = (index: number) => {
    const updated = vehicles.filter((_, i) => i !== index);
    setValue('vehicles', updated);
  };

  const toggleAllDistributedEqually = (checked: boolean) => {
    const updated = vehicles.map(v => ({ ...v, distributeEqually: checked }));
    setValue('vehicles', updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Personal Vehicles / Motor Vehicles</span>
          <span className="text-[#c9a962] ml-2">私人轿车/机动车</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          List all your vehicles. Maximum 6 vehicles.
          <span className="text-[#c9a962] ml-1">请列出您的所有车辆，最多6辆。</span>
        </p>
      </div>

      <Checkbox
        label="Tick if ALL vehicles to be sold and distributed equally"
        labelCn="若需出售所有车辆并平均分配，请勾选此项"
        checked={allDistributedEqually}
        onChange={toggleAllDistributedEqually}
      />

      <div className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <div key={vehicle.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-[#1e3a5f]">
                Vehicle {index + 1} / 车辆 {index + 1}
              </h4>
              {vehicles.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeVehicle(index)}
                  className="text-red-500 border-red-300 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Input
                label="Plate Number"
                labelCn="车牌号码"
                placeholder="e.g., ABC 1234"
                error={errors.vehicles?.[index]?.plateNumber?.message}
                {...register(`vehicles.${index}.plateNumber`)}
              />

              {!allDistributedEqually && (
                <>
                  <Checkbox
                    label="Sell and distribute equally"
                    labelCn="出售并平均分配"
                    checked={vehicle.distributeEqually}
                    onChange={(checked) => setValue(`vehicles.${index}.distributeEqually`, checked)}
                  />

                  {!vehicle.distributeEqually && (
                    <>
                      <Input
                        label="Beneficiary Full Name"
                        labelCn="受益人姓名"
                        placeholder="Enter beneficiary name"
                        {...register(`vehicles.${index}.beneficiary`)}
                      />
                      
                      <Input
                        label="Substitute Beneficiary"
                        labelCn="代替受益人"
                        placeholder="Enter substitute beneficiary"
                        {...register(`vehicles.${index}.substituteBeneficiary`)}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {vehicles.length < 6 && (
        <Button
          type="button"
          variant="outline"
          onClick={addVehicle}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Vehicle / 添加车辆
        </Button>
      )}

      {vehicles.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No vehicles added yet</p>
          <Button type="button" variant="secondary" onClick={addVehicle}>
            <Plus size={16} className="mr-2" />
            Add Your First Vehicle
          </Button>
        </div>
      )}
    </div>
  );
}
