import { useState, useEffect } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { ChatArea } from "./components/ChatArea";
import { SettingsModal } from "./components/SettingsModal";
import { UpgradeModal } from "./components/UpgradeModal";
import { HelpDialog } from "./components/HelpDialog";
import { SearchDialog } from "./components/SearchDialog";
import { toast, Toaster } from "sonner";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [activeChat, setActiveChat] = useState("new-chat");

  // Listen for help event
  useEffect(() => {
    const handleOpenHelp = () => setHelpOpen(true);
    window.addEventListener('openHelp', handleOpenHelp);
    return () => window.removeEventListener('openHelp', handleOpenHelp);
  }, []);

  const handleOpenPersonalization = () => {
    setActiveTab("personalization");
    setSettingsOpen(true);
  };

  const handleNewChat = () => {
    setActiveChat("new-chat");
    toast.success("Started a new chat");
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    toast.info("Loaded chat history");
  };

  return (
    <div className="flex h-screen bg-[#121212] overflow-hidden">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#181818',
            border: '1px solid #2A2A2A',
            color: '#EAEAEA',
          },
        }}
      />
      
      <AppSidebar 
        onOpenSettings={() => {
          setActiveTab("general");
          setSettingsOpen(true);
        }}
        onOpenUpgrade={() => setUpgradeOpen(true)}
        onOpenPersonalization={handleOpenPersonalization}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onOpenSearch={() => setSearchOpen(true)}
        activeChat={activeChat}
      />
      
      <ChatArea chatId={activeChat} onReset={handleNewChat} />
      
      <SettingsModal 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        initialTab={activeTab}
      />
      
      <UpgradeModal 
        open={upgradeOpen} 
        onClose={() => setUpgradeOpen(false)} 
      />
      
      <HelpDialog 
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
      
      <SearchDialog 
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectChat={handleSelectChat}
      />
    </div>
  );
}
