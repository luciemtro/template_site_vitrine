// app/[locale]/about/page.tsx

import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config/site"
import { getGoogleRating } from "@/lib/google-rating"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About")
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

export default async function AboutPage() {
  const t = await getTranslations("About")

  const googleData = siteConfig.googlePlaceId ? await getGoogleRating() : null

  const stats = [
    { key: "s1", value: siteConfig.stats.yearFounded },
    { key: "s2", value: siteConfig.stats.projectsDone },
    { key: "s3", value: siteConfig.stats.satisfactionRate },
    ...(googleData
      ? [{ key: "s4", value: `${googleData.rating}★`, label: `${googleData.total} avis Google` }]
      : []),
  ]

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-32 max-w-5xl mx-auto">

      {/* HERO */}
      <section className="mb-24">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
          {t("hero.eyebrow")}
        </p>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight mb-6">
          {t("hero.title")}
          <span className="text-accent">.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {t("hero.description")}
        </p>
      </section>

      {/* HISTOIRE */}
      <section className="mb-24 grid sm:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            {t("story.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t("story.p1")}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t("story.p2")}
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden bg-secondary aspect-square" />
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="mb-24">
        <div className={`grid grid-cols-2 gap-4 ${stats.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
          {stats.map(({ key, value, label }) => (
            <div
              key={key}
              className="rounded-2xl border border-border bg-secondary p-6 text-center"
            >
              <p className="text-3xl font-black text-accent mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">
                {label ?? t(`stats.${key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VALEURS */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {t("values.title")}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t("values.subtitle")}
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {(["v1", "v2", "v3"] as const).map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-border bg-secondary p-6"
            >
              <span className="text-2xl mb-3 block">{t(`values.${key}.icon`)}</span>
              <h3 className="font-semibold mb-1">{t(`values.${key}.label`)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`values.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {t("team.title")}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t("team.subtitle")}
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {(["m1", "m2", "m3"] as const).map((key) => (
            <div key={key} className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-secondary mb-4" />
              <h3 className="font-semibold">{t(`team.${key}.name`)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`team.${key}.role`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-cta-bg text-cta-text p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-1">
            {t("cta.title")}
          </h2>
          <p className="text-sm opacity-60">
            {t("cta.subtitle")}
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:opacity-90 shrink-0"
        >
          {t("cta.button")}
        </a>
      </section>

    </main>
  )
}
