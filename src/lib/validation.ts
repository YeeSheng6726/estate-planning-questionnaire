import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(1),
  gender: z.enum(['male', 'female', 'others']),
  genderOther: z.string().optional(),
  dateOfBirth: z.string().min(1),
  religion: z.string().min(1),
  religionOther: z.string().optional(),
  residentialAddress: z.string().min(1),
  nricNo: z.string().optional(),
  passportNo: z.string().optional(),
  nationality: z.string().min(1),
  mobileNo: z.string().min(1),
  email: z.string().email(),
  maritalStatus: z.string().min(1),
  dateOfMarriage: z.string().optional(),
  occupation: z.string().min(1),
  employerName: z.string().optional(),
});

export const spouseInfoSchema = z.object({
  isApplicable: z.boolean(),
  fullName: z.string().optional(),
  gender: z.enum(['male', 'female', 'others']).optional(),
  genderOther: z.string().optional(),
  dateOfBirth: z.string().optional(),
  religion: z.string().optional(),
  religionOther: z.string().optional(),
  residentialAddress: z.string().optional(),
  nricNo: z.string().optional(),
  passportNo: z.string().optional(),
  nationality: z.string().optional(),
  mobileNo: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  maritalStatus: z.string().optional(),
  dateOfMarriage: z.string().optional(),
  occupation: z.string().optional(),
  employerName: z.string().optional(),
});

export const parentInfoSchema = z.object({
  fatherStatus: z.enum(['living', 'deceased', 'notApplicable']),
  fatherName: z.string().optional(),
  motherStatus: z.enum(['living', 'deceased', 'notApplicable']),
  motherName: z.string().optional(),
});

export const beneficiarySchema = z.object({
  id: z.string(),
  fullName: z.string().optional(),
  relationship: z.string().optional(),
  relationshipOther: z.string().optional(),
  nric: z.string().optional(),
  mobileNo: z.string().optional(),
  address: z.string().optional(),
});

export const financialDependentSchema = z.object({
  hasDependents: z.string().optional(),
  description: z.string().optional(),
});

export const beneficiaryProtectionSchema = z.object({
  hasExclusions: z.string().optional(),
  description: z.string().optional(),
});

export const realEstateSchema = z.object({
  id: z.string(),
  isNotApplicable: z.boolean(),
  propertyType: z.string().optional(),
  propertyTypeOther: z.string().optional(),
  ownership: z.enum(['sole', 'joint']).or(z.literal('')).optional(),
  ownershipOther: z.string().optional(),
  address: z.string().optional(),
  mainBeneficiaries: z.string().optional(),
  substituteBeneficiaries: z.string().optional(),
  hasMortgageInsurance: z.boolean(),
});

export const bankAccountSchema = z.object({
  id: z.string(),
  bankName: z.string().min(1),
  distributeEqually: z.boolean(),
  mainBeneficiaries: z.string().optional(),
  substituteBeneficiaries: z.string().optional(),
});

export const vehicleSchema = z.object({
  id: z.string(),
  plateNumber: z.string().min(1),
  distributeEqually: z.boolean(),
  beneficiary: z.string().optional(),
  substituteBeneficiary: z.string().optional(),
});

export const investmentsSchema = z.object({
  localInvestmentAccount: z.string().optional(),
  foreignInvestmentAccount: z.string().optional(),
  unitTrust: z.string().optional(),
  sspn: z.string().optional(),
  prs: z.string().optional(),
  prsNominationCompleted: z.string().optional(),
  prsMainBeneficiary: z.string().optional(),
  prsSubBeneficiary: z.string().optional(),
  prsDistribution: z.string().optional(),
  prsRemarks: z.string().optional(),
  insuranceNominationCompleted: z.string().min(1),
  insuranceRemarks: z.string().optional(),
  epfNominationCompleted: z.string().min(1),
  epfRemarks: z.string().optional(),
});

export const businessAssetsSchema = z.object({
  hasBusiness: z.string(),
  businessDescription: z.string().optional(),
  collectibles: z.string().optional(),
  digitalAssets: z.string().optional(),
  guarantees: z.string().optional(),
  otherObligations: z.string().optional(),
});

export const executorSchema = z.object({
  appointmentType: z.enum(['spouse', 'adultChild', 'professional', 'other']),
  otherDetails: z.string().optional(),
  fullName: z.string().optional(),
  nric: z.string().optional(),
  relationship: z.string().optional(),
  mobileNo: z.string().optional(),
  address: z.string().optional(),
  remarks: z.string().optional(),
});

export const trusteeSchema = z.object({
  appointmentType: z.enum(['spouse', 'adultChild', 'professional', 'other']),
  otherDetails: z.string().optional(),
  fullName: z.string().optional(),
  nric: z.string().optional(),
  relationship: z.string().optional(),
  mobileNo: z.string().optional(),
  address: z.string().optional(),
  remarks: z.string().optional(),
});

export const guardianSchema = z.object({
  appointmentType: z.enum(['spouse', 'adultChild', 'professional', 'other']),
  otherDetails: z.string().optional(),
  fullName: z.string().optional(),
  nric: z.string().optional(),
  relationship: z.string().optional(),
  mobileNo: z.string().optional(),
  address: z.string().optional(),
  remarks: z.string().optional(),
});

export const specialConsiderationsSchema = z.object({
  educationFund: z.string(),
  childrenInheritanceAge: z.string().optional(),
  parentsNeedSupport: z.string(),
  parentsSupportDetails: z.string().optional(),
  hasSpecialNeedsDependents: z.string(),
  specialNeedsDetails: z.string().optional(),
  wantTrustee: z.string(),
  additionalDetails: z.string().optional(),
});

export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  spouseInfo: spouseInfoSchema,
  parentsTestator: parentInfoSchema,
  parentsSpouse: parentInfoSchema,
  noOfLegitimateChildren: z.number(),
  beneficiaries: z.array(beneficiarySchema),
  financialDependent: financialDependentSchema,
  beneficiaryProtection: beneficiaryProtectionSchema,
  realEstate: z.array(realEstateSchema),
  bankAccounts: z.array(bankAccountSchema),
  vehicles: z.array(vehicleSchema),
  investments: investmentsSchema,
  businessAssets: businessAssetsSchema,
  executor: executorSchema,
  substituteExecutor: executorSchema,
  trustee: trusteeSchema,
  substituteTrustee: trusteeSchema,
  guardian: guardianSchema,
  specialConsiderations: specialConsiderationsSchema,
});
