import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "#1E1E1E" }}
      onClick={onClick}
      className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors duration-200"
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#5A5BEF] rounded-r-full" />
      )}
      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-[#A0A0A0]'}`} />
      <span className={`${active ? 'text-white' : 'text-[#A0A0A0]'}`}>
        {label}
      </span>
    </motion.button>
  );
}
