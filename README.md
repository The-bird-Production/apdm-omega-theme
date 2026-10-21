# apdm-omega-theme

Thème [Omega CMS](https://github.com/The-bird-Production/Project-Omega-CMS) pour le meublé de tourisme **Au Pied du Morclan** ([aupieddumorclan.fr](https://aupieddumorclan.fr)).

## Installation

Depuis l'admin Omega CMS (`/admin/theme`), installez ce thème en donnant
son dépôt : `The-bird-Production/apdm-omega-theme`. L'installation
récupère la dernière release GitHub du dépôt.

### Après installation

Les 6 pages du site (`about-us`, `lodge`, `book`, `faq`, `contact`,
`webcam`) sont importées automatiquement à l'installation, avec un
contenu de démarrage qui reproduit la structure du vrai site — texte,
boutons, galerie, accordéon FAQ/équipement, widget de réservation,
webcam — entièrement composé de blocs standards de l'éditeur Omega (voir
[docs/plugin-and-theme-development.md](https://github.com/The-bird-Production/Project-Omega-CMS/blob/main/docs/plugin-and-theme-development.md)
pour le détail de ces blocs). Chaque page reste ensuite éditable
normalement depuis `/admin/page/edit/<slug>`, comme n'importe quelle
page Omega — il n'y a plus de "Modèle de page" à choisir, ni de mise en
page câblée en dur dans le thème : tout est du contenu.

**Une seule chose reste à faire à la main** : le menu principal
(`/admin/menu`, menu `main`) — les liens de navigation ne sont pas créés
automatiquement. Créez-les avec ces URLs :

- Accueil → `/`
- Qui sommes nous → `/about-us`
- Le logement → `/lodge`
- Réserver → `/book`
- FAQ → `/faq`
- Contact → `/contact`
- Webcam → `/webcam`

Réinstaller ou mettre à jour le thème ne touche jamais une page déjà
existante — seules les pages manquantes (jamais créées, ou supprimées
depuis) sont réimportées.

### Contenu de démarrage à personnaliser

Les photos de la galerie du logement, les textes des accordéons
d'équipement ("Cuisine", "Salon"...) et la photo "Qui sommes nous"
utilisent des images génériques fournies avec le thème — remplacez-les
par vos propres photos et textes directement dans l'éditeur, comme le
reste du contenu.

## Version 3.0 — refonte 2026

- **Design clair** (neige, ciel, sarcelle du logo, bois de mélèze), polices
  Big Shoulders Display / Figtree (Google Fonts).
- **Bouton ❄ Hiver / ☀ Été** dans le header : il bascule tout le site
  (couleurs, bannière vidéo ou photo, contenus saisonniers). Le choix du
  visiteur est mémorisé ; par défaut hiver d'octobre à avril, été de mai à
  septembre.
- **Header sticky** avec bouton « Réserver » (Amenitiz) et menu mobile
  (offcanvas Bootstrap).
- **Footer** clair ; lien WhatsApp corrigé (`33767677333`, l'ancien numéro
  n'avait pas l'indicatif) ; l'adresse e-mail personnelle du lien
  « Signaler un bug » a été retirée.
- **Nouvelle page d'accueil** (`content/pages/home.json`) : bannière vidéo,
  chiffres clés, logement, emplacement, activités selon la saison,
  réservation, avis Airbnb + Google, FAQ courte, hôtes, derniers articles.
- **Blocs du thème** (`components/blocks.js`), disponibles dans l'éditeur :

| Bloc | Rôle | Réglages (formulaire sous le bloc dans l'éditeur) |
| --- | --- | --- |
| `apdmHero` | Bannière plein cadre : vidéo l'hiver, photo l'été, voile clair, titre, atouts, formulaire de dates, badge de note | titres hiver/été (`*mot*` = couleur), sous-titres, atouts, URLs vidéo/images, lien de réservation, note |
| `apdmFacts` | Bande de chiffres clés | une ligne par chiffre : `valeur\|libellé` |
| `apdmBand` | Conteneur : peint ses blocs enfants sur un fond pleine largeur | `tone` = `sky`, `sun` ou `paper`, `anchor` (ex. `avis`) |
| `apdmSeason` | Conteneur : ses blocs enfants ne s'affichent qu'en hiver **ou** qu'en été | `only` = `hiver` ou `ete` |
| `apdmSteps` | Étapes de réservation | une ligne par étape : `étiquette\|titre\|texte` |
| `apdmReviews` | Notes + cartes d'avis | `scores` : `Source\|note\|nb avis\|URL\|badge\|détails` ; `reviews` : `Source\|date\|nom\|texte` (`*` devant = mis en avant) |

Dans les listes, préfixez une ligne par `h:` (hiver) ou `e:` (été) pour ne
l'afficher que dans cette saison.

### Mettre à jour un site existant vers la 3.0

L'installeur n'écrase **jamais** une page existante. Sur
aupieddumorclan.fr, la page `home` existe déjà : après la mise à jour du
thème, le header, le footer, les couleurs et les polices changent tout de
suite sur toutes les pages, mais **l'accueil garde son ancien contenu**.
Pour obtenir la nouvelle page d'accueil :

1. dans `/admin/page`, renommez l'ancienne page `home` (ex. `home-2025`)
   pour la garder en sauvegarde, ou supprimez-la ;
2. réinstallez / mettez à jour le thème : `home.json` est alors importé.

Les blocs du thème et le nouveau `style.css` demandent un redémarrage de
`apps/web` (fait automatiquement par le superviseur après l'installation,
quelques minutes). Comme toute page contenant des blocs non standard,
l'accueil est rendu côté client (voir la doc Omega).

Menu conseillé (`/admin/menu`, menu `main`) : Le logement `/lodge`,
Réserver `/book`, Qui sommes-nous `/about-us`, FAQ `/faq`, Blog `/article`,
Webcam `/webcam`, Contact `/contact`.

## Composants non éditables

Le logo, les photos de bannière, les icônes de paiement et les liens
CGU/CGV (`style/img/`, `style/doc/`) sont fournis en dur avec le
thème — ce sont des éléments de mise en page, pas du contenu éditorial.
Pour les changer, modifiez les fichiers du thème directement (nouvelle
release).
