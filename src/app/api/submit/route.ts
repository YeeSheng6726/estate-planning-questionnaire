import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://ys286.zeabur.app/webhook/45984f7b-5b79-4bff-b17c-1f770060cb2c';

function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `EP-${timestamp}-${randomPart}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformFormData(data: any, submissionId: string, submittedAt: string) {
  const genderLabels: Record<string, string> = {
    male: 'Male / 男性',
    female: 'Female / 女性',
    others: 'Others / 其它'
  };

  const maritalStatusLabels: Record<string, string> = {
    Single: 'Single / 未婚',
    Married: 'Married / 已婚',
    Contemplation: 'Contemplation of marriage / 即将结婚',
    Divorced: 'Divorced / 离异',
    Widowed: 'Widowed / 丧偶'
  };

  const statusLabels: Record<string, string> = {
    living: 'Living / 在生',
    deceased: 'Deceased / 已故',
    notApplicable: 'Not Applicable / 不适用'
  };

  const appointmentTypeLabels: Record<string, string> = {
    spouse: 'Spouse / 配偶',
    adultChild: 'Adult Child / 成年子女',
    professional: 'Professional / 专业人士',
    other: 'Other / 其他'
  };

  return {
    // Section 1: Personal Information / 个人信息
    "Section 1 - Personal Information / 第一部分 - 个人信息": {
      "Full Name / 姓名": data.personalInfo?.fullName || '',
      "Gender / 性别": genderLabels[data.personalInfo?.gender] || data.personalInfo?.gender || '',
      "Date of Birth / 出生日期": data.personalInfo?.dateOfBirth || '',
      "Religion / 宗教": data.personalInfo?.religion || '',
      "Residential Address / 住宅地址": data.personalInfo?.residentialAddress || '',
      "NRIC No. / 身份证号码": data.personalInfo?.nricNo || '',
      "Passport No. / 护照号码": data.personalInfo?.passportNo || '',
      "Nationality / 国籍": data.personalInfo?.nationality || '',
      "Mobile No. / 电话号码": data.personalInfo?.mobileNo || '',
      "Email / 电子邮箱": data.personalInfo?.email || '',
      "Marital Status / 婚姻状况": maritalStatusLabels[data.personalInfo?.maritalStatus] || data.personalInfo?.maritalStatus || '',
      "Date of Marriage / 结婚日期": data.personalInfo?.dateOfMarriage || '',
      "Occupation / 职业": data.personalInfo?.occupation || '',
      "Name of Employer / 公司名字": data.personalInfo?.employerName || ''
    },

    // Section 2: Spouse Information / 配偶信息
    "Section 2 - Spouse Information / 第二部分 - 配偶信息": {
      "Spouse Applicable / 配偶适用": data.spouseInfo?.isApplicable ? 'Yes / 是' : 'No / 否',
      "Spouse Full Name / 配偶姓名": data.spouseInfo?.fullName || '',
      "Spouse Gender / 配偶性别": genderLabels[data.spouseInfo?.gender] || '',
      "Spouse Date of Birth / 配偶出生日期": data.spouseInfo?.dateOfBirth || '',
      "Spouse Religion / 配偶宗教": data.spouseInfo?.religion || '',
      "Spouse Residential Address / 配偶住宅地址": data.spouseInfo?.residentialAddress || '',
      "Spouse NRIC / 配偶身份证": data.spouseInfo?.nricNo || '',
      "Spouse Passport No. / 配偶护照": data.spouseInfo?.passportNo || '',
      "Spouse Nationality / 配偶国籍": data.spouseInfo?.nationality || '',
      "Spouse Mobile No. / 配偶电话": data.spouseInfo?.mobileNo || '',
      "Spouse Email / 配偶邮箱": data.spouseInfo?.email || '',
      "Spouse Date of Marriage / 配偶结婚日期": data.spouseInfo?.dateOfMarriage || '',
      "Spouse Occupation / 配偶职业": data.spouseInfo?.occupation || '',
      "Spouse Name of Employer / 配偶公司名字": data.spouseInfo?.employerName || ''
    },

    // Section 3 & 4: Parents / 父母信息
    "Section 3 - Testator's Parents / 第三部分 - 立遗嘱人父母": {
      "Father Status / 父亲状况": statusLabels[data.parentsTestator?.fatherStatus] || '',
      "Father Name / 父亲姓名": data.parentsTestator?.fatherName || '',
      "Mother Status / 母亲状况": statusLabels[data.parentsTestator?.motherStatus] || '',
      "Mother Name / 母亲姓名": data.parentsTestator?.motherName || ''
    },
    "Section 4 - Spouse's Parents / 第四部分 - 配偶父母": {
      "Father Status / 父亲状况": statusLabels[data.parentsSpouse?.fatherStatus] || '',
      "Father Name / 父亲姓名": data.parentsSpouse?.fatherName || '',
      "Mother Status / 母亲状况": statusLabels[data.parentsSpouse?.motherStatus] || '',
      "Mother Name / 母亲姓名": data.parentsSpouse?.motherName || ''
    },

    // Section 5: Children & Beneficiaries / 子女及受益人
    "Section 5 - No. of Legitimate Children / 第五部分 - 合法子女人数": data.noOfLegitimateChildren || '0',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "Section 5 - Children & Beneficiaries / 第五部分 - 子女及受益人": data.beneficiaries?.map((b: any, index: number) => ({
      [`Beneficiary ${index + 1} / 受益人 ${index + 1}`]: {
        "Full Name / 姓名": b.fullName || '',
        "Relationship / 关系": b.relationship || '',
        "NRIC / 身份证": b.nric || '',
        "Mobile No. / 电话": b.mobileNo || '',
        "Address / 地址": b.address || ''
      }
    })) || [],

    // Section 6: Financial Dependent / 经济依赖者
    "Section 6 - Financial Dependent / 第六部分 - 经济依赖者": {
      "Has Financial Dependents / 是否有经济依赖者": data.financialDependent?.hasDependents === 'true' ? 'Yes / 是' : data.financialDependent?.hasDependents === 'notApplicable' ? 'Not Applicable / 不适用' : 'No / 否',
      "Details / 详情": data.financialDependent?.description || ''
    },

    // Section 7: Beneficiary Protection / 受益人保护
    "Section 7 - Beneficiary Protection / 第七部分 - 受益人保护": {
      "Has Exclusions or Special Protection / 是否有排除或特别保护": data.beneficiaryProtection?.hasExclusions === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Details / 详情": data.beneficiaryProtection?.description || ''
    },

    // Section 8: Real Estate / 房地产
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "Section 8 - Real Estate / 第八部分 - 房地产": data.realEstate?.map((r: any, index: number) => ({
      [`Property ${index + 1} / 房产 ${index + 1}`]: {
        "Not Applicable / 不适用": r.isNotApplicable ? 'Yes / 是' : 'No / 否',
        "Property Type / 物业类型": r.propertyType || '',
        "Ownership / 拥有权": r.ownership === 'sole' ? 'Sole Name / 个人' : 'Joint Name / 联名',
        "Joint Owner Name / 联名人姓名": r.ownershipOther || '',
        "Address / 地址": r.address || '',
        "Main Beneficiaries + Distribution / 主要受益人 + 分配": r.mainBeneficiaries || '',
        "Substitute Beneficiaries / 代替受益人": r.substituteBeneficiaries || '',
        "Has Mortgage Insurance / 已有房贷保险": r.hasMortgageInsurance ? 'Yes / 是' : 'No / 否',
        "Mortgage Fully Settled / 房贷已全额还清": r.isMortgageFullySettled ? 'Yes / 是' : 'No / 否'
      }
    })) || [],

    // Section 9: Bank Accounts / 银行账户
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "Section 9 - Bank Accounts / 第九部分 - 银行账户": data.bankAccounts?.map((b: any, index: number) => ({
      [`Bank Account ${index + 1} / 银行户口 ${index + 1}`]: {
        "Bank Name & Account No. / 银行名称及账号": b.bankName || '',
        "Distribute Equally / 平均分配": b.distributeEqually ? 'Yes / 是' : 'No / 否',
        "Main Beneficiaries + Distribution / 主要受益人 + 分配": b.mainBeneficiaries || '',
        "Substitute Beneficiaries / 代替受益人": b.substituteBeneficiaries || ''
      }
    })) || [],

    // Section 10: Vehicles / 车辆
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "Section 10 - Vehicles / 第十部分 - 车辆": data.vehicles?.map((v: any, index: number) => ({
      [`Vehicle ${index + 1} / 车辆 ${index + 1}`]: {
        "Plate Number / 车牌": v.plateNumber || '',
        "Distribute Equally / 平均分配": v.distributeEqually ? 'Yes / 是' : 'No / 否',
        "Beneficiary / 受益人": v.beneficiary || '',
        "Substitute Beneficiary / 代替受益人": v.substituteBeneficiary || ''
      }
    })) || [],

    // Section 11: Investments / 投资
    "Section 11 - Investments / 第十一部分 - 投资": {
      "Local Investment Account / 本地投资账户": data.investments?.localInvestmentAccount || '',
      "Foreign Investment Account / 外国投资账户": data.investments?.foreignInvestmentAccount || '',
      "Unit Trust / Mutual Funds / 单位信托/共同基金": data.investments?.unitTrust || '',
      "SSPN / 国民教育储蓄基金": data.investments?.sspn || '',
      "PRS / 私人退休基金": data.investments?.prs || '',
      "PRS Nomination Completed / 私人退休基金指定受益人已完成": data.investments?.prsNominationCompleted || '',
      "All Investment - Main Beneficiary / 所有投资 - 主要受益人": data.investments?.prsMainBeneficiary || '',
      "All Investment - Main Beneficiary Distribution / 所有投资 - 主要受益人分配额": data.investments?.prsMainDistribution || '',
      "All Investment - Substitute Beneficiary / 所有投资 - 代替受益人": data.investments?.prsSubBeneficiary || '',
      "All Investment - Substitute Beneficiary Distribution / 所有投资 - 代替受益人分配额": data.investments?.prsSubDistribution || '',
      "All Investment - Remarks / 所有投资 - 备注": data.investments?.prsRemarks || '',
      "Insurance Nomination Completed / 保险指定受益人已完成": data.investments?.insuranceNominationCompleted || '',
      "Insurance Remarks / 保险备注": data.investments?.insuranceRemarks || '',
      "EPF Nomination Completed / 公积金指定受益人已完成": data.investments?.epfNominationCompleted || '',
      "EPF Remarks / 公积金备注": data.investments?.epfRemarks || ''
    },

    // Section 12: Business Assets / 商业资产
    "Section 12 - Business Assets / 第十二部分 - 商业资产": {
      "Owns Business / 拥有企业": data.businessAssets?.hasBusiness === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Business Description / 企业描述": data.businessAssets?.businessDescription || '',
      "Collectibles / Valuables / 收藏品/贵重物品": data.businessAssets?.collectibles || '',
      "Digital Assets / 数字资产": data.businessAssets?.digitalAssets || '',
      "Guarantees Given / 担保责任": data.businessAssets?.guarantees || '',
      "Other Obligations / 其他义务": data.businessAssets?.otherObligations || ''
    },

    // Section 13: Executor, Trustee & Guardian / 执行人、受托人及监护人
    "Section 13 - Primary Executor / 第十三部分 - 主要遗嘱执行人": {
      "Appointment Type / 委任类型": appointmentTypeLabels[data.executor?.appointmentType] || '',
      "Other Details / 其他详情": data.executor?.otherDetails || '',
      "Full Name / 姓名": data.executor?.fullName || '',
      "NRIC / 身份证": data.executor?.nric || '',
      "Relationship / 关系": data.executor?.relationship || '',
      "Mobile No. / 电话": data.executor?.mobileNo || '',
      "Address / 地址": data.executor?.address || '',
      "Remarks / 备注": data.executor?.remarks || ''
    },
    "Section 13 - Substitute Executor / 替代遗嘱执行人": {
      "Appointment Type / 委任类型": appointmentTypeLabels[data.substituteExecutor?.appointmentType] || '',
      "Other Details / 其他详情": data.substituteExecutor?.otherDetails || '',
      "Full Name / 姓名": data.substituteExecutor?.fullName || '',
      "NRIC / 身份证": data.substituteExecutor?.nric || '',
      "Relationship / 关系": data.substituteExecutor?.relationship || '',
      "Mobile No. / 电话": data.substituteExecutor?.mobileNo || '',
      "Address / 地址": data.substituteExecutor?.address || '',
      "Remarks / 备注": data.substituteExecutor?.remarks || ''
    },
    "Section 13 - Primary Trustee / 主要受托人": {
      "Appointment Type / 委任类型": appointmentTypeLabels[data.trustee?.appointmentType] || '',
      "Other Details / 其他详情": data.trustee?.otherDetails || '',
      "Full Name / 姓名": data.trustee?.fullName || '',
      "NRIC / 身份证": data.trustee?.nric || '',
      "Relationship / 关系": data.trustee?.relationship || '',
      "Mobile No. / 电话": data.trustee?.mobileNo || '',
      "Address / 地址": data.trustee?.address || '',
      "Remarks / 备注": data.trustee?.remarks || ''
    },
    "Section 13 - Substitute Trustee / 替代受托人": {
      "Appointment Type / 委任类型": appointmentTypeLabels[data.substituteTrustee?.appointmentType] || '',
      "Other Details / 其他详情": data.substituteTrustee?.otherDetails || '',
      "Full Name / 姓名": data.substituteTrustee?.fullName || '',
      "NRIC / 身份证": data.substituteTrustee?.nric || '',
      "Relationship / 关系": data.substituteTrustee?.relationship || '',
      "Mobile No. / 电话": data.substituteTrustee?.mobileNo || '',
      "Address / 地址": data.substituteTrustee?.address || '',
      "Remarks / 备注": data.substituteTrustee?.remarks || ''
    },
    "Section 13 - Guardian / 监护人": {
      "Appointment Type / 委任类型": appointmentTypeLabels[data.guardian?.appointmentType] || '',
      "Other Details / 其他详情": data.guardian?.otherDetails || '',
      "Full Name / 姓名": data.guardian?.fullName || '',
      "NRIC / 身份证": data.guardian?.nric || '',
      "Relationship / 关系": data.guardian?.relationship || '',
      "Mobile No. / 电话": data.guardian?.mobileNo || '',
      "Address / 地址": data.guardian?.address || '',
      "Remarks / 备注": data.guardian?.remarks || ''
    },

    // Section 14: Special Considerations / 特别考量
    "Section 14 - Special Considerations / 第十四部分 - 特别考量": {
      "Considering Education Fund / 考虑设立教育基金": data.specialConsiderations?.educationFund === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Children Inheritance Age / 子女获得继承权年龄": data.specialConsiderations?.childrenInheritanceAge || '',
      "Parents Need Support / 父母需要财务支持": data.specialConsiderations?.parentsNeedSupport === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Parents Support Details / 父母支持详情": data.specialConsiderations?.parentsSupportDetails || '',
      "Has Special Needs Dependents / 有特殊需求受抚养人": data.specialConsiderations?.hasSpecialNeedsDependents === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Special Needs Details / 特殊需求详情": data.specialConsiderations?.specialNeedsDetails || '',
      "Want Trustee / 设立信托": data.specialConsiderations?.wantTrustee === 'true' ? 'Yes / 是' : 'Not Applicable / 不适用',
      "Additional Details / 附加详情": data.specialConsiderations?.additionalDetails || ''
    },

    // Submission Info
    "Submission Info / 提交信息": {
      "Submission ID / 提交编号": submissionId,
      "Submitted At / 提交时间": submittedAt
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const submissionId = generateSubmissionId();
    const submittedAt = new Date().toISOString();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const transformedData = transformFormData(data, submissionId, submittedAt);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Webhook error:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Submission error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
