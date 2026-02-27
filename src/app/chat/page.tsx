"use client";

import { useState } from "react";
import {
    Plus,
    Headphones,
    History,
    Settings,
    Bot,
    Send,
    Sparkles,
    ChevronDown,
    ChevronUp,
    Battery,
    Activity
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<any[]>([
        {
            role: "bot",
            time: "오전 10:00",
            content: "안녕하세요! 프리미엄 무선 이어폰 Pro에 대한 1,000개 이상의 리뷰를 분석했습니다. 음질, 노이즈 캔슬링 성능, 착용감 등에 대해 무엇이든 물어보세요.\n\n어떤 점이 가장 궁금하신가요?",
            suggestions: ["운동할 때 써도 되나요?", "배터리 수명은 어떤가요?", "노이즈 캔슬링 성능은?"]
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg = {
            role: "user",
            time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
            content: text
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ query: text }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            const botMsg = {
                role: "bot",
                time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
                content: data.success
                    ? data.answer
                    : `죄송합니다. 오류가 발생했습니다: ${data.error || "알 수 없는 오류"}`,
                references: data.results || []
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="flex w-[280px] flex-col justify-between border-r border-gray-200 bg-white">
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6] text-white shadow-sm">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="block text-[15px] font-bold tracking-tight text-gray-900 leading-tight">ReviewAnalyzer</span>
                                <span className="block text-[12px] font-medium text-gray-400">쇼핑 리뷰 분석</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 mb-3">
                            <Plus className="h-4 w-4" />
                            새로운 채팅
                        </button>

                        <button
                            onClick={async () => {
                                try {
                                    const res = await fetch('/api/index-reviews', { method: 'POST' });
                                    const data = await res.json();
                                    if (data.success) {
                                        alert(data.message);
                                    } else {
                                        alert(`오류 발생: ${data.error || '상세 정보 없음'}`);
                                    }
                                } catch (err: any) {
                                    alert(`네트워크/구문 오류: ${err.message}`);
                                }
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600 shadow-sm transition-colors hover:bg-blue-100 mb-6"
                        >
                            <Sparkles className="h-4 w-4" />
                            샘플 데이터 인덱싱
                        </button>

                        <div className="mb-6">
                            <h3 className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">최근 분석</h3>
                            <ul className="space-y-1">
                                <li>
                                    <button className="flex w-full flex-col rounded-lg bg-[#eff6ff] px-3 py-2 text-left text-sm font-medium text-[#2563eb] transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Headphones className="h-4 w-4 shrink-0" />
                                            <span className="truncate text-[13px] font-bold">프리미엄 무선 이어폰 Pro</span>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 p-4">
                        <div className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Kim&backgroundColor=fed7aa"
                                    alt="User"
                                    className="h-8 w-8 rounded-full bg-orange-100 object-cover"
                                />
                                <div>
                                    <span className="block text-[13px] font-bold text-gray-900">사용자</span>
                                    <span className="block text-[12px] text-gray-500">Free Plan</span>
                                </div>
                            </div>
                            <Settings className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex flex-1 flex-col h-full bg-[#f8fafc]">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6] text-white">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-bold text-gray-900 leading-tight">프리미엄 무선 이어폰 Pro</h1>
                            <p className="text-[12px] font-medium text-gray-400">분석된 리뷰 1,240개</p>
                        </div>
                    </div>
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        <Settings className="h-5 w-5" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-3xl space-y-8">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1",
                                    msg.role === "bot" ? "bg-[#eff6ff] text-[#3b82f6]" : "bg-orange-100")}>
                                    {msg.role === "bot" ? <Bot className="h-5 w-5" /> :
                                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Kim&backgroundColor=fed7aa" alt="user" className="h-full w-full rounded-full" />}
                                </div>

                                <div className={cn("flex flex-col gap-1 w-full max-w-2xl", msg.role === "user" ? "items-end" : "items-start")}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-bold text-gray-900">{msg.role === "bot" ? "리뷰 봇" : "사용자"}</span>
                                        <span className="text-[12px] text-gray-400">{msg.time}</span>
                                    </div>

                                    <div className={cn("rounded-2xl px-5 py-4 text-[14px] leading-relaxed shadow-sm",
                                        msg.role === "bot" ? "rounded-tl-none bg-[#f1f5f9] text-gray-800" : "rounded-tr-none bg-[#3b82f6] text-white")}>
                                        {msg.content.split('\n').map((line: string, idx: number) => (
                                            <p key={idx} className={line ? "mb-2" : "h-2"}>{line}</p>
                                        ))}
                                    </div>

                                    {msg.suggestions && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {msg.suggestions.map((s: string) => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleSend(s)}
                                                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {msg.references && msg.references.length > 0 && (
                                        <div className="mt-3 w-full rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden">
                                            <details className="group">
                                                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                                                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#3b82f6]">
                                                        <Bot className="h-4 w-4" /> 참고한 리뷰: {msg.references.length}개
                                                    </div>
                                                    <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                                </summary>
                                                <div className="border-t border-blue-50 px-4 py-3 space-y-4">
                                                    {msg.references.map((ref: any, idx: number) => (
                                                        <div key={idx} className="text-[13px] text-gray-600">
                                                            <div className="flex justify-between mb-1">
                                                                <span className="font-bold text-blue-600">리뷰 #{idx + 1}</span>
                                                                <span className="text-[11px] text-gray-400">평점: {ref.metadata.rating}</span>
                                                            </div>
                                                            <p className="italic">"{ref.content}"</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-4 animate-pulse">
                                <div className="h-8 w-8 rounded-full bg-[#eff6ff]"></div>
                                <div className="h-10 w-48 rounded-2xl bg-[#f1f5f9]"></div>
                            </div>
                        )}
                        <div className="h-20"></div>
                    </div>
                </div>

                <div className="px-4 pb-6 pt-2 md:px-8 bg-transparent">
                    <div className="mx-auto max-w-3xl">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                            className="relative flex items-center rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#3b82f6]/20 focus-within:border-[#3b82f6] transition-all"
                        >
                            <button type="button" className="flex h-[52px] w-[52px] items-center justify-center rounded-l-2xl text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-white">
                                    <Plus className="h-4 w-4" />
                                </div>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                                className="flex-1 bg-transparent py-4 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6] text-white shadow-sm transition-colors hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                <Send className="h-4 w-4 ml-[-2px] mt-[1px]" />
                            </button>
                        </form>
                        <p className="mt-3 text-center text-[11px] text-gray-400">
                            ReviewAnalyzer는 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
