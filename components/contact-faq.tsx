"use client";

import { useMemo, useState, useRef } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { cellEntrance } from "@/lib/animations";
import { translations } from "@/lib/translations";
import type { FAQItem } from "@/lib/faq";
import type { SiteSettings } from "@/lib/cms";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const buildContactSchema = (v: { nameMin: string; emailInvalid: string; messageMin: string }) =>
  z.object({
    name: z.string().min(2, v.nameMin),
    email: z.string().email(v.emailInvalid),
    message: z.string().min(10, v.messageMin),
  });

type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;

export function ContactFAQ({
  faqs = [],
  settings,
}: {
  faqs?: FAQItem[];
  settings?: SiteSettings | null;
}) {
  const t = translations.contact;
  const tFaq = translations.faq;
  const { theme } = useTheme();

  const contactTitle = settings?.contactTitle || t.title;
  const contactSubtitle = settings?.contactSubtitle || t.subtitle;
  const faqTitle = settings?.faqTitle || tFaq.title;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const schema = useMemo(() => buildContactSchema(t.validation), [t.validation]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!turnstileToken) {
      toast.error(t.toasts.verifyFirst);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setIsSuccess(true);
      toast.success(t.toasts.success);
      reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch {
      toast.error(t.toasts.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div {...cellEntrance(0)} className="space-y-8">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                {contactTitle}
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t.labels.name}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={t.placeholders.name}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-[10px] text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t.labels.email}
                  </label>
                  <input
                    {...register("email")}
                    placeholder={t.placeholders.email}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-[10px] text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t.labels.message}
                </label>
                <textarea
                  {...register("message")}
                  placeholder={t.placeholders.message}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
                {errors.message && (
                  <p className="flex items-center gap-1 text-[10px] text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {TURNSTILE_SITE_KEY && (
                  <div className="flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                      options={{
                        theme: theme === "dark" ? "dark" : "light",
                        appearance: "interaction-only",
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (TURNSTILE_SITE_KEY ? !turnstileToken : false)
                  }
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                  <span>{t.submit}</span>
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div {...cellEntrance(0.2)} className="space-y-8">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                {faqTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.length > 0 ? (
                faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} index={i} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/50">
                   <p className="text-muted-foreground font-mono text-sm">
                    {tFaq.empty}
                  </p>
                </div>
              )}
            </div>

            <p className="rounded-2xl border border-border bg-secondary/50 p-6 text-center text-sm italic text-muted-foreground">
              {contactSubtitle}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="text-sm font-bold text-foreground">{faq.question}</span>
        <div className="ml-4 shrink-0 rounded-full bg-secondary p-1 text-muted-foreground">
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-border/50 p-6 pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
