const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'pause',
    description:('Pause the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`<a:Wrong:1017416697168269372:> No music currently playing <${inter.member}>... try again ?`) });

        if (queue.node.isPaused()) return inter.editReply({ content: await Translate(`<a:Wrong:1017416697168269372:> The track is currently paused, <${inter.member}>... try again ?`) });

        const success = queue.node.setPaused(true);
        const pauseEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? await Translate(`Current music <${queue.currentTrack.title}> paused <a:Yes:1011614293420150805:>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <a:Wrong:1017416697168269372:>`) })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [pauseEmbed] });
    }
}
