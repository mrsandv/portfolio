import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { isLocale } from "./i18n";

/**
 * Locale of the current request, read from the `[locale]` segment. Server
 * Components only: root params aren't available in Client Components or
 * Route Handlers.
 */
export async function getLocale() {
  const value = await locale();
  if (!isLocale(value)) notFound();
  return value;
}
