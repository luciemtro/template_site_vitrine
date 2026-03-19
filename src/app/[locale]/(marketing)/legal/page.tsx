"use client";

import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LegalPage() {
  const t = useTranslations("Legal");

  return (
    <main className="section-padding">
      <div className="container-custom">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <FontAwesomeIcon icon={faScaleBalanced} className="w-6" />
          <h1 className="title-lg">{t("title")}</h1>
        </div>

        <p className="text-base-custom text-max mb-10">{t("intro")}</p>

        {/* ACCORDION */}
        <Accordion type="single" collapsible className="w-full">
          {/* ENTREPRISE */}
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("company.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("company.content")}</p>
            </AccordionContent>
          </AccordionItem>

          {/* HÉBERGEMENT */}
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("hosting.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("hosting.content")}</p>
            </AccordionContent>
          </AccordionItem>

          {/* RESPONSABILITÉ */}
          <AccordionItem value="item-3">
            <AccordionTrigger>{t("liability.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("liability.content")}</p>
            </AccordionContent>
          </AccordionItem>

          {/* PROPRIÉTÉ */}
          <AccordionItem value="item-4">
            <AccordionTrigger>{t("intellectual.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("intellectual.content")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
