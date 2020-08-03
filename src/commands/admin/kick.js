const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")){ 
    let embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("Maaf, Kamu Tidak Mempunyai Permissions Untuk Kick Members");
return message.channel.send(embed);
  }
  if (!message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${message.author.tag}** Maaf, Rendang Tidak Mempunyai Permissions \`KICK_MEMBERS\` Tolong Beri Permissions \`KICK_MEMBERS\` Terlebih Dahulu.`).then(msg=>msg.delete(5000))
  
  let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toKick) return message.channel.sendMessage("Tidak Dapat Menemukan User ! Mohon Mention Terlebih Dahulu !");
  let reason = args.join(" ").slice(22);
  if (toKick.hasPermission("KICK_MEMBERS")) return message.channel.send("Hmm Dia Tidak Dapat Dikick :(").then(msg => msg.delete(3000));
  
  if (toKick.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toKick).kick(reason);
   try {
    if (!reason) {
      toKick.send(`**${toKick.user.tag}** Kamu Sudah Dikick Dari**${message.guild.name}**`)
    } else {
      toKick.send(`**${toKick.user.tag}** Kamu Sudah Dikick Dari **${message.guild.name}**
Alasan: "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor('RANDOM')
    .setTitle('User Sudah Dikick Dari Server')
    .addField('username', toKick.user.username, true)
    .addField('ID', toKick.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
   message.channel.send(`Saya Tidak Bisa Kick **${toKick.user.tag}** Karena Rolenya Lebih Tinggi Dari Saya Atau Rolenya Sama Dengan Saya.`)
  }
}
 
exports.conf = {
  aliases: ['kick'],
  cooldown: '5'
}

exports.help = {
  name: "kick",
  description: 'Kick Seseorang Dari Servermu [ADMIN ONLY]',
  usage: 'Kick [@mention someone]'
}
