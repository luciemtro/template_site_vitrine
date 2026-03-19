"use client";

import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CookiesPage() {
  const t = useTranslations("Cookies");

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <FontAwesomeIcon icon={faCookieBite} className="w-6" />
          <h1 className="title-lg">{t("title")}</h1>
        </div>

        <p className="text-base-custom text-max mb-10">{t("intro")}</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="what">
            <AccordionTrigger>{t("what.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("what.content")}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="manage">
            <AccordionTrigger>{t("manage.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("manage.content")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
