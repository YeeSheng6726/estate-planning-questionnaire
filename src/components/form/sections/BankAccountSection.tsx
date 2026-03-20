'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormData, BankAccount } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function BankAccountSection({ register, errors, setValue, watch }: Props) {
  const accounts = watch().bankAccounts || [];

  const addAccount = () => {
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      bankName: '',
      distributeEqually: false,
      mainBeneficiaries: '',
      substituteBeneficiaries: '',
    };
    setValue('bankAccounts', [...accounts, newAccount]);
  };

  const removeAccount = (index: number) => {
    const updated = accounts.filter((_, i) => i !== index);
    setValue('bankAccounts', updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Bank Accounts</span>
          <span className="text-[#c9a962] ml-2">银行户口</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          List all your bank accounts. Maximum 5 accounts.
          <span className="text-[#c9a962] ml-1">请列出您的所有银行账户，最多5个。</span>
        </p>
      </div>

      <Checkbox
        label="Tick if ALL bank accounts to be distributed equally"
        labelCn="若所有银行账户均需平均分配，请勾选此项"
        checked={accounts.every(a => a.distributeEqually)}
        onChange={(checked) => {
          const updated = accounts.map(a => ({ ...a, distributeEqually: checked }));
          setValue('bankAccounts', updated);
        }}
      />

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-[#1e3a5f]">
                Bank Account {index + 1} / 银行户口 {index + 1}
              </h4>
              {accounts.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAccount(index)}
                  className="text-red-500 border-red-300 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Input
                label="Bank Name & Account Number"
                labelCn="银行名称及账号"
                placeholder="e.g., Maybank 1234567890"
                error={errors.bankAccounts?.[index]?.bankName?.message}
                {...register(`bankAccounts.${index}.bankName`)}
              />

              <Checkbox
                label="Distribute equally among beneficiaries"
                labelCn="平均分配给受益人"
                checked={account.distributeEqually}
                onChange={(checked) => setValue(`bankAccounts.${index}.distributeEqually`, checked)}
              />

              {!account.distributeEqually && (
                <div className="space-y-4 pl-4 border-l-2 border-[#c9a962]/30">
                  <Input
                    label="Main Beneficiary(ies) + Distribution"
                    labelCn="主要受益人 + 分配额"
                    placeholder="e.g., John 50%, Mary 50%"
                    {...register(`bankAccounts.${index}.mainBeneficiaries`)}
                  />

                  <Input
                    label="Substitute Beneficiary(ies) + Distribution"
                    labelCn="代替受益人 + 分配额"
                    placeholder="e.g., Peter 100%"
                    {...register(`bankAccounts.${index}.substituteBeneficiaries`)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {accounts.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addAccount}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Bank Account / 添加银行户口
        </Button>
      )}

      {accounts.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No bank accounts added yet</p>
          <Button type="button" variant="secondary" onClick={addAccount}>
            <Plus size={16} className="mr-2" />
            Add Your First Bank Account
          </Button>
        </div>
      )}
    </div>
  );
}
