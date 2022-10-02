import { Discord, Guild, ModalComponent, Slash, SlashOption } from "discordx";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  CommandInteraction, EmbedBuilder,
  ModalBuilder, ModalSubmitInteraction, Role,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

@Discord()
@Guild((client) => client.guilds.cache.map((guild) => guild.id))
export class GuildCommands {
  @Slash({ name: "createlobby", description: "Creates a lobby." })
  async createLobby(
    @SlashOption({
      name: "lobbyname",
      description: "Name of Lobby",
      required: true,
      type: ApplicationCommandOptionType.String
    })
      name: string,
    @SlashOption({
      name: "slot",
      description: "Number of slots",
      required: true,
      type: ApplicationCommandOptionType.Number,
      minValue: 1
    })
      slot: number,
    @SlashOption({
      name: "roletag",
      description: "Roles to tag",
      required: false,
      type: ApplicationCommandOptionType.Role
    })
      roletag: Role,
    interaction: CommandInteraction
  ): Promise<void> {
    let roleStr: Role | undefined

    if (roletag) {
      roleStr = interaction.guild!.roles.cache.find(role => role.id === roletag.id);
    }

    const lobbyDescModal = new ModalBuilder()
      .setCustomId("LobbyDescForm")
      .setTitle("Create Lobby Description");

    const descInputComponent = new TextInputBuilder()
      .setCustomId("descField")
      .setLabel("Lobby Description")
      .setStyle(TextInputStyle.Paragraph);

    lobbyDescModal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(descInputComponent));

    await interaction.showModal(lobbyDescModal);

    const submitted = await interaction.awaitModalSubmit({
      time: 60000,
      filter: i => i.user.id === interaction.user.id,
    }).catch(e => {
      console.log(e);
      return null;
    })

    if (submitted) {
      const desc = submitted.fields.getTextInputValue("descField");
      const embed = new EmbedBuilder()
        .setTitle(name)
        .setDescription(desc)
        .addFields(
          { name: "Slot", value: String(slot) }
        );
      await submitted.reply({ content: `${roleStr || ""}`, embeds: [embed] });
    }
  }

  @ModalComponent()
  LobbyDescForm(interaction: ModalSubmitInteraction): void {
  }
}