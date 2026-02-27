import { Search, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-6">
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l4-4 4 4 4-4" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">ReviewAnalyzer</span>
                </Link>

                {/* Search */}
                <div className="relative hidden lg:flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="리뷰 검색..."
                        className="h-10 w-[300px] rounded-lg border-0 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        대시보드
                    </Link>
                    <Link href="/analysis" className="text-sm font-bold text-blue-600">
                        분석
                    </Link>
                    <Link href="/reports" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        리포트
                    </Link>
                    <Link href="/settings" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        설정
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
                    </button>
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-teal-600">
                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=0d9488"
                            alt="User"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
