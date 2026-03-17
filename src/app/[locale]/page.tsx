import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/ui/locale-switcher";

export default function HomePage() {
  const t = useTranslations("Index");

  return (
    <main>
      <LocaleSwitcher />
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}
