"use client";

import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <FontAwesomeIcon icon={faFileContract} className="w-6" />
          <h1 className="title-lg">{t("title")}</h1>
        </div>

        <p className="text-base-custom text-max mb-10">{t("intro")}</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="use">
            <AccordionTrigger>{t("use.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("use.content")}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="responsibility">
            <AccordionTrigger>{t("responsibility.title")}</AccordionTrigger>
            <AccordionContent>
              <p className="text-base-custom">{t("responsibility.content")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
