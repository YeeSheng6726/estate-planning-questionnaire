import Link from 'next/link';
import { ArrowRight, Shield, Clock, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] to-[#f5f4f0]">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">
            Estate Planning & Trust Discovery
          </h1>
          <p className="text-gray-500">遗产规划与信托设立深度咨询</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1e3a5f] mb-4">
            Secure Your Family&apos;s Future
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            保障您家人的未来
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Complete our comprehensive questionnaire to help us understand your estate planning needs. 
            Your information is kept strictly confidential.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            完成我们的综合问卷，帮助我们了解您的遗产规划需求。您的信息将严格保密。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Confidential</h3>
            <p className="text-gray-500 text-sm">All information is strictly confidential and used solely for planning purposes.</p>
            <p className="text-gray-400 text-xs mt-1">所有信息严格保密，仅用于规划目的。</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#c9a962]/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#c9a962]" />
            </div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Takes ~15 Minutes</h3>
            <p className="text-gray-500 text-sm">Complete the form at your own pace with auto-save functionality.</p>
            <p className="text-gray-400 text-xs mt-1">按您自己的节奏完成表格，自动保存功能。</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <h3 className="font-semibold text-[#1e3a5f] mb-2">Comprehensive</h3>
            <p className="text-gray-500 text-sm">14 sections covering all aspects of your estate planning needs.</p>
            <p className="text-gray-400 text-xs mt-1">14个部分涵盖您遗产规划需求的所有方面。</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-white/80 mb-6">准备好开始了吗？</p>
          <Link
            href="/form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a962] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#b89952] transition-colors"
          >
            Start Questionnaire
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-semibold text-[#1e3a5f] mb-3">Confidentiality Statement / 保密声明</h4>
          <p className="text-gray-600 text-sm">
            All information collected herein is strictly confidential and used solely for structuring your 
            financial and estate plans. Your personal data will be handled in accordance with applicable 
            privacy laws and regulations.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            本问卷所收集之一切信息将受严格保密，仅用于为您构建财务与资产规划。您的个人资料将根据适用的隐私法律和法规处理。
          </p>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Estate Planning Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
