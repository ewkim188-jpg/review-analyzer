"use client";

import {
  BarChart,
  Bell,
  Bot,
  Link as LinkIcon,
  Mic,
  Send,
  Dumbbell,
  BatteryFull,
  Phone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      {/* Header */}
      <header className="flex h-[72px] w-full items-center justify-between border-b border-gray-100 bg-[#f8fafc] px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6] text-white shadow-[0_2px_10px_-3px_rgba(59,130,246,0.3)]">
            <BarChart className="h-4 w-4" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-gray-900">ReviewAI</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-[14px] font-bold text-gray-900 hover:text-gray-600 transition-colors">
              홈
            </Link>
            <Link href="/history" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
              기록
            </Link>
            <Link href="/settings" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
              설정
            </Link>
          </nav>

          <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-200/50 text-gray-600 hover:bg-gray-200 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-[6px] w-[6px] rounded-full bg-red-500 border border-white"></span>
            </button>
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Kim&backgroundColor=fed7aa"
              alt="User"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 mb-20">
        <div className="w-full max-w-[800px] flex flex-col items-center">

          {/* Logo Icon */}
          <div className="mb-8 flex h-[92px] w-[92px] items-center justify-center rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <Bot className="h-12 w-12 text-[#3b82f6]" strokeWidth={2.5} />
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-center text-[40px] font-extrabold tracking-tight text-gray-900">
            환영합니다!
          </h1>

          {/* Subheading */}
          <p className="mb-14 text-center text-[16px] leading-[1.6] text-gray-500 font-medium">
            제품 링크를 붙여넣거나 궁금한 점을 물어보세요.<br />
            수천 개의 리뷰를 분석하여 장단점을 요약해 드립니다.
          </p>

          <button
            onClick={async () => {
              const res = await fetch('/api/index-reviews', { method: 'POST' });
              const data = await res.json();
              alert(data.message || data.error);
            }}
            className="mb-8 rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-[14px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-sm"
          >
            샘플 데이터 인덱싱 (먼저 실행해주세요)
          </button>

          {/* Suggestion Cards */}
          <div className="mb-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Card 1 */}
            <Link href="/chat" className="group flex flex-col items-start rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-100 text-left">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3b82f6]">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900 text-[15px]">운동 적합성</span>
              </div>
              <p className="text-[14px] text-gray-600">"운동할 때 써도 돼요?"</p>
            </Link>

            {/* Card 2 */}
            <Link href="/chat" className="group flex flex-col items-start rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-100 text-left">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                  <BatteryFull className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900 text-[15px]">배터리 성능</span>
              </div>
              <p className="text-[14px] text-gray-600">"배터리 오래 가나요?"</p>
            </Link>

            {/* Card 3 */}
            <Link href="/chat" className="group flex flex-col items-start rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-100 text-left">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900 text-[15px]">통화 품질</span>
              </div>
              <p className="text-[14px] text-gray-600">"통화 품질은?"</p>
            </Link>
          </div>

          {/* Input Area */}
          <div className="w-full relative max-w-[700px]">
            <div className="flex items-center rounded-full border border-gray-200 bg-white py-2 pl-4 pr-2 shadow-sm focus-within:ring-2 focus-within:ring-[#3b82f6]/20 focus-within:border-[#3b82f6] transition-all">
              <LinkIcon className="h-5 w-5 text-gray-400 shrink-0" />

              <input
                type="text"
                placeholder="제품 URL을 붙여넣거나 질문을 입력하세요..."
                className="flex-1 bg-transparent px-3 py-2.5 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
              />

              <div className="flex items-center gap-2 shrink-0">
                <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                  <Mic className="h-5 w-5" />
                </button>
                <Link href="/chat">
                  <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-sm transition-colors hover:bg-blue-600">
                    <Send className="h-4 w-4 ml-[-2px] mt-[1px]" />
                  </button>
                </Link>
              </div>
            </div>

            <p className="mt-4 text-center text-[12px] text-gray-400 font-medium">
              AI는 실수할 수 있습니다. 중요한 정보는 직접 확인해 주세요.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
