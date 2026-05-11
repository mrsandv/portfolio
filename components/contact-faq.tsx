"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  HelpCircle,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  SendHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function ContactFAQ() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const tContact = t.contact;
  const tFaq = t.faq;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { resolvedTheme } = useTheme();

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tContact.validation.nameMin),
        email: z.string().email(tContact.validation.emailInvalid),
        message: z.string().min(10, tContact.validation.messageMin),
      }),
    [tContact.validation],
  );

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!turnstileToken) {
      toast.error(tContact.toasts.verifyFirst);
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

      toast.success(tContact.toasts.success);
      reset();
    } catch (error) {
      toast.error(tContact.toasts.error);
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <motion.div
            {...cellEntrance(0)}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                  {tContact.title}
                </h2>
                <p className="text-muted-foreground">{tContact.subtitle}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {tContact.labels.name}
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={tContact.placeholders.name}
                />
                {errors.name && (
                  <p className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {tContact.labels.email}
                </label>
                <input
                  {...register("email")}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={tContact.placeholders.email}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {tContact.labels.message}
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder={tContact.placeholders.message}
                />
                {errors.message && (
                  <p className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  options={{ theme: resolvedTheme === "dark" ? "dark" : "light" }}
                  onSuccess={setTurnstileToken}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>{tContact.submit}</span>
                    <SendHorizontal className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            {...cellEntrance(0.1)}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-accent/10 p-3 text-accent">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                {tFaq.title}
              </h2>
            </div>

            <div className="space-y-3">
              {tFaq.items.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-border bg-secondary/30 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-bold text-foreground">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="border-t border-border/50 p-4 pt-0 text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
