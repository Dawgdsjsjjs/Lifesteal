require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Get rank from roles
function getTag(member) {
    if (!member) return "PLAYER";

    if (member.roles.cache.some(r => r.name === "OWNER")) return "OWNER";
    if (member.roles.cache.some(r => r.name === "ADMIN")) return "ADMIN";
    if (member.roles.cache.some(r => r.name === "MOD")) return "MOD";

    return "PLAYER";
}

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    const tag = getTag(message.member);

    const formatted = `[${tag}] ${message.author.username}: ${message.content}`;

    // Delete original message (optional)
    await message.delete().catch(() => {});

    // Send formatted message
    message.channel.send(formatted);
});

client.login(process.env.TOKEN);
