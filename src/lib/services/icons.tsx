import {
  Store, ShoppingCart, Code2, Contact, AppWindow, Server, Smartphone, LineChart, Sparkles,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  store: Store,
  cart: ShoppingCart,
  code: Code2,
  crm: Contact,
  app: AppWindow,
  server: Server,
  mobile: Smartphone,
  seo: LineChart,
  sparkles: Sparkles,
};

export const SERVICE_ICON_KEYS = Object.keys(SERVICE_ICONS);

export function serviceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? Sparkles;
}
