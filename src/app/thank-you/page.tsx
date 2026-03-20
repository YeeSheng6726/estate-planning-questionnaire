import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-2">谢谢！</p>

          <p className="text-gray-600 mb-6">
            Yee Sheng will review your information and contact you shortly.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            您的遗产规划问卷已成功提交。Yee Sheng 将审核您的信息并尽快与您联系。
          </p>

          <Link
            href="/form"
            className="flex flex-col items-center justify-center gap-1 w-full px-6 py-3 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
          >
            <span className="text-sm font-medium">Submit Another Response</span>
            <span className="text-xs opacity-90">提交另一份问卷</span>
          </Link>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          If you have any questions, please don&apos;t hesitate to reach out.
        </p>
      </div>
    </div>
  );
}
