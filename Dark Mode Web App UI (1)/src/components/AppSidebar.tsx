import { useState } from "react";
import { 
  Plus, 
  Search, 
  Globe, 
  FolderKanban, 
  Sparkles,
  MessageSquare,
  Settings,
  User,
  HelpCircle,
  LogOut,
  Palette
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AppSidebarProps {
  onOpenSettings: () => void;
  onOpenUpgrade: () => void;
  onOpenPersonalization: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onOpenSearch: () => void;
  activeChat: string;
}

export function AppSidebar({ 
  onOpenSettings, 
  onOpenUpgrade, 
  onOpenPersonalization,
  onNewChat,
  onSelectChat,
  onOpenSearch,
  activeChat
}: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState<string>("new-chat");

  const mainItems = [
    { id: "new-chat", icon: Plus, label: "New Chat" },
    { id: "atlas", icon: Globe, label: "Atlas" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
  ];

  const gptItems = [
    { id: "explore", icon: Sparkles, label: "Explore" },
    { id: "flirty-ai", icon: MessageSquare, label: "Flirty AI" },
    { id: "language", icon: MessageSquare, label: "Language Teacher" },
  ];

  const chatItems = [
    { id: "chat-1", icon: MessageSquare, label: "Restart server command" },
    { id: "chat-2", icon: MessageSquare, label: "AI teacher UI code" },
    { id: "chat-3", icon: MessageSquare, label: "Color scheme suggestions" },
    { id: "chat-4", icon: MessageSquare, label: "Piracy categories and effe..." },
    { id: "chat-5", icon: MessageSquare, label: "System status check" },
    { id: "chat-6", icon: MessageSquare, label: "Song lyrics caption" },
    { id: "chat-7", icon: MessageSquare, label: "Car running cost calculation" },
    { id: "chat-8", icon: MessageSquare, label: "Car cost per day km" },
    { id: "chat-9", icon: MessageSquare, label: "Running cost calculation" },
  ];

  return (
    <div className="w-64 h-screen bg-[#181818] border-r border-[#2A2A2A] flex flex-col">
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {mainItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.id}
            onClick={() => {
              setActiveItem(item.id);
              if (item.id === "new-chat") onNewChat();
            }}
          />
        ))}

        {/* GPTs Section */}
        <div className="pt-6 pb-2">
          <div className="px-3 text-[#A0A0A0] mb-2">GPTs</div>
          <div className="space-y-1">
            {gptItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Chats Section */}
        <div className="pt-4 pb-2">
          <div className="px-3 flex items-center justify-between mb-2">
            <span className="text-[#A0A0A0]">Chats</span>
            <button
              onClick={onOpenSearch}
              className="p-1 rounded hover:bg-[#1E1E1E] transition-colors"
              title="Search chats and library"
            >
              <Search className="w-4 h-4 text-[#A0A0A0]" />
            </button>
          </div>

          <div className="space-y-1">
            {chatItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeChat === item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  onSelectChat(item.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-[#2A2A2A] p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[#1E1E1E] transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#5A5BEF] text-white">DR</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="text-white">Darshh Rajwal</div>
                <div className="text-[#A0A0A0]">Free</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side="top" 
            align="end"
            className="w-56 bg-[#181818] border-[#2A2A2A] text-[#EAEAEA] mb-2"
          >
            <DropdownMenuItem className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              darshhrajwal@gmail.com
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem 
              onClick={onOpenUpgrade}
              className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade plan
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onOpenPersonalization}
              className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer"
            >
              <Palette className="w-4 h-4 mr-2" />
              Personalization
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onOpenSettings}
              className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem 
              onClick={() => {
                // This would open a help dialog - we'll add this
                const event = new CustomEvent('openHelp');
                window.dispatchEvent(event);
              }}
              className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                if (confirm('Are you sure you want to log out?')) {
                  // Handle logout
                  alert('Logout functionality would be implemented here');
                }
              }}
              className="focus:bg-[#1E1E1E] focus:text-white cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
