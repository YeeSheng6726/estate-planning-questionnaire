'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Save, CheckCircle } from 'lucide-react';

import { FormData } from '@/lib/types';
import { formSections, getSectionTitle } from './sections-config';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/Button';
import {
  PersonalInfoSection,
  SpouseInfoSection,
  ParentInfoSection,
  BeneficiarySection,
  FinancialDependentSection,
  BeneficiaryProtectionSection,
  RealEstateSection,
  BankAccountSection,
  VehicleSection,
  InvestmentsSection,
  BusinessAssetsSection,
  ExecutorSection,
  SpecialConsiderationsSection,
  TrusteeSection,
  GuardianSection,
} from './sections/index';

const defaultValues: FormData = {
  personalInfo: {
    fullName: '',
    gender: '',
    genderOther: '',
    dateOfBirth: '',
    religion: '',
    religionOther: '',
    residentialAddress: '',
    nricNo: '',
    passportNo: '',
    nationality: '',
    mobileNo: '',
    email: '',
    maritalStatus: '',
    dateOfMarriage: '',
    occupation: '',
    employerName: '',
  },
  spouseInfo: {
    isApplicable: true,
    fullName: '',
    gender: '',
    genderOther: '',
    dateOfBirth: '',
    religion: '',
    religionOther: '',
    residentialAddress: '',
    nricNo: '',
    passportNo: '',
    nationality: '',
    mobileNo: '',
    email: '',
    maritalStatus: '',
    dateOfMarriage: '',
    occupation: '',
    employerName: '',
  },
  parentsTestator: {
    fatherStatus: '',
    fatherName: '',
    motherStatus: '',
    motherName: '',
  },
  parentsSpouse: {
    fatherStatus: '',
    fatherName: '',
    motherStatus: '',
    motherName: '',
  },
  noOfLegitimateChildren: 0,
  beneficiaries: [],
  financialDependent: {
    hasDependents: '',
    description: '',
  },
  beneficiaryProtection: {
    hasExclusions: '',
    description: '',
  },
  realEstate: [],
  bankAccounts: [],
  vehicles: [],
  investments: {
    localInvestmentAccount: '',
    foreignInvestmentAccount: '',
    unitTrust: '',
    sspn: '',
    prs: '',
    prsNominationCompleted: '',
    prsMainBeneficiary: '',
    prsSubBeneficiary: '',
    prsDistribution: '',
    prsRemarks: '',
    insuranceNominationCompleted: '',
    insuranceRemarks: '',
    epfNominationCompleted: '',
    epfRemarks: '',
  },
  businessAssets: {
    hasBusiness: '',
    businessDescription: '',
    collectibles: '',
    digitalAssets: '',
    guarantees: '',
    otherObligations: '',
  },
  executor: {
    appointmentType: '',
    otherDetails: '',
    fullName: '',
    nric: '',
    relationship: '',
    mobileNo: '',
    address: '',
    remarks: '',
  },
  substituteExecutor: {
    appointmentType: '',
    otherDetails: '',
    fullName: '',
    nric: '',
    relationship: '',
    mobileNo: '',
    address: '',
    remarks: '',
  },
  trustee: {
    appointmentType: '',
    otherDetails: '',
    fullName: '',
    nric: '',
    relationship: '',
    mobileNo: '',
    address: '',
    remarks: '',
  },
  substituteTrustee: {
    appointmentType: '',
    otherDetails: '',
    fullName: '',
    nric: '',
    relationship: '',
    mobileNo: '',
    address: '',
    remarks: '',
  },
  guardian: {
    appointmentType: '',
    otherDetails: '',
    fullName: '',
    nric: '',
    relationship: '',
    mobileNo: '',
    address: '',
    remarks: '',
  },
  specialConsiderations: {
    educationFund: '',
    childrenInheritanceAge: '',
    parentsNeedSupport: '',
    parentsSupportDetails: '',
    hasSpecialNeedsDependents: '',
    specialNeedsDetails: '',
    wantTrustee: '',
    additionalDetails: '',
  },
};

