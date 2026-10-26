import { createContext, useContext } from "react";
import { translate, translateData } from "./i18n";
import type { Locale } from "./i18n";
import { products, categories, processes } from "./products";
import { navigation } from "./navigation";
import { company } from "./company";
export const LocaleContext = createContext<Locale>("ko");
const content = {
  ko: { products, categories, processes, navigation, company },
  en: {
    ...translateData(
      { products, categories, processes, navigation, company },
      "en",
    ),
    company: { ...translateData(company, "en"), telephone: "+82-41-537-8115" },
  },
};
export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: <T,>(value: T): T => translate(value, locale),
    ...content[locale],
  };
}
