const { RichEmbed } = require('discord.js');

async function skip (client, msg, args){
	try{
		const queue = client.queue.get(msg.guild.id);
		if(!queue) return msg.channel.send('Queue is empty nothing to skip');
		if(!msg.member.voiceChannel) return msg.channel.send('You must in voice channel');
		queue.connection.dispatcher.end();
		return msg.channel.send('⏩ Skipping current songs');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: [],
	cooldown: 1
}

this.help = {
	name: 'skip',
	description: 'skip current songs',
	usage: 'skip'
}

this.run = skip;
