import { ContactFAQ } from "@/components/contact-faq";
import { fetchFAQ, fetchSettings } from "@/lib/content";
import { getLocale } from "@/lib/request-locale";

export async function ContactFAQSection() {
  const locale = await getLocale();
  const [faqs, settings] = await Promise.all([fetchFAQ(locale), fetchSettings(locale)]);
  return <ContactFAQ faqs={faqs} settings={settings} />;
}
