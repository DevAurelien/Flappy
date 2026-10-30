# Flappy Dimensions

![FlappyDimensions](./src/assets/img/Écran%20de%20jeu%20Dimensions%20_%20chevalier%20volant.png)

**Flappy Dimensions** est un jeu d'arcade 2D sur navigateur, développé à deux par **DevAurelien (Aurélien)** et **Tosbas (Thomas)**.

Le principe est volontairement simple : piloter un chevalier équipé d'un jetpack, éviter des obstacles qui défilent de droite à gauche et obtenir le meilleur score possible. Le jeu reprend le fonctionnement de *Flappy Bird* avec des décors fantastiques, plusieurs niveaux et des objets à ramasser qui modifient temporairement la physique.

## Fonctionnement du jeu

- Le chevalier reste globalement à la même position horizontale ; le décor et les obstacles défilent pour donner l'impression d'avancer.
- La gravité entraîne le personnage vers le bas. Chaque action du joueur produit une impulsion vers le haut.
- Les obstacles apparaissent par paires, depuis le haut et le bas, avec une ouverture, des hauteurs et des largeurs variables.
- **Toucher un obstacle entraîne immédiatement un Game Over et le redémarrage du niveau en cours.**
- Chaque paire d'obstacles franchie rapporte des points.
- Plusieurs niveaux proposent des thèmes graphiques différents et une difficulté progressive.

## Objets à récupérer

| Objet | Effet temporaire | Type |
| --- | --- | --- |
| Accélération | Augmente la vitesse de défilement du jeu | Bonus, à équilibrer |
| Plume | Diminue la gravité subie par le chevalier | Bonus |
| Poids | Augmente la gravité subie par le chevalier | Malus |

Les durées, intensités et fréquences d'apparition seront ajustées pendant les tests. Une collision avec un objet à récupérer ne provoque pas la mort : elle applique son effet.

## Commandes prévues

- **Espace / clic / toucher l'écran** : activer le jetpack (impulsion vers le haut).
- **Jouer** : commencer une partie.
- **Rejouer** : recommencer le niveau après un Game Over.

Les commandes doivent rester identiques d'un niveau à l'autre.

## Niveaux

Le jeu comprendra **quelques niveaux thématiques**. Chaque niveau réutilisera le même moteur, avec un décor, un ensemble d'obstacles et des paramètres de difficulté propres. Le nombre exact de niveaux et les seuils de progression seront fixés au cours du développement.

**Première priorité : un niveau 1 complet et jouable** avant de créer les autres thèmes.

## Technologies

- HTML5 et CSS3 pour l'interface ;
- JavaScript natif (modules ES) pour le gameplay ;
- Canvas 2D pour l'affichage et les animations ;
- Vite pour le développement et la compilation ;
- Git et GitHub pour la collaboration.

**Pas de framework frontend, pas de backend, pas de base de données et pas de compte utilisateur prévus.** Les éventuels records personnels peuvent être enregistrés avec `localStorage`.

## Lancer le projet en local

Pré-requis : **Node.js et npm** installés.

```bash
npm install
npm run dev
```

Ouvrir ensuite l'adresse indiquée par Vite dans le terminal.

Pour vérifier une version de production :

```bash
npm run build
npm run preview
```

## Organisation du projet

Une structure simple est privilégiée : un point d'entrée JavaScript, des fichiers séparés pour le personnage, les obstacles et les objets, et un dossier d'images pour les sprites et les décors. L'arborescence définitive sera décidée ensemble au démarrage du nouveau dépôt.

## Collaboration

- **DevAurelien (Aurélien)** : interface, intégration graphique, décors et défilement, affichage des scores et niveaux.
- **Tosbas (Thomas)** : commandes, physique du personnage, obstacles, collisions et objets à récupérer.
- **Tous les deux** : choix des paramètres, tests, corrections et intégration Git.

Cette répartition est une **proposition de départ**, modifiable d'un commun accord.

Une branche `main` conserve la version stable ; des branches de fonctionnalité permettent de travailler séparément, avec des Pull Requests pour intégrer les changements.

## Avancement

Le projet redémarre sur un nouveau dépôt. Les premiers visuels (chevalier, ciel et obstacles) servent de base graphique ; le gameplay sera reconstruit progressivement.

- [X] Créer le nouveau dépôt et installer Vite
- [ ] Afficher le ciel, le sol et le personnage dans Canvas
- [ ] Implémenter gravité et impulsion
- [ ] Faire défiler le décor et les obstacles
- [ ] Détecter les collisions et gérer Game Over / Rejouer
- [ ] Ajouter le score
- [ ] Ajouter bonus et malus
- [ ] Ajouter les niveaux suivants
- [ ] Tester et publier une version jouable

## Auteurs

Projet commun réalisé par **DevAurelien (Aurélien)** et **Tosbas (Thomas)** dans le cadre de leur apprentissage du développement web.
