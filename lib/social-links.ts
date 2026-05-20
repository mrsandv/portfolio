import { Github, Instagram, Linkedin, Send, type LucideIcon } from "lucide-react";

export type SocialMeta = {
  label: string;
  icon: LucideIcon;
  color: string;
};

export const SOCIAL_META: Record<string, SocialMeta> = {
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "hover:text-blue-500" },
  github: { label: "GitHub", icon: Github, color: "hover:text-foreground" },
  instagram: { label: "Instagram", icon: Instagram, color: "hover:text-pink-500" },
  telegram: { label: "Telegram", icon: Send, color: "hover:text-sky-500" },
};
