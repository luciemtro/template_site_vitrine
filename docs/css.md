# 🎨 Configuration du design (CSS)

## 1. Couleurs

Les couleurs principales du site sont définies dans :

👉 `app/globals.css`

Cherche la section :

```
:root {
```

Tu peux modifier :

* `--primary` → couleur principale (boutons, accents)
* `--background` → fond du site
* `--foreground` → texte principal
* `--muted-foreground` → texte secondaire

---

## 2. Dark mode

Les couleurs du mode sombre sont définies dans :

```
.dark {
```

Tu peux adapter les couleurs pour correspondre à ton branding.

---

## 3. Typographie

Les tailles et styles de texte sont dans :

```
@layer components
```

Classes importantes :

* `.title-xl` → grand titre (hero)
* `.title-lg` → titre section
* `.text-base-custom` → texte normal

---

## 4. Polices

Les polices sont définies dans :

👉 `layout.tsx`

Tu peux modifier :

* `fontSans` → police principale
* `fontHeading` → police des titres

⚠️ Maximum 2 polices recommandé.

---

## 5. Espacements

Classes utiles :

* `.section-padding` → espace entre sections
* `.container-custom` → largeur du site
* `.section-gap` → espace vertical

---

## 6. Boutons

* `.btn-primary` → bouton principal
* `.btn-secondary` → bouton secondaire

Tu peux modifier leur style dans `globals.css`.

---

💡 Conseil :
Change uniquement les variables → tout le site s’adapte automatiquement.
