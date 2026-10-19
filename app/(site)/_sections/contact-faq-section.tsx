import { ContactFAQ } from "@/components/contact-faq";
import { fetchFAQ, fetchSettings } from "@/lib/content";

export async function ContactFAQSection() {
  const [faqs_es, faqs_en, es, en] = await Promise.all([
    fetchFAQ("es"),
    fetchFAQ("en"),
    fetchSettings("es"),
    fetchSettings("en"),
  ]);
  return <ContactFAQ faqs={{ es: faqs_es, en: faqs_en }} settings={{ es, en }} />;
}
