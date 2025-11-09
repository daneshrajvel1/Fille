import { Book, MessageSquare, FileText, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

const helpTopics = [
  { icon: Book, title: "Documentation", description: "Browse our complete guide", link: "#" },
  { icon: MessageSquare, title: "Community Forum", description: "Ask questions and share tips", link: "#" },
  { icon: FileText, title: "FAQ", description: "Common questions answered", link: "#" },
  { icon: Mail, title: "Contact Support", description: "Get help from our team", link: "#" },
];

export function HelpDialog({ open, onClose }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#121212] border border-[#2A2A2A] p-0 rounded-[12px]">
        <DialogTitle className="sr-only">Help & Support</DialogTitle>
        <DialogDescription className="sr-only">
          Get help and support resources
        </DialogDescription>

        <div className="p-6">
          <h2 className="text-[#EAEAEA] mb-6">Help & Support</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <a
                  key={topic.title}
                  href={topic.link}
                  className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-lg hover:border-[#5A5BEF] transition-colors"
                >
                  <Icon className="w-6 h-6 text-[#5A5BEF] mb-2" />
                  <h3 className="text-[#EAEAEA] mb-1">{topic.title}</h3>
                  <p className="text-[#A0A0A0]">{topic.description}</p>
                </a>
              );
            })}
          </div>

          <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-lg">
            <h3 className="text-[#EAEAEA] mb-2">Quick Tips</h3>
            <ul className="space-y-2 text-[#A0A0A0]">
              <li>• Use keyboard shortcuts for faster navigation</li>
              <li>• Save important conversations to your Library</li>
              <li>• Customize your experience in Personalization settings</li>
              <li>• Export your data anytime from Data Controls</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
