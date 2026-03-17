import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocaleSwitcherItem from "@/components/ui/locale-switcher-item";
import { type Locale, locales } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("Locale_switcher");
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {t("short_locale", { locale })}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((cur: Locale) => (
          <LocaleSwitcherItem key={cur} locale={cur}>
            {t("locale", { locale: cur })}
          </LocaleSwitcherItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
