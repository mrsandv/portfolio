import type { CollectionConfig } from "payload";

export const Stack: CollectionConfig = {
  slug: "stack",
  admin: {
    useAsTitle: "name",
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "svg",
      type: "textarea",
      required: true,
      admin: {
        description: "Raw SVG code for the icon",
      },
    },
    {
      name: "hex",
      type: "text",
      required: true,
      admin: {
        description: "Hex color code without # (e.g. 00ADD8)",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
