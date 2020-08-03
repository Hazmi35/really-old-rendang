exports.conf = {
    aliases: ['randomeme'],
    cooldown: '5'
}
exports.help = {
    name: "meme",
    description: "Give you a random meme from the internet.",
    usage: 'meme'
}
exports.run = async (client, message, args) => {
const Discord = require("discord.js"),
      meme = require('memejs');

exports.run = async (client, message, args) => {
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  .setFooter(`Meme by ${data.author[0]}`)
  message.channel.send({embed});
  })};
}