export function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    const saved = localStorage.getItem('estate-planning-form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
          reset({
            ...defaultValues,
            ...parsed,
            beneficiaries: Array.isArray(parsed.beneficiaries) ? parsed.beneficiaries : [],
          });
        }
      } catch {
        console.log('Could not restore saved form data');
        localStorage.removeItem('estate-planning-form');
      }
    }
  }, [reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = watch();
      localStorage.setItem('estate-planning-form', JSON.stringify(data));
      setLastSaved(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.removeItem('estate-planning-form');
        router.push('/thank-you');
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch {
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderSection = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoSection register={register} errors={errors} watch={watch} />;
      case 1:
        return <SpouseInfoSection register={register} watch={watch} setValue={setValue} />;
      case 2:
        return <ParentInfoSection register={register} watch={watch} title="Testator's Parents" titleCn="立遗嘱人的父母" prefix="parentsTestator" />;
      case 3:
        return <ParentInfoSection register={register} watch={watch} title="Spouse's Parents" titleCn="配偶的父母" prefix="parentsSpouse" />;
      case 4:
        return <BeneficiarySection register={register} watch={watch} setValue={setValue} />;
      case 5:
        return <FinancialDependentSection register={register} watch={watch} />;
      case 6:
        return <BeneficiaryProtectionSection register={register} watch={watch} />;
      case 7:
        return <RealEstateSection register={register} watch={watch} setValue={setValue} />;
      case 8:
        return <BankAccountSection register={register} watch={watch} setValue={setValue} />;
      case 9:
        return <VehicleSection register={register} watch={watch} setValue={setValue} />;
      case 10:
        return <InvestmentsSection register={register} errors={errors} watch={watch} />;
      case 11:
        return <BusinessAssetsSection register={register} watch={watch} />;
      case 12:
        return (
          <div className="space-y-8">
            <ExecutorSection
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              title="Primary Executor"
              titleCn="主要遗嘱执行人"
              subtitle="Executor Details / 执行人详情"
              prefix="executor"
            />
            <ExecutorSection
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              title="Substitute Executor"
              titleCn="替代遗嘱执行人"
              subtitle="Substitute Executor Details / 替代遗嘱执行人详情"
              prefix="substituteExecutor"
            />
            <div className="border-t-2 border-[#c9a962] pt-6 mt-6">
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>PLEASE FILL IN THIS PART WHERE THE TRUSTEES AND EXECUTORS ARE DIFFERENT PERSONS</strong>
                  <br />
                  <span className="text-yellow-600">若受托人与遗嘱执行人为不同人士，请填写此部分</span>
                </p>
              </div>
              <TrusteeSection
                register={register}
                watch={watch}
                title="Primary Trustee"
                titleCn="主要受托人"
                subtitle="Trustee Details / 受托人详情"
                prefix="trustee"
              />
              <div className="mt-6">
                <TrusteeSection
                  register={register}
                  watch={watch}
                  title="Substitute Trustee"
                  titleCn="替代受托人"
                  subtitle="Substitute Trustee Details / 替代受托人详情"
                  prefix="substituteTrustee"
                />
              </div>
              <div className="mt-6 border-t-2 border-[#c9a962] pt-6">
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>GUARDIAN TO TESTATOR&apos;S MINOR CHILDREN UNDER 21 YEARS OLD</strong>
                    <br />
                    <span className="text-yellow-600">委托监护人于立遗嘱者二十一岁以下的孩子</span>
                  </p>
                </div>
                <GuardianSection
                  register={register}
                  watch={watch}
                  title="Guardian"
                  titleCn="监护人"
                  subtitle="Guardian Details / 监护人详情"
                  prefix="guardian"
                />
              </div>
            </div>
          </div>
        );
      case 13:
        return <SpecialConsiderationsSection register={register} watch={watch} setValue={setValue} />;
      default:
        return null;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-2">
              Estate Planning & Trust Discovery Questionnaire
            </h1>
            <p className="text-center text-gray-500 text-sm">
              遗产规划与信托设立深度咨询问卷
            </p>
          </div>

          <div className="mb-8 pb-6 border-b border-gray-200">
            <ProgressBar 
              sections={formSections} 
              currentStep={currentStep}
              onStepClick={(step) => setCurrentStep(step)}
            />
          </div>

          {(() => {
            const section = formSections[currentStep];
            return (
              <AnimatePresence mode="wait" custom={currentStep}>
                <motion.div
                  key={currentStep}
                  custom={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-[#1e3a5f]">
                      {getSectionTitle(section)}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {renderSection()}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        {lastSaved && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CheckCircle size={12} className="text-green-500" />
                            Saved {lastSaved.toLocaleTimeString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {currentStep > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={isSubmitting}
                          >
                            <ArrowLeft size={16} className="mr-2" />
                            Back
                          </Button>
                        )}

                        {currentStep < formSections.length - 1 ? (
                          <Button
                            type="button"
                            variant="primary"
                            onClick={nextStep}
                          >
                            Next
                            <ArrowRight size={16} className="ml-2" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="secondary"
                            isLoading={isSubmitting}
                          >
                            <Send size={16} className="mr-2" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            );
          })()}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Save size={12} />
            Your progress is automatically saved every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
