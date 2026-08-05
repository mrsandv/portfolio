import type { SocialLink } from "@/lib/cms";
import { fetchSettings } from "@/lib/cms-server";

const FALLBACK_SOCIALS: SocialLink[] = [
  { platform: "linkedin", url: "https://www.linkedin.com/in/mrsan" },
  { platform: "github", url: "https://github.com/" },
  { platform: "instagram", url: "https://www.instagram.com/" },
  { platform: "telegram", url: "https://t.me/" },
];

export async function getSocials() {
  const settings = await fetchSettings("en");
  const list = settings?.socialLinks?.length ? settings.socialLinks : FALLBACK_SOCIALS;
  const record = Object.fromEntries(list.map((link) => [link.platform, link.url]));
  return { list, record };
}
