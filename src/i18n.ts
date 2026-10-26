import { english } from "./locales/en";
export type Locale = "ko" | "en";
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
export function translate<T>(value: T, locale: Locale): T {
  if (locale === "ko") return value;
  if (Array.isArray(value))
    return value.map((item) => translate(item, locale)) as T;
  if (typeof value !== "string") return value;
  const key = normalize(value);
  if (Object.hasOwn(english, key))
    return value.replace(value.trim(), english[key]) as T;
  return value;
}
// Localize structured content without changing IDs, source figures or URLs.
export function translateData<T>(value: T, locale: Locale): T {
  if (locale === "ko") return value;
  if (Array.isArray(value))
    return value.map((item) => translateData(item, locale)) as T;
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateData(item, locale),
      ]),
    ) as T;
  return translate(value, locale);
}
export function documentPath(file: string, locale: Locale) {
  return locale === "en" ? `en/${file}` : file;
}
