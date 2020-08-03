// Calling package 
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch');

// run cmd handler
exports.run = async (client, message, args) => {

// nih codenya, fahami sendiri ;-;
let user;
    if (message.mentions.users.size) { user = message.mentions.users.first(); }
    else if (args[0]) { user = await message.guild.fetchMember(args[0]);
      if (user) { user = user.user; } }
    if (!user) { user = message.author; }
    const m = await message.channel.send('Please Wait...');
    message.channel.startTyping();
    const image = await getBeautiful(client, user.avatarURL);
    message.channel.send({files: [{attachment: image, name: 'beautiful.png'}]}).then(()=>{ m.delete(); message.channel.stopTyping() });
};

async function getBeautiful(client, avatar){
	const base = await get('https://raw.githubusercontent.com/Soumil07/York-Dev/master/assets/images/plate_beautiful.png');
	const toMeme = avatar.replace(/\.gif.+/g, '.png');
	const { body } = await get(toMeme);
	return new Canvas(634, 675)
    .setColor(client.color)
    .addRect(0, 0, 634, 675)
    .addImage(body, 423, 45, 168, 168)
    .addImage(body, 426, 382, 168, 168)
    .addImage(base.body, 0, 0, 634, 675)
    .toBuffer();

}

exports.conf = {
    aliases: ['wow'],
    cooldown: "10"
}

exports.help = {
    name: "beautiful",
    description: "Menggambar avatar orang/kamu di atas poster yang indah",
    usage: "beautiful [@user]"
}
