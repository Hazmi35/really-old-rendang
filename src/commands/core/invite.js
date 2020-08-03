const { RichEmbed: SharifEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

let embed = new SharifEmbed()
      .setColor("RANDOM")
      .setAuthor("Ingin Menginvite Rendang Ke Server Mu?")
      .setDescription("**[Klik Disini](https://discordapp.com/oauth2/authorize?client_id=485054998632464384&scope=bot&permissions=112327680)**")
      .setFooter(`Requested By : ${message.author.username}`);
      
     message.channel.send(embed);
     
}

exports.conf = {
  aliases: ['invite'],
  cooldown: '5'

}

exports.help = {
  name: "invite",
  description: 'Untuk Menginvite Rendang Ke Server Mu',
  usage: 'invite'

}
