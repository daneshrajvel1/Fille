import { useState } from "react";
import { Search, Star, FileText, Image, Code, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
}

const chatItems = [
  { id: "chat-1", label: "Restart server command" },
  { id: "chat-2", label: "AI teacher UI code" },
  { id: "chat-3", label: "Color scheme suggestions" },
  { id: "chat-4", label: "Piracy categories and effe..." },
  { id: "chat-5", label: "System status check" },
  { id: "chat-6", label: "Song lyrics caption" },
  { id: "chat-7", label: "Car running cost calculation" },
  { id: "chat-8", label: "Car cost per day km" },
  { id: "chat-9", label: "Running cost calculation" },
];

const savedItems = [
  { id: "1", title: "React Component Best Practices", type: "text", icon: FileText, date: "Oct 28" },
  { id: "2", title: "Dashboard Design Inspiration", type: "image", icon: Image, date: "Oct 27" },
  { id: "3", title: "TypeScript Utility Types", type: "code", icon: Code, date: "Oct 26" },
  { id: "4", title: "Color Theory Guide", type: "text", icon: FileText, date: "Oct 25" },
  { id: "5", title: "UI Animation Principles", type: "text", icon: FileText, date: "Oct 24" },
  { id: "6", title: "API Integration Examples", type: "code", icon: Code, date: "Oct 23" },
];

export function SearchDialog({ open, onClose, onSelectChat }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLibrary = savedItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chatId: string) => {
    onSelectChat(chatId);
    onClose();
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#121212] border border-[#2A2A2A] p-0 rounded-[12px]">
        <DialogTitle className="sr-only">Search Chats and Library</DialogTitle>
        <DialogDescription className="sr-only">
          Search through your chat history and saved library items
        </DialogDescription>

        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <Input
              placeholder="Search chats and library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA] pl-11 h-12"
              autoFocus
            />
          </div>

          <Tabs defaultValue="chats" className="w-full">
            <TabsList className="bg-[#181818] border border-[#2A2A2A] mb-4 w-full">
              <TabsTrigger value="chats" className="data-[state=active]:bg-[#5A5BEF] flex-1">
                Chats ({filteredChats.length})
              </TabsTrigger>
              <TabsTrigger value="library" className="data-[state=active]:bg-[#5A5BEF] flex-1">
                Library ({filteredLibrary.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chats" className="mt-0">
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {filteredChats.length > 0 ? (
                  filteredChats.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectChat(item.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E1E1E] transition-colors text-left group"
                    >
                      <MessageSquare className="w-5 h-5 text-[#A0A0A0] flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-[#EAEAEA] group-hover:text-white transition-colors">
                          {item.label}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center text-[#A0A0A0] py-8">
                    No chats found
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="library" className="mt-0">
              <div className="max-h-[400px] overflow-y-auto">
                {filteredLibrary.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredLibrary.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          className="bg-[#181818] border border-[#2A2A2A] rounded-lg p-4 hover:border-[#5A5BEF] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-[#5A5BEF] flex-shrink-0 mt-1" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[#EAEAEA] group-hover:text-white transition-colors mb-1 truncate">
                                {item.title}
                              </h3>
                              <div className="text-[#A0A0A0]">{item.date}</div>
                            </div>
                            <button className="text-[#A0A0A0] hover:text-[#5A5BEF] flex-shrink-0">
                              <Star className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-[#A0A0A0] py-8">
                    No library items found
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
