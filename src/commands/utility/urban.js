const urban = require('relevant-urban');
const Discord = require('discord.js');

exports.run = async (client, message, args, color) => {

	
	if(!args[0]) return message.channel.send(`**Mohon masukkan beberapa teks**`);
	
  let postMsg = await message.channel.send('**Mohon tunggu sebentar...**');
  
	let res = await urban(args.join(' ')).catch(e => {
		
		return message.channel.send('**Maaf, kata itu tidak ditemukan!**');
	});

	const embed = new Discord.RichEmbed()
	    .setColor(color)
	    .setTitle(res.word)
	    .setURL(res.urbanURL)
	    .setDescription(`**Definisi:**\n*${res.definition}*\n\n**Contoh:**\n*${res.example}*`)
	    .addField('Penulis', res.author,true)
	    .addField('Rating', `**\`👍🏻 Upvotes: ${res.thumbsUp} | 👎🏻 Downvotes: ${res.thumbsDown}\`**`)
	    
	   if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
   		embed.addField('Tags', res.tags.join(', '), true) 
   		
   	};
  message.channel.send(embed).then(() => { postMsg.delete(); })
   	
   	
}

exports.conf = {
 aliases: ['relevant-urban'],
 cooldown: '5'
} 

exports.help = {
 name: 'urban', 
 description: 'Singkatan Internet untuk "harus pergi". Juga dapat berarti "baik untuk pergi" tergantung pada konteksnya', 
 usage: 'urban <Test/Message>' 
} 
