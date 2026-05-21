import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "SEO & Site Meta",
          fields: [
            {
              name: "siteName",
              type: "text",
              required: true,
              defaultValue: "Marco Sandoval",
            },
            {
              name: "siteTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "siteDescription",
              type: "textarea",
              required: true,
              localized: true,
            },
            {
              name: "keywords",
              type: "array",
              fields: [{ name: "keyword", type: "text" }],
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
        },
        {
          label: "Hero Section",
          fields: [
            {
              name: "profilePicture",
              type: "upload",
              relationTo: "media",
              required: false,
            },
            {
              name: "profileLink",
              type: "text",
              required: false,
              admin: {
                description: "Link when clicking the profile picture (e.g. LinkedIn or About page)",
              },
            },
            {
              name: "heroTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "heroTitleAccent",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "heroDescription",
              type: "textarea",
              required: true,
              localized: true,
            },
            {
              name: "heroTagline",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "resumes",
              type: "array",
              maxRows: 2,
              localized: true,
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { description: "Example: PDF · 2026 or English Version" },
                },
                {
                  name: "file",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
            {
              name: "availability",
              type: "array",
              localized: true,
              fields: [{ name: "role", type: "text" }],
            },
          ],
        },
        {
          label: "Social & Contact",
          fields: [
            {
              name: "email",
              type: "text",
              required: true,
            },
            {
              name: "socialLinks",
              type: "array",
              fields: [
                {
                  name: "platform",
                  type: "select",
                  options: [
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "GitHub", value: "github" },
                    { label: "Twitter / X", value: "twitter" },
                    { label: "Instagram", value: "instagram" },
                    { label: "Telegram", value: "telegram" },
                  ],
                },
                { name: "url", type: "text", required: true },
                {
                  name: "showInFinalCta",
                  type: "checkbox",
                  defaultValue: true,
                  admin: { description: "Show this link as a big card in the Final CTA section" },
                },
              ],
            },
          ],
        },
        {
          label: "Section Headings",
          fields: [
            {
              name: "portfolioTitle",
              type: "text",
              localized: true,
              admin: { description: "Bento/Lab section title" },
            },
            {
              name: "portfolioDescription",
              type: "textarea",
              localized: true,
              admin: { description: "Bento/Lab section subtitle" },
            },
            {
              name: "stackTitle",
              type: "text",
              localized: true,
            },
            {
              name: "processTitle",
              type: "text",
              localized: true,
            },
            {
              name: "contactTitle",
              type: "text",
              localized: true,
            },
            {
              name: "contactSubtitle",
              type: "textarea",
              localized: true,
              admin: { description: "Small note shown under the FAQ list" },
            },
            {
              name: "faqTitle",
              type: "text",
              localized: true,
            },
            {
              name: "finalCtaLine1",
              type: "text",
              localized: true,
              admin: { description: "First line of the big closing headline" },
            },
            {
              name: "finalCtaLine2",
              type: "text",
              localized: true,
              admin: { description: "Second line — rendered with accent color" },
            },
          ],
        },
        {
          label: "Branding",
          fields: [
            {
              name: "jobTitle",
              type: "text",
              localized: true,
              defaultValue: "Software Engineer",
              admin: { description: "Used in SEO JSON-LD (Person schema)" },
            },
            {
              name: "ogLocale",
              type: "text",
              defaultValue: "en_US",
              admin: { description: "OpenGraph locale (e.g. en_US, es_MX)" },
            },
          ],
        },
      ],
    },
  ],
};
