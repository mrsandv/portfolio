import { Send } from "lucide-react";
import type { ComponentType } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export type SocialMeta = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};

export const SOCIAL_META: Record<string, SocialMeta> = {
  linkedin: { label: "LinkedIn", icon: FaLinkedin, color: "hover:text-blue-500" },
  github: { label: "GitHub", icon: FaGithub, color: "hover:text-foreground" },
  instagram: { label: "Instagram", icon: FaInstagram, color: "hover:text-pink-500" },
  telegram: { label: "Telegram", icon: Send, color: "hover:text-sky-500" },
};
