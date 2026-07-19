import {
  Star, MessageCircle, FileText, Megaphone, Timer, Camera, HelpCircle, MapPin, Bot,
  type LucideIcon,
} from "lucide-react";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  reviews: Star,
  whatsapp: MessageCircle,
  form: FileText,
  popup: Megaphone,
  countdown: Timer,
  instagram: Camera,
  faq: HelpCircle,
  maps: MapPin,
};

export function toolIcon(key: string): LucideIcon {
  return TOOL_ICONS[key] ?? Bot;
}
