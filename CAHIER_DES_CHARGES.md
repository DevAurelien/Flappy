# Cahier des charges — Flappy Dimensions

**Version :** 1.0 — cadrage simplifié  
**Date :** 30 octobre 2026  
**Équipe :** DevAurelien (Aurélien) et Tosbas (Thomas)  
**Type :** jeu d'arcade 2D sur navigateur, sans serveur

## 1. Objectif du projet

Créer à deux un jeu simple inspiré de *Flappy Bird*, permettant de pratiquer **JavaScript, Canvas, la physique de déplacement, les collisions et la collaboration Git**.

Le joueur contrôle un chevalier avec jetpack. Il reste presque fixe sur l'axe horizontal ; le décor et les obstacles se déplacent vers la gauche. Il doit éviter les obstacles, récupérer des objets et obtenir un score élevé. Le jeu propose plusieurs niveaux aux thèmes graphiques distincts.

**Hors périmètre :** énigmes, puzzles, modes complexes, authentification, backend, API, base de données, classement en ligne, multijoueur.

## 2. Périmètre fonctionnel

### F01 — Accueil et partie

- Présenter le titre et un bouton **Jouer**.
- Démarrer le niveau lorsque le joueur clique sur Jouer.
- Afficher le niveau et le score pendant la partie.
- Après une collision, arrêter la partie et afficher **Game Over** puis **Rejouer**.
- Rejouer relance **le niveau en cours**, pas nécessairement toute la progression antérieure.

**Validation :** un clic démarre une seule partie ; une collision arrête le gameplay ; Rejouer réinitialise l'état du niveau.

### F02 — Déplacement et physique

- Le chevalier subit une gravité constante par défaut.
- Espace, clic ou toucher produit une impulsion verticale vers le haut.
- La vitesse verticale et la position sont actualisées en continu.
- L'animation visuelle du chevalier (montée, descente, choc) suit son état.
- Le jetpack possède des flammes adaptées à la poussée.

**Validation :** sans action, le personnage descend ; une impulsion le fait monter ; le comportement ne change pas fortement selon les FPS.

### F03 — Décor et défilement

- Utiliser le ciel et les montagnes fournis comme fond.
- Ajouter un sol cohérent avec le thème graphique.
- Faire défiler les éléments vers la gauche pour simuler l'avancement.
- Prévoir une parallaxe simple si elle reste facile à maintenir (par exemple, fond lent et premier plan plus rapide).
- Le raccord horizontal des images répétées ne doit pas montrer de coupure visible.

**Validation :** le défilement est fluide, sans bande vide ni saut manifeste lors de la répétition.

### F04 — Obstacles

- Utiliser les montagnes/colonnes végétalisées fournies, **sans tuyaux**.
- Générer des obstacles depuis le haut et le bas, avec un passage entre les deux.
- Varier leur **hauteur, largeur et position verticale du passage** dans des limites jouables.
- Respecter un espacement horizontal suffisant entre deux obstacles.
- Déplacer les obstacles vers la gauche et supprimer ceux sortis de l'écran.
- Détecter les collisions avec le chevalier.

**Règle impérative : toucher un obstacle = mort immédiate.**

**Validation :** les ouvertures restent franchissables ; un contact termine la partie ; un obstacle franchi ne rapporte pas plusieurs fois des points.

### F05 — Score

- Ajouter **1 point par paire d'obstacles franchie**.
- Afficher le score en permanence pendant la partie.
- Réinitialiser le score du niveau lors d'un redémarrage après Game Over.
- Conserver éventuellement un meilleur score local via `localStorage` (sans serveur).

**Validation :** le score augmente uniquement à la réussite d'un passage et repart à zéro lors de Rejouer.

### F06 — Objets récupérables

| Objet | Effet attendu | Nature |
| --- | --- | --- |
| Accélération | Augmentation temporaire de la vitesse de défilement | Bonus à équilibrer |
| Propulsion | Augmentation temporaire de la puissance du saut/jetpack | Bonus |
| Poids | Augmentation temporaire de la gravité | Malus |

- Les objets apparaissent dans des positions accessibles, sans passage impossible.
- Un objet disparaît après récupération et applique son effet une seule fois.
- Les effets expirent après un délai configurable ou sont annulés au redémarrage.
- Les valeurs exactes de durée et d'intensité seront choisies après essais.

**Validation :** ramasser un objet modifie uniquement le paramètre prévu ; à la fin de l'effet, la physique revient à la normale.

### F07 — Niveaux

- Prévoir quelques niveaux avec des décors/thèmes distincts.
- Réutiliser **le même gameplay et les mêmes modules**, sans recopier toute la logique.
- Faire évoluer progressivement la difficulté (vitesse, espacement, ouverture, fréquence des objets).
- Le passage au niveau suivant peut être déclenché par un nombre d'obstacles franchis : **seuils à définir ensemble**.
- Après un Game Over, recommencer le niveau actif.

**Validation :** le thème et la difficulté changent sans casser les commandes ou le score.

## 3. Règles de jeu retenues

1. Le joueur lance une partie.
2. Le jetpack donne une impulsion ; la gravité fait redescendre le chevalier.
3. Le décor et les obstacles se déplacent de droite à gauche.
4. Le joueur traverse les passages et peut récupérer des objets.
5. Un obstacle franchi rapporte 1 point.
6. Toute collision dangereuse provoque Game Over.
7. Rejouer relance le niveau courant avec ses paramètres réinitialisés.

Le nombre définitif de niveaux, les vitesses, les forces, les seuils et les durées des effets ne sont **pas figés** à ce stade.

