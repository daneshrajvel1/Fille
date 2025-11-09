import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sparkles } from "lucide-react";

interface MessageCardProps {
  type: "user" | "ai";
  content: string;
}

export function MessageCard({ type, content }: MessageCardProps) {
  return (
    <div className={`flex gap-4 px-6 py-6 ${type === 'ai' ? 'bg-[#1E1E1E]' : 'bg-transparent'}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        {type === "user" ? (
          <AvatarFallback className="bg-[#5A5BEF] text-white">JD</AvatarFallback>
        ) : (
          <AvatarFallback className="bg-[#181818] border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#5A5BEF]" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 text-[#EAEAEA]">
        {content}
      </div>
    </div>
  );
}
