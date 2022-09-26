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

  @Slash({ name: "hello", description: "Greets the bot." })
  hello(interaction: CommandInteraction): void {
    interaction.reply(`Hi ${interaction.member}! Let's have some fun together! 😄`);
  }
}