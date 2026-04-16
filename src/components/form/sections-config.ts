import { Section } from '@/lib/types';

export const formSections: Section[] = [
  { id: 1, title: 'Personal Information', titleCn: '个人信息', shortTitle: 'Personal Info' },
  { id: 2, title: 'Spouse Information', titleCn: '配偶信息', shortTitle: 'Spouse Info' },
  { id: 3, title: "Spouse's Parents", titleCn: '配偶父母', shortTitle: "Spouse's Parents" },
  { id: 5, title: 'Children & Beneficiaries', titleCn: '子女及受益人', shortTitle: 'Beneficiaries' },
  { id: 6, title: 'Financial Dependents', titleCn: '经济依赖者', shortTitle: 'Dependents' },
  { id: 7, title: 'Beneficiary Protection', titleCn: '受益人保护', shortTitle: 'Protection' },
  { id: 8, title: 'Real Estate', titleCn: '房地产', shortTitle: 'Properties' },
  { id: 9, title: 'Bank Accounts', titleCn: '银行账户', shortTitle: 'Accounts' },
  { id: 10, title: 'Vehicles', titleCn: '车辆', shortTitle: 'Vehicles' },
  { id: 11, title: 'Investments & Insurance', titleCn: '投资与保险', shortTitle: 'Investments' },
  { id: 12, title: 'Business & Assets', titleCn: '商业与资产', shortTitle: 'Business' },
  { id: 13, title: 'Executor, Trustee & Guardian', titleCn: '执行人、受托人及监护人', shortTitle: 'Executor' },
  { id: 14, title: 'Special Considerations', titleCn: '特别考量', shortTitle: 'Special' },
];

export function getSectionTitle(section: Section): string {
  return `${section.title} ${section.titleCn}`;
}