## 4. Contraintes techniques

| Élément | Choix |
| --- | --- |
| Interface | HTML5 / CSS3 |
| Gameplay | JavaScript natif, modules ES |
| Graphisme | Canvas API 2D |
| Développement | Vite |
| Collaboration | Git / GitHub, Pull Requests |
| Stockage | Aucun nécessaire ; `localStorage` facultatif pour les records |
| Backend | Aucun |

Le code doit rester lisible et réparti en quelques modules : **initialisation, joueur/physique, obstacles/collisions, objets, niveaux/score et rendu**. Il n'est pas nécessaire de créer une architecture complexe ou de nombreuses classes.

Principes techniques :

- Une seule boucle principale basée sur `requestAnimationFrame()`.
- Déplacements calculés à partir du temps écoulé (`deltaTime`).
- Coordonnées de jeu cohérentes malgré les changements de taille d'affichage du Canvas.
- Images chargées avant leur premier dessin.
- Collisions simples, adaptées aux sprites (rectangles ou boîtes légèrement ajustées).
- Paramètres de difficulté regroupés et modifiables.

## 5. Répartition du travail à deux

La répartition suivante est **proposée**, à confirmer entre Aurélien et Thomas. Elle évite autant que possible de modifier les mêmes fichiers en parallèle.

| DevAurelien — Aurélien | Tosbas — Thomas |
| --- | --- |
| Structure HTML/CSS, écran d'accueil et Game Over | Commandes clavier/souris/tactile |
| Intégration des visuels et chargement des assets | Gravité, impulsion et animation des états du chevalier |
| Dessin Canvas, fond, sol et défilement/parallaxe | Génération, défilement et suppression des obstacles |
| Affichage du score et paramètres de niveaux | Collisions, bonus et malus |
| Intégration des thèmes et ajustement responsive | Réglages de difficulté et tests du gameplay |

**En commun :** conventions de données et coordonnées, décisions de gameplay, équilibrage, tests, corrections, revue des Pull Requests et livraison.

### Interfaces à convenir avant le développement parallèle

- Même repère de coordonnées et même échelle pour le personnage et les obstacles.
- Une structure de données commune pour position, largeur et hauteur.
- Un moyen clair de signaler au jeu : obstacle franchi, objet ramassé, collision, fin de niveau.
- Une seule partie du code responsable de lancer et d'arrêter la boucle d'animation.

## 6. Git et méthode de collaboration

- Créer **un nouveau dépôt** pour la version simplifiée.
- `main` contient une version jouable/stable.
- Chacun travaille sur des branches `feature/...` liées à sa tâche.
- Les changements sont intégrés par Pull Request après vérification.
- Une branche `dev` peut être utilisée pour l'intégration si vous souhaitez conserver votre organisation précédente ; elle n'est pas obligatoire.
- Avant une fusion : lancement local, test de la fonctionnalité et vérification de l'absence de régression évidente.

Les décisions et la validation sont partagées entre les deux développeurs : il s'agit d'un **projet commun**, pas d'une organisation hiérarchique.

## 7. Découpage en étapes

| Étape | Travail | Résultat attendu |
| --- | --- | --- |
| 1 | Nouveau dépôt Vite, écran et Canvas, chargement des visuels | Le jeu s'affiche |
| 2 | Physique, commandes et animation du chevalier | Le personnage monte et descend |
| 3 | Défilement, obstacles aléatoires et collisions | Le niveau 1 est jouable |
| 4 | Score, Game Over et Rejouer | Boucle de jeu complète |
| 5 | Objets vitesse / propulsion / poids | Bonus et malus opérationnels |
| 6 | Autres thèmes et réglage de difficulté | Plusieurs niveaux jouables |
| 7 | Responsive, corrections et éventuelle publication | Version stable partageable |

**Priorité absolue : terminer les étapes 1 à 4 avant d'ajouter d'autres niveaux ou effets.**

## 8. Critères d'acceptation de la première version jouable

- [ ] La page charge sans erreur bloquante.
- [ ] Jouer démarre une seule boucle de jeu.
- [ ] Espace, clic et toucher déclenchent une impulsion.
- [ ] Le personnage redescend sous l'effet de la gravité.
- [ ] Fond et obstacles défilent sans coupure importante.
- [ ] Les hauteurs et largeurs d'obstacles varient dans des limites jouables.
- [ ] Chaque passage réussi ajoute exactement 1 point.
- [ ] Toucher un obstacle arrête immédiatement le niveau.
- [ ] Rejouer remet à zéro les positions, obstacles, effets et score du niveau.
- [ ] L'affichage reste utilisable sur les écrans ciblés.

## 9. Points à décider ensemble

- Nombre de niveaux (par exemple trois pour démarrer) et thèmes retenus.
- Condition de passage au niveau suivant.
- Valeurs de gravité, impulsion et vitesse de défilement.
- Taille minimale des passages et fréquence des obstacles.
- Effet précis de l'accélération sur la difficulté et le score.
- Durée et cumul éventuel des bonus/malus.
- Conservation ou non d'un record local.
- Mode de publication (GitHub Pages si vous le souhaitez).

## 10. Livrables

1. Un dépôt GitHub partagé avec code source.
2. Une version jouable comprenant au minimum un niveau complet, collisions, score et redémarrage.
3. Les niveaux et objets supplémentaires prévus après validation du premier niveau.
4. Un README indiquant les commandes de lancement.
5. Ce cahier des charges, mis à jour uniquement en cas de changement important du périmètre.
