# 📄 Pages du site

## Structure

Toutes les pages sont dans :

```
app/[locale]/(marketing)/
```

---

## Pages importantes

* `/` → Accueil
* `/legal` → Mentions légales
* `/privacy` → Politique de confidentialité
* `/contact` → Contact

---

## Ajouter une page

Créer un dossier :

```
nouvelle-page/page.tsx
```

---

## Exemple

```tsx
export default function Page() {
  return <div>Ma page</div>;
}
```

---

💡 Conseil :
Réutilise les composants dans `/components/sections`.
