const { RichEmbed } = require('discord.js');
const { exec } = require('child_process');
const { owners_id } = require("../../config.json");

async function execute (client, msg, args){
	if(!owners_id.includes(msg.author.id)) return undefined;
	try{
		if(!args.length) return msg.channel.send(this.help.usage, { code: 'ini' });
		exec(args.join(' '), (error, output) => {
			if(!error) return msg.channel.send(output, { code: 'diff' });
			return msg.channel.send(error, { code: 'ini' });
		});
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: ['exec', '💲'],
	cooldown: 10
}

this.help = {
	name: '$',
	description: 'execute bash code',
	usage: '$ <command>'
}

this.run = execute;
