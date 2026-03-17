import { useTranslations } from "next-intl";

export default function HomePage() {
  // 'Index' correspond à la clé principale de ton fichier JSON
  const t = useTranslations("Index");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}
