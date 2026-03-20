'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormData } from '@/lib/types';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}

export function BusinessAssetsSection({ register, errors, setValue, watch }: Props) {
  const data = watch().businessAssets;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a962]/5 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#2d3748]">
          <span className="font-semibold">Business & Other Assets</span>
          <span className="text-[#c9a962] ml-2">商业与其他资产</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Please provide details of your business ownership and other assets.
          <span className="text-[#c9a962] ml-1">请提供您的商业权益及其他资产详情。</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <Checkbox
            label="I own a business / business interests"
            labelCn="我拥有企业或商业权益"
            checked={data.hasBusiness}
            onChange={(checked) => setValue('businessAssets.hasBusiness', checked)}
          />

          {data.hasBusiness && (
            <div className="mt-4 space-y-4">
              <Textarea
                label="Please describe"
                labelCn="请描述"
                placeholder="e.g., Hold 30% of shares in ABC Sdn Bhd with other shareholders"
                rows={2}
                {...register('businessAssets.businessDescription')}
              />

              <Checkbox
                label="I have a Succession Plan"
                labelCn="我已有继任计划"
                checked={data.hasSuccessionPlan || false}
                onChange={(checked) => setValue('businessAssets.hasSuccessionPlan', checked)}
              />
            </div>
          )}
        </div>

        <Textarea
          label="Collectibles / Valuables"
          labelCn="收藏品/贵重物品"
          placeholder="e.g., Art collection, jewelry, watches, etc."
          rows={2}
          {...register('businessAssets.collectibles')}
        />

        <Textarea
          label="Digital Assets"
          labelCn="数字资产"
          placeholder="e.g., Cryptocurrency wallets, online accounts, digital properties"
          rows={2}
          {...register('businessAssets.digitalAssets')}
        />

        <Textarea
          label="Guarantees Given"
          labelCn="担保责任"
          placeholder="Any personal guarantees given for loans or obligations"
          rows={2}
          {...register('businessAssets.guarantees')}
        />

        <Textarea
          label="Other Obligations"
          labelCn="其他义务"
          placeholder="Any other financial obligations or commitments"
          rows={2}
          {...register('businessAssets.otherObligations')}
        />
      </div>
    </div>
  );
}
