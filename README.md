# Discord Bot

## Description

Ce bot Discord permet d'envoyer des messages directs à tous les utilisateurs. Développé avec `discord.js`, il interagit avec l'API Discord.

## Fonctionnalités

- `ping` : Affiche la latence de l'API et la latence du bot.
- `stats` : Affiche les statistiques du bot, telles que le nombre de serveurs et d'utilisateurs.
- `dm` : Permet aux administrateurs d'envoyer un message direct à tous les utilisateurs du bot.

## Prérequis

- Node.js (version 18 ou ultérieure recommandée)
- `discord.js` (version 14 ou ultérieure)

## Installation

1. **Téléchargez les fichiers nécessaires** :

    Téléchargez les fichiers suivants depuis le dépôt ou le lien fourni :

    - `index.js` : Le fichier principal du bot.
    - `config.json` : Contient les informations de configuration du bot (token et préfixe).
    - `package.json` : Définit les dépendances du projet.
    - `package-lock.json` : Assure la cohérence des versions des dépendances.

    Assurez-vous que ces fichiers sont placés dans le même répertoire.

2. **Installez les dépendances** :

    Assurez-vous que Node.js est installé sur votre machine. Ensuite, ouvrez un terminal, naviguez jusqu'au répertoire contenant les fichiers téléchargés, et exécutez la commande suivante :

    ```bash
    npm install
    ```

3. **Configurez le bot** :

    Modifier le fichier `config.json` dans le répertoire racine du projet avec le contenu suivant :

    ```json
    {
        "TOKEN": "VOTRE_TOKEN_DISCORD",
        "PREFIX": "VOTRE_PREFIX"
    }
    ```

    Remplacez `VOTRE_TOKEN_DISCORD` par le token de votre bot Discord et `VOTRE_PREFIX` par le préfixe des commandes que vous souhaitez utiliser.

## Utilisation

1. **Démarrez le bot** :

    Avec les fichiers configurés et les dépendances installées, lancez le bot en exécutant la commande suivante dans le terminal :

    ```bash
    node index.js
    ```

2. **Envoyez les commandes suivantes dans un serveur où le bot est présent** :

    - `ping` : Affiche la latence du bot.
    - `stats` : Affiche les statistiques du bot.
    - `dm` : Permet d'envoyer un message à tous les utilisateurs du bot. Cette commande nécessite des permissions d'administrateur.

## Auteurs

- [matrax.dev](https://github.com/matrax123)

## Support 

- [Discord server](https://discord.gg/2K2N9zU4nE)
