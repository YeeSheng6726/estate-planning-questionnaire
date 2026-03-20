'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}

export function InvestmentsSection({ register, errors, watch }: Props) {
  const investments = watch('investments');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Investments & Insurance</span>
          <span className="text-[#c9a962] ml-2">投资与保险</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Please provide details of your investment accounts and insurance policies.
          <span className="text-[#c9a962] ml-1">请提供您的投资账户及保单详情。</span>
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Local Investment Account"
          labelCn="本地投资账户"
          placeholder="e.g., RHB Invest 123456789"
          {...register('investments.localInvestmentAccount')}
        />

        <Input
          label="Foreign Investment Account"
          labelCn="外国投资账户"
          placeholder="e.g., Interactive Brokers U1234567"
          {...register('investments.foreignInvestmentAccount')}
        />

        <Textarea
          label="Unit Trust / Mutual Funds"
          labelCn="单位信托/共同基金"
          placeholder="e.g., Public Mutual - various funds"
          rows={2}
          {...register('investments.unitTrust')}
        />

        <Input
          label="Skim Simpanan Pendidikan Nasional (SSPN)"
          labelCn="国民教育储蓄基金计划"
          placeholder="Account number if applicable"
          {...register('investments.sspn')}
        />

        <Input
          label="Private Retirement Scheme (PRS)"
          labelCn="私人退休基金"
          placeholder="Provider and account details"
          {...register('investments.prs')}
        />

        <Select
          label="Has the PRS nomination been completed?"
          labelCn="私人退休基金的指定受益人选已完成了吗？"
          options={[
            { value: 'Completed', label: 'Completed', labelCn: '已完成' },
            { value: 'Not Completed', label: 'Not Completed', labelCn: '未完成' },
            { value: 'Not Sure', label: 'Not Sure', labelCn: '不确定' },
            { value: 'Not Applicable', label: 'Not Applicable', labelCn: '不适用' },
          ]}
          {...register('investments.prsNominationCompleted')}
        />

        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-[#1e3a5f] text-sm">Beneficiary for All Investment / 所有投资的指定受益人</h5>
          <Input
            label="Main Beneficiary"
            labelCn="主要受益人"
            placeholder="Name of beneficiary"
            {...register('investments.prsMainBeneficiary')}
          />
          <Input
            label="Substitute Beneficiary"
            labelCn="替代受益人"
            placeholder="Name of substitute beneficiary"
            {...register('investments.prsSubBeneficiary')}
          />
          <Input
            label="Distribution"
            labelCn="分配额"
            placeholder="e.g., John 50%, Mary 50%"
            {...register('investments.prsDistribution')}
          />
          <Textarea
            label="Remarks"
            labelCn="备注"
            placeholder="Additional details"
            rows={2}
            {...register('investments.prsRemarks')}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h4 className="font-medium text-[#1e3a5f]">Insurance Nomination / 保险指定受益人</h4>
        
        <Select
          label="Has the insurance nomination been completed?"
          labelCn="保险的指定受益人选已完成了吗？"
          options={[
            { value: 'Completed', label: 'Completed', labelCn: '已完成' },
            { value: 'Not Completed', label: 'Not Completed', labelCn: '未完成' },
            { value: 'Not Sure', label: 'Not Sure', labelCn: '不确定' },
            { value: 'Not Applicable', label: 'Not Applicable', labelCn: '不适用' },
          ]}
          error={errors.investments?.insuranceNominationCompleted?.message}
          {...register('investments.insuranceNominationCompleted')}
        />

        <Textarea
          label="Remarks - Insurance Policies"
          labelCn="备注：保单"
          placeholder="List your insurance policies with policy numbers"
          rows={3}
          {...register('investments.insuranceRemarks')}
        />
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <h4 className="font-medium text-[#1e3a5f]">EPF Nomination / 公积金指定受益人</h4>
        
        <Select
          label="Has the EPF nomination been completed?"
          labelCn="公积金的指定受益人选已完成了吗？"
          options={[
            { value: 'Completed', label: 'Completed', labelCn: '已完成' },
            { value: 'Not Completed', label: 'Not Completed', labelCn: '未完成' },
            { value: 'Not Sure', label: 'Not Sure', labelCn: '不确定' },
            { value: 'Not Applicable', label: 'Not Applicable', labelCn: '不适用' },
          ]}
          error={errors.investments?.epfNominationCompleted?.message}
          {...register('investments.epfNominationCompleted')}
        />

        <Textarea
          label="Remarks - EPF"
          labelCn="备注：雇员公积金"
          placeholder="EPF account number and details"
          rows={2}
          {...register('investments.epfRemarks')}
        />
      </div>
    </div>
  );
}
