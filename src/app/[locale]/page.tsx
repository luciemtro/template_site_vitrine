import { faArrowRightLong, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Index");

  return (
    <main>
      <FontAwesomeIcon icon={faGift} className="w-6" />
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <FontAwesomeIcon icon={faArrowRightLong} className="w-6" />
    </main>
  );
}
