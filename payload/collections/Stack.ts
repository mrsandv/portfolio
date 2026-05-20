import type { CollectionConfig } from "payload";

export const Stack: CollectionConfig = {
  slug: "stack",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Display name (e.g. Go, TypeScript, AWS)" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        description:
          "Icon slug. First match in simple-icons; otherwise must exist in lib/stack-extras.ts.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
