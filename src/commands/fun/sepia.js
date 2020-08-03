const { Canvas, sepia } = require('canvas-constructor');
const { get } = require('node-superfetch');

async function Sepia (client, msg, args){
    let user = msg.mentions.users.first() || client.users.get(args[0]);
    if(!user) user = msg.author;
	try{
        const { body } = await get(user.displayAvatarURL.replace(/\.gif+/g, '.png'));
        let canvas = new Canvas(800, 800)
        .addImage(body, 0, 0, 800, 800);
        canvas = sepia(canvas)
        .toBuffer();
        return msg.channel.send({file:{attachment: canvas, name: 'sepia.png'}});
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: [],
	cooldown: 10
}

this.help = {
	name: 'sepia',
	description: 'convert your avatar or another user to sepia',
	usage: 'sepia'
}

this.run = Sepia;
