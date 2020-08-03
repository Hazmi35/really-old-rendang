const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  var botmessage = args.join(" ");
  if (!botmessage) {
    message.channel.send(":x: Usage : r!say <message>")
    return;
  }
  message.delete();
  message.channel.send(botmessage);

}
exports.conf = {
  aliases: ['s']
}

exports.help = {
  name: 'say',
  description: 'Makes Bot Say Something',
  usage: 'say [message]'
};
