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

## Composants non éditables

Le logo, les photos de bannière, les icônes de paiement et les liens
CGU/CGV (`style/img/`, `style/doc/`) sont fournis en dur avec le
thème — ce sont des éléments de mise en page, pas du contenu éditorial.
Pour les changer, modifiez les fichiers du thème directement (nouvelle
release).
