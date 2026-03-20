'use client';

import { useCallback, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormData, BankAccount } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function BankAccountSection({ register, setValue, watch }: Props) {
  const accounts: BankAccount[] = watch('bankAccounts') || [];
  const allDistributedEqually = accounts.length > 0 && accounts.every(a => a.distributeEqually);

  useEffect(() => {
    if (accounts.length === 0) {
      const defaultAccount: BankAccount = {
        id: `${Date.now()}-default`,
        bankName: '',
        distributeEqually: false,
        mainBeneficiaries: '',
        substituteBeneficiaries: '',
      };
      setValue('bankAccounts', [defaultAccount]);
    }
  }, []);

  const addAccount = useCallback(() => {
    const newAccount: BankAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      bankName: '',
      distributeEqually: allDistributedEqually,
      mainBeneficiaries: '',
      substituteBeneficiaries: '',
    };
    setValue('bankAccounts', [...accounts, newAccount]);
  }, [accounts, allDistributedEqually, setValue]);

  const removeAccount = useCallback((index: number) => {
    if (accounts.length <= 1) return;
    const updated = accounts.filter((_, i) => i !== index);
    setValue('bankAccounts', updated);
  }, [accounts, setValue]);

  const toggleAllDistributedEqually = useCallback((checked: boolean) => {
    const updated = accounts.map(a => ({ ...a, distributeEqually: checked }));
    setValue('bankAccounts', updated);
  }, [accounts, setValue]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Bank Accounts</span>
          <span className="text-[#c9a962] ml-2">银行户口</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          List all your bank accounts. Maximum 6 accounts.
          <span className="text-[#c9a962] ml-1">请列出您的所有银行账户，最多6个。</span>
        </p>
      </div>

      <Checkbox
        label="Tick if ALL bank accounts to be distributed equally"
        labelCn="若所有银行账户均需平均分配，请勾选此项"
        checked={allDistributedEqually}
        onChange={toggleAllDistributedEqually}
      />

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div key={account.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                {...register(`bankAccounts.${index}.bankName`)}
              />

              {!allDistributedEqually && (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {accounts.length < 6 && (
        <Button
          type="button"
          variant="secondary"
          onClick={addAccount}
          className="w-full"
        >
          <Plus size={16} className="mr-2" />
          Add Bank Account / 添加银行户口
        </Button>
      )}
    </div>
  );
}
