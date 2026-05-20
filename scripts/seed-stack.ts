import { getPayload } from "payload";
import config from "../payload.config";

const STACK_ITEMS = [
  { name: "Go", slug: "go", order: 0 },
  { name: "Rust", slug: "rust", order: 1 },
  { name: "Python", slug: "python", order: 2 },
  { name: "TypeScript", slug: "typescript", order: 3 },
  { name: "JavaScript", slug: "javascript", order: 4 },
  { name: "Node.js", slug: "nodejs", order: 5 },
  { name: "React", slug: "react", order: 6 },
  { name: "Next.js", slug: "nextjs", order: 7 },
  { name: "Express", slug: "express", order: 8 },
  { name: "Gin", slug: "gin", order: 9 },
  { name: "MongoDB", slug: "mongodb", order: 10 },
  { name: "PostgreSQL", slug: "postgresql", order: 11 },
  { name: "Redis", slug: "redis", order: 12 },
  { name: "Supabase", slug: "supabase", order: 13 },
  { name: "Vercel", slug: "vercel", order: 14 },
];

async function run() {
  const payload = await getPayload({ config });

  for (const item of STACK_ITEMS) {
    const existing = await payload.find({
      collection: "stack",
      where: { slug: { equals: item.slug } },
      limit: 1,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "stack",
        id: existing.docs[0].id,
        data: item,
      });
      console.log(`✓ Stack[${item.slug}] updated`);
    } else {
      await payload.create({
        collection: "stack",
        data: item,
      });
      console.log(`✓ Stack[${item.slug}] created`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
