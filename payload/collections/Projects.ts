import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "status", "size"],
  },
  access: { read: () => true },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Snippet (code only)", value: "snippet" },
        { label: "Client work (private repo)", value: "client" },
        { label: "Open source", value: "open" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "title", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", required: true, localized: true },
    {
      name: "tags",
      type: "array",
      required: true,
      minRows: 1,
      localized: true,
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "size",
      type: "select",
      required: true,
      defaultValue: "medium",
      options: [
        { label: "Small (1 col)", value: "small" },
        { label: "Medium (2 cols)", value: "medium" },
        { label: "Large (2x2)", value: "large" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "status", type: "text", required: true, defaultValue: "Shipped", localized: true },
    {
      name: "isComingSoon",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    // Snippet-only
    {
      name: "language",
      type: "text",
      required: false,
      admin: {
        condition: (data) => data?.kind === "snippet",
        description: "Language slug for highlighting (e.g. go, typescript, rust)",
      },
    },
    {
      name: "code",
      type: "code",
      required: false,
      admin: { condition: (data) => data?.kind === "snippet" },
    },
    {
      name: "output",
      type: "textarea",
      required: false,
      localized: true,
      admin: { condition: (data) => data?.kind === "snippet" },
    },
    // Client + Open: screenshot
    {
      name: "screenshot",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: { condition: (data) => data?.kind === "client" || data?.kind === "open" },
    },
    // Client only
    {
      name: "liveUrl",
      type: "text",
      required: false,
      admin: {
        condition: (data) => data?.kind === "client",
        description: "Public URL of the live site",
      },
    },
    // Open only
    {
      name: "repoUrl",
      type: "text",
      required: false,
      admin: { condition: (data) => data?.kind === "open" },
    },
    {
      name: "demoUrl",
      type: "text",
      required: false,
      admin: { condition: (data) => data?.kind === "open" },
    },
    {
      name: "cli",
      type: "code",
      required: false,
      admin: {
        condition: (data) => data?.kind === "open",
        description: "Optional install/run instructions (bash)",
      },
    },
  ],
};
