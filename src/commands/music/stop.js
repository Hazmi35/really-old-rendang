const { RichEmbed } = require('discord.js');

async function stop (client, msg, args){
	try{
		const queue = client.queue.get(msg.guild.id);
		if(!queue) return msg.channel.send('cannot stop because the queue is empty');
		if(!msg.member.voiceChannel) return msg.channel.send('must in voice channel to stop the queue');
		queue.songs = [];
		queue.connection.dispatcher.end();
		return msg.channel.send('🛑 Stoping current queue');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: [],
	cooldown: 1
}

this.help = {
	name: 'stop',
	description: 'stop current queue',
	usage: 'stop'
}

this.run = stop;
