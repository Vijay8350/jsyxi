import {
  Star, MessageCircle, FileText, Megaphone, Timer, Camera, HelpCircle, MapPin, Bot,
  Clock, Hash, Building2, Users, History, ArrowUpToLine, Images, MousePointerClick,
  SplitSquareHorizontal, GalleryHorizontalEnd, LayoutGrid, UtensilsCrossed, ShieldAlert, Cookie,
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
  hours: Clock,
  counter: Hash,
  logos: Building2,
  team: Users,
  timeline: History,
  backtotop: ArrowUpToLine,
  gallery: Images,
  button: MousePointerClick,
  beforeafter: SplitSquareHorizontal,
  slider: GalleryHorizontalEnd,
  portfolio: LayoutGrid,
  menu: UtensilsCrossed,
  agegate: ShieldAlert,
  cookie: Cookie,
};

export function toolIcon(key: string): LucideIcon {
  return TOOL_ICONS[key] ?? Bot;
}
