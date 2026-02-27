import { Star, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
    name: string;
    avatarUrl: string;
    isVerified: boolean;
    timeAgo: string;
    relevanceScore: number;
    rating: number;
    content: string;
    tags: string[];
}

export function ReviewCard({
    name,
    avatarUrl,
    isVerified,
    timeAgo,
    relevanceScore,
    rating,
    content,
    tags,
}: ReviewCardProps) {
    // Determine relevance pill color based on score
    let relevanceColor = "bg-green-100 text-green-700";
    if (relevanceScore < 70) {
        relevanceColor = "bg-orange-100 text-orange-700";
    } else if (relevanceScore < 90) {
        relevanceColor = "bg-blue-100 text-blue-700";
    }

    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)]">
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={name}
                                className="h-10 w-10 rounded-full object-cover bg-gray-100"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600">
                                {name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h3 className="text-[15px] font-bold text-gray-900">{name}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                                {isVerified ? (
                                    <>
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                        <span className="text-[13px] text-gray-500">구매 인증</span>
                                    </>
                                ) : (
                                    <>
                                        <Info className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="text-[13px] text-gray-500">미인증</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cn("rounded-md px-2.5 py-1 text-xs font-bold", relevanceColor)}>
                        관련도 {relevanceScore}%
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "h-4 w-4",
                                    i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-400">{timeAgo}</span>
                </div>

                <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-gray-600">
                    {content}
                </p>

                <button className="mt-3 flex items-center text-sm font-medium text-blue-500 hover:text-blue-600">
                    더 보기 <ChevronRight className="ml-0.5 h-4 w-4" />
                </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
