const { owners_id } = require('../../../src/config');
const { loadImage } = require('canvas');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
        if(user.bot)return msg.channel.send(`**${msg.author.username}**, Emang sejak kapan bot bisa nge gay?`);
	let rate = Math.floor(Math.random()*101);
	if(owners_id.includes(user.id)) rate = Math.floor(Math.random()*2);
	/* Canvas */
	const { body: plate } = await get('https://cdn.discordapp.com/attachments/447874901274132481/491724669246767114/rainbow.png');
	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava);
	const attachment = new Canvas(width, height)
	.addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	/* Canvas */
	return msg.channel.send({
		embed: {
			author: {
				name: user.username,
				icon_url: user.displayAvatarURL
			},
			title: 'Scanning...',
			thumbnail: {
				url: 'attachment://gay.png'
			},
			description: `${user.username} memiliki ${rate}% gay! :gay_pride_flag:`,
			color: 9384170,
			timestamp: new Date(),
			footer: {
				icon_url: user.displayAvatarURL
			},
			file: { attachment, name: 'gay.png'}
		}
	});
}

exports.conf = {
	aliases: ['gay'],
	cooldown: 5
}

exports.help = {
	name: 'gayrate',
	description: 'Ada temanmu \'gay\'? haha ayo liat berapa persen \'gay\' dia.',
	usage: 'gayrate <@mention | id>'
}
