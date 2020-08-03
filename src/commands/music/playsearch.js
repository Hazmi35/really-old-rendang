const { RichEmbed } = require('discord.js');
const { GOOGLE_API_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);

async function playSearch (client, msg, args){
	if(!args.length) return msg.channel.send(exports.help.usage, { code: 'asalWehCodemah' });
	try{
		const videos = await youtube.searchVideos(args.join(' '), 10);
		if(!videos.length) return msg.channel.send('🚫 | No result found');
		const embed = new RichEmbed()
		.setColor('RED')
		.setDescription(videos.map((x,i) => `\`${i+1}\`. ${x.title}`).join('\n'))
		.setFooter('ℹ️ To select song please provide value 1-10');
		const thisMess = await msg.channel.send(embed);
		const filter = msgs =>  !isNaN(msgs.content) && msgs.author.id === msg.author.id;
		const responses = await msg.channel.awaitMessages(filter, { max: 1, time: 15000});
		if(!responses.size) return thisMess.delete();
		const choice = parseInt(responses.first().content, 10);
		const arg = [`https://www.youtube.com/watch?v=${videos[choice-1].id}`];
		await thisMess.delete();
		return client.commands.get('play').run(client, msg, arg);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: ['ps'],
	cooldown: 10
}

this.help = {
	name: 'playsearch',
	description: 'search youtube video and play it',
	usage: 'playsearch <query>'
}

this.run = playSearch;
