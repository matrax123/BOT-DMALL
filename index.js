const {
    Client,
    IntentsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    PermissionFlagsBits,
} = require("discord.js");

const config = require("./config.json");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
    ],
});

client.login(config.TOKEN);

client.on("ready", () => {
    console.log(`[+] ${client.user.tag} is ready!`);
});

const hasAdminPermission = (member) =>
    member.permissions.has(PermissionFlagsBits.Administrator);

const commands = {
    ping: async (message) => {
        const pingAPI = client.ws.ping;
        const pingBot = Date.now() - message.createdTimestamp;

        const pingEmbed = new EmbedBuilder()
            .setTitle(`\`🛜\` Here is the bot's latency.`)
            .addFields(
                {
                    name: "API Latency",
                    value: `\`${pingAPI}ms\``,
                    inline: true,
                },
                { name: "Bot Latency", value: `\`${pingBot}ms\``, inline: true }
            );

        await message.reply({ embeds: [pingEmbed] });
    },

    stats: async (message) => {
        const guildsSize = client.guilds.cache.size;
        const usersSize = client.users.cache.size;

        const statsEmbed = new EmbedBuilder()
            .setTitle(`\`🔧\` Here is the bot's statistics.`)
            .addFields(
                {
                    name: "Servers",
                    value: `\`${guildsSize}\``,
                    inline: true,
                },
                {
                    name: "Users",
                    value: `\`${usersSize}\``,
                    inline: true,
                }
            );

        await message.reply({ embeds: [statsEmbed] });
    },

    dm: async (message) => {
        const member = await message.guild.members.cache.get(message.author.id);

        if (!hasAdminPermission(member)) {
            return message.reply(
                `You don't have the permission to use this command. You need the \`Administrator\` permission.`
            );
        }

        const dmEmbed = new EmbedBuilder()
            .setTitle(`\`📨\` DM ${client.users.cache.size} users`)
            .setDescription(
                `Do you want to send a message to all users that the bot can reach?`
            );

        const dmButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel("DM")
                .setCustomId("DM")
                .setEmoji("📨")
        );

        await message.reply({
            embeds: [dmEmbed],
            components: [dmButton],
        });
    },
};

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const prefix = config.PREFIX;

    if (message.content.startsWith(prefix)) {
        const commandName = message.content
            .slice(prefix.length)
            .trim()
            .split(" ")[0];
        const command = commands[commandName];
        if (command) command(message);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!hasAdminPermission(interaction.member)) {
        return interaction.reply({
            content: `You don't have the permission to use this command. You need the \`Administrator\` permission.`,
            ephemeral: true,
        });
    }

    const [arg1, arg2] = interaction.customId.split("-");

    if (interaction.isButton()) {
        if (arg1 === "DM") {
            const modal = new ModalBuilder()
                .setCustomId("DM")
                .setTitle("DM all users")
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId("message")
                            .setLabel("The message")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                    )
                );

            await interaction.showModal(modal);
        } else if (arg1 === "send") {
            if (arg2 === "yes") {
                const messageSend =
                    interaction.message.embeds[0].fields[0].value.slice(3, -3);
                let sentCount = 0;
                let failedCount = 0;

                const sendMessage = async (user) => {
                    try {
                        await user.send(messageSend);
                        console.log(`Message sent to ${user.tag}`);
                        sentCount++;
                    } catch (err) {
                        console.error(`Failed to send DM to ${user.tag}:`, err);
                        failedCount++;
                    }
                };

                for (const guild of client.guilds.cache.values()) {
                    await guild.members.fetch();
                }
                for (const user of client.users.cache.values()) {
                    if (!user.bot) {
                        await sendMessage(user);
                    }
                }

                const successEmbed = new EmbedBuilder()
                    .setTitle(`\`✅\` DM ${sentCount} users`)
                    .setDescription(
                        `Message sent to ${sentCount} users, failed to send to ${failedCount} users.`
                    );

                await interaction.update({
                    embeds: [successEmbed],
                    components: [],
                });
            } else if (arg2 === "no") {
                await interaction.update({
                    embeds: [],
                    components: [],
                    content: "Cancelling...",
                });

                setTimeout(() => interaction.message.delete(), 1000);
            }
        }
    }

    if (interaction.isModalSubmit() && arg1 === "DM") {
        const message = interaction.fields.getTextInputValue("message");

        const embed = new EmbedBuilder()
            .setTitle(`\`📨\` DM ${client.users.cache.size} users`)
            .setDescription(`Would you like to send this message ?`)
            .addFields({
                name: "Message",
                value: `\`\`\`${message}\`\`\``,
            });

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setLabel("Yes")
                .setCustomId("send-yes")
                .setEmoji("✅"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setLabel("No")
                .setCustomId("send-no")
                .setEmoji("❌")
        );

        await interaction.update({
            embeds: [embed],
            components: [buttons],
        });
    }
});
