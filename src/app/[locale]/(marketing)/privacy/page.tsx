"use client";

import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <FontAwesomeIcon icon={faShieldHalved} className="w-6" />
          <h1 className="title-lg">{t("title")}</h1>
        </div>

        <p className="text-base-custom text-max mb-10">{t("intro")}</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="data">
            <AccordionTrigger>{t("data.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("data.content")}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="usage">
            <AccordionTrigger>{t("usage.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("usage.content")}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rights">
            <AccordionTrigger>{t("rights.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("rights.content")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
