"use client";

import { useState } from "react";
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

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const faqs = [
  {
    question: "What's your typical availability?",
    answer: "I'm usually booked 2-4 weeks in advance. For urgent fixes or consultations, I can sometimes squeeze in a session. Best way to know is to drop a message here.",
  },
  {
    question: "Do you work with startups?",
    answer: "Yes! I love the fast-paced environment of startups. I specialize in MVP development and helping founders take their product from zero to one.",
  },
  {
    question: "What's your tech stack bias?",
    answer: "I'm pragmatic. While I love Go for backends and React for frontends, I choose the tool that fits the problem. Clarity and maintainability are my priorities.",
  },
  {
    question: "How do we get started?",
    answer: "Fill out the form with a brief summary of your project. I'll get back to you within 24-48 hours to schedule a 15-min discovery call.",
  },
];

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function ContactFAQ() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again or reach out via LinkedIn.");
    } finally {
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
                  Let's Talk
                </h2>
                <p className="text-muted-foreground">
                  I usually respond in 24-48 hours.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
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
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
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
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
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
                FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
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
