export interface PersonalInfo {
  fullName: string;
  gender: '' | 'male' | 'female' | 'others';
  genderOther: string;
  dateOfBirth: string;
  religion: string;
  religionOther: string;
  residentialAddress: string;
  nricNo: string;
  passportNo: string;
  nationality: string;
  mobileNo: string;
  email: string;
  maritalStatus: string;
  dateOfMarriage: string;
  occupation: string;
  employerName: string;
}

export interface SpouseInfo extends Omit<PersonalInfo, 'fullName'> {
  isApplicable: boolean;
  fullName: string;
}

export interface ParentInfo {
  fatherStatus: '' | 'living' | 'deceased' | 'notApplicable';
  fatherName: string;
  motherStatus: '' | 'living' | 'deceased' | 'notApplicable';
  motherName: string;
}

export interface Beneficiary {
  id: string;
  fullName: string;
  relationship: string;
  relationshipOther: string;
  nric: string;
  mobileNo: string;
  address: string;
}

export interface FinancialDependent {
  hasDependents: string;
  description: string;
}

export interface BeneficiaryProtection {
  hasExclusions: string;
  description: string;
}

export interface RealEstate {
  id: string;
  isNotApplicable: boolean;
  propertyType: string;
  propertyTypeOther: string;
  ownership: '' | 'sole' | 'joint';
  ownershipOther: string;
  address: string;
  mainBeneficiaries: string;
  substituteBeneficiaries: string;
  hasMortgageInsurance: boolean;
}

export interface BankAccount {
  id: string;
  bankName: string;
  distributeEqually: boolean;
  mainBeneficiaries: string;
  substituteBeneficiaries: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  distributeEqually: boolean;
  beneficiary: string;
  substituteBeneficiary: string;
}

export interface Investments {
  localInvestmentAccount: string;
  foreignInvestmentAccount: string;
  unitTrust: string;
  sspn: string;
  prs: string;
  prsNominationCompleted: string;
  prsMainBeneficiary: string;
  prsSubBeneficiary: string;
  prsDistribution: string;
  prsRemarks: string;
  insuranceNominationCompleted: string;
  insuranceRemarks: string;
  epfNominationCompleted: string;
  epfRemarks: string;
}

export interface BusinessAssets {
  hasBusiness: string;
  businessDescription: string;
  collectibles: string;
  digitalAssets: string;
  guarantees: string;
  otherObligations: string;
}

export interface Executor {
  appointmentType: '' | 'spouse' | 'adultChild' | 'professional' | 'other';
  otherDetails: string;
  fullName: string;
  nric: string;
  relationship: string;
  mobileNo: string;
  address: string;
  remarks: string;
}

export interface Trustee {
  appointmentType: '' | 'spouse' | 'adultChild' | 'professional' | 'other';
  otherDetails: string;
  fullName: string;
  nric: string;
  relationship: string;
  mobileNo: string;
  address: string;
  remarks: string;
}

export interface Guardian {
  appointmentType: '' | 'spouse' | 'adultChild' | 'professional' | 'other';
  otherDetails: string;
  fullName: string;
  nric: string;
  relationship: string;
  mobileNo: string;
  address: string;
  remarks: string;
}

export interface SpecialConsiderations {
  educationFund: string;
  childrenInheritanceAge: string;
  parentsNeedSupport: string;
  parentsSupportDetails: string;
  hasSpecialNeedsDependents: string;
  specialNeedsDetails: string;
  wantTrustee: string;
  additionalDetails: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  spouseInfo: SpouseInfo;
  parentsTestator: ParentInfo;
  parentsSpouse: ParentInfo;
  noOfLegitimateChildren: number;
  beneficiaries: Beneficiary[];
  financialDependent: FinancialDependent;
  beneficiaryProtection: BeneficiaryProtection;
  realEstate: RealEstate[];
  bankAccounts: BankAccount[];
  vehicles: Vehicle[];
  investments: Investments;
  businessAssets: BusinessAssets;
  executor: Executor;
  substituteExecutor: Executor;
  trustee: Trustee;
  substituteTrustee: Trustee;
  guardian: Guardian;
  specialConsiderations: SpecialConsiderations;
}

export interface Section {
  id: number;
  title: string;
  titleCn: string;
  shortTitle: string;
}
