import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { MessageCard } from "./MessageCard";

interface ChatAreaProps {
  chatId: string;
  onReset?: () => void;
}

const chatHistories: { [key: string]: Array<{ type: "user" | "ai"; content: string }> } = {
  "new-chat": [],
  "chat-1": [
    { type: "user", content: "How do I restart the development server?" },
    { type: "ai", content: "To restart your development server, you can:\n1. Press Ctrl+C in the terminal to stop it\n2. Run 'npm start' or 'yarn start' again\n3. Alternatively, use 'npm run dev' for Next.js projects" },
  ],
  "chat-2": [
    { type: "user", content: "Show me code for an AI teacher UI" },
    { type: "ai", content: "Here's a React component for an AI teacher interface:\n\n```jsx\nfunction TeacherUI() {\n  return (\n    <div className='teacher-container'>\n      <div className='avatar'>\n        <img src='/teacher.png' />\n      </div>\n      <div className='chat-area'>\n        {/* Messages */}\n      </div>\n    </div>\n  );\n}\n```" },
  ],
  "chat-3": [
    { type: "user", content: "Suggest a color scheme for a dark mode app" },
    { type: "ai", content: "Here's a professional dark mode color scheme:\n\nBackground: #121212\nCards: #181818\nBorders: #2A2A2A\nPrimary Text: #EAEAEA\nSecondary Text: #A0A0A0\nAccent: #5A5BEF (Purple)\n\nThis creates good contrast while being easy on the eyes." },
  ],
};

export function ChatArea({ chatId, onReset }: ChatAreaProps) {
  const [messages, setMessages] = useState(chatHistories[chatId] || []);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chatHistories[chatId] || []);
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { type: "user" as const, content: inputValue }];
      setMessages(newMessages);
      setInputValue("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { 
          type: "ai" as const, 
          content: "I'm processing your request. This is a demo response. In a real application, this would connect to an AI API to generate contextual responses based on your input." 
        };
        setMessages([...newMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] px-6 py-4">
        <h2 className="text-[#EAEAEA]">ChatGPT</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <h1 className="text-[#EAEAEA] mb-8">How can I help, Chief?</h1>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <MessageCard key={index} type={message.type} content={message.content} />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#2A2A2A] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything …"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-[12px] px-4 py-3 pr-12 text-[#EAEAEA] placeholder-[#A0A0A0] focus:outline-none focus:border-[#5A5BEF] transition-colors"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#5A5BEF] hover:bg-[#4A4BDF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
