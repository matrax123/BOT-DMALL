# Discord Bot

## Description

This Discord bot allows you to send direct messages to all users. Developed using `discord.js`, it interacts with the Discord API.

## Features

-   `ping`: Displays the API latency and the bot's latency.
-   `stats`: Shows the bot's statistics, such as the number of servers and users.
-   `dm`: Allows administrators to send a direct message to all users of the bot.

## Prerequisites

-   `Node.js` (version 18 or higher recommended)
-   `discord.js` (version 14)

## Installation

1. **Download the necessary files**:

    Download the following files from the repository or provided link:

    - `index.js`: The main file of the bot.
    - `config.json`: Contains the bot's configuration information (token and prefix).
    - `package.json`: Defines the project's dependencies.
    - `package-lock.json`: Ensures the consistency of dependency versions.

    Ensure these files are placed in the same directory.

2. **Install the dependencies**:

    Make sure Node.js is installed on your machine. Then, open a terminal, navigate to the directory containing the downloaded files, and run the following command:

    ```bash
    npm install
    ```

3. **Configure the bot**:

    Edit the `config.json` file in the root directory of the project with the following content:

    ```json
    {
        "TOKEN": "YOUR_DISCORD_TOKEN",
        "PREFIX": "YOUR_PREFIX"
    }
    ```

    Replace `YOUR_DISCORD_TOKEN` with your Discord bot token and `YOUR_PREFIX` with the command prefix you want to use.

## Usage

1. **Start the bot**:

    With the files configured and dependencies installed, start the bot by running the following command in the terminal:

    ```bash
    node index.js
    ```

2. **Send the following commands in a server where the bot is present**:

    - `ping`: Displays the bot's latency.
    - `stats`: Shows the bot's statistics.
    - `dm`: Allows you to send a message to all users of the bot. This command requires administrative permissions.

## Authors

-   [matrax.dev](https://github.com/matrax123)

## Support

-   [Discord server](https://discord.gg/2K2N9zU4nE)
