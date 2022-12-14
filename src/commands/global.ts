import type { CommandInteraction } from "discord.js";
import {
  Discord,
  Slash,
} from "discordx";

@Discord()
export class GlobalCommands {
  @Slash({ name: "ping", description: "Pings the bot." })
  ping(interaction: CommandInteraction): void {
    interaction.reply(`Pong! 🏓 | ${Math.abs(Date.now() - interaction.createdTimestamp)}ms.`);
  }
}
