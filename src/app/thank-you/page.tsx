import Link from 'next/link';
import { CheckCircle, Home, Mail } from 'lucide-react';

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
            Your estate planning questionnaire has been successfully submitted. 
            We will review your information and contact you shortly.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            您的遗产规划问卷已成功提交。我们将审核您的信息并尽快与您联系。
          </p>

          <div className="space-y-3">
            <Link
              href="/form"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors"
            >
              <Home size={18} />
              Submit Another Response
            </Link>

            <a
              href="mailto:contact@example.com"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#1e3a5f] text-[#1e3a5f] rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-colors"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          If you have any questions, please don&apos;t hesitate to reach out.
        </p>
      </div>
    </div>
  );
}
