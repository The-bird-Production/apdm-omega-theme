# apdm-omega-theme

Thème [Omega CMS](https://github.com/The-bird-Production/Project-Omega-CMS) pour le meublé de tourisme **Au Pied du Morclan** ([aupieddumorclan.fr](https://aupieddumorclan.fr)).

## Installation

Depuis l'admin Omega CMS (`/admin/theme`), installez ce thème en donnant
son dépôt : `The-bird-Production/apdm-omega-theme`. L'installation
récupère la dernière release GitHub du dépôt.

### Après installation

Le contenu (textes, photos) de chaque page est éditable depuis l'admin
comme n'importe quelle page Omega — voir
[docs/plugin-and-theme-development.md](https://github.com/The-bird-Production/Project-Omega-CMS/blob/main/docs/plugin-and-theme-development.md)
du CMS pour le fonctionnement général des thèmes. Deux choses ne sont
**pas** créées automatiquement par l'installation et doivent être faites
une fois, à la main :

1. **Le menu principal** (`/admin/menu`, menu `main`) — les liens de
   navigation ne sont pas fournis par le thème. Créez-les avec ces URLs :
   - Accueil → `/`
   - Qui sommes nous → `/about-us`
   - Le logement → `/lodge`
   - Réserver → `/book`
   - FAQ → `/faq`
   - Contact → `/contact`
   - Webcam → `/webcam`

2. **Les 6 pages** (`/admin/page/new`), une par modèle déclaré dans
   `theme.json` (`about-us`, `lodge`, `book`, `faq`, `contact`,
   `webcam`), avec le slug correspondant et le "Modèle de page"
   assorti. Le contenu de chaque page (texte, photos) se remplit
   ensuite depuis l'éditeur par blocs :
   - **about-us / book / contact / webcam** : texte libre, plus une
     image pour about-us.
   - **faq** : un bloc "Titre" par question, suivi du/des bloc(s) de
     réponse — chaque titre devient un item d'accordéon.
   - **lodge** : même principe pour la section "Équipement" (un titre
     par pièce/catégorie), et n'importe quel bloc "Image" ajouté dans
     la page alimente le carrousel de photos, dans l'ordre.

## Composants non éditables

Le logo, les photos de bannière, les icônes de paiement et les liens
CGU/CGV (`style/img/`, `style/doc/`) sont fournis en dur avec le
thème — ce sont des éléments de mise en page, pas du contenu éditorial.
Pour les changer, modifiez les fichiers du thème directement (nouvelle
release).
