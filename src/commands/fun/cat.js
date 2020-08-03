const { RichEmbed } = require('discord.js');
const randomMeow = require('random-meow');

function showCat (client, msg, args){
	try{
		return exports.getCat(msg.channel);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

exports.getCat = async (channel, extend = '') => {
	const url = await randomMeow()
	const ctx = new RichEmbed();
	ctx.setTitle('🐈 Cat');
	ctx.setURL(url);
	ctx.setImage(url);
	return channel.send(extend, {embed: ctx});
}

this.conf = {
	aliases: ['🐈'],
	cooldown: 10
}

this.help = {
	name: 'cat',
	description: 'Show random ~~Neko~~ Cat 😸',
	usage: 'cat'
}

this.run = showCat;
