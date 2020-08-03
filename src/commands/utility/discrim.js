const Discord = require('discord.js');
exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
        .setColor('RANDOM');
    
    if (isNaN(args[0]) || args[0] > 9999 || args[0] < 1) {
        
        embed.setFooter('Sorry, please enter a valid discrim.');
        
        return message.channel.send(embed);
        
    }
    
   let respond = '';
   
   client.users.map(function(user) {
       
       // The if statement will check if the input is equal to the user's discrim
       if (user.discriminator == args[0]) return respond += `${user.username}\n`;
       else return; // If not, return
       
   })
   
    // Add embed options
    embed.setTitle(`Username with Discrim: ${args[0]}`)
         .setDescription(respond);
        
    // Send Embed
    message.channel.send(embed);
  
}

exports.conf = {
    aliases: ["discriminator"],
    cooldown: "5"
}

exports.help = {
    name: "discrim",
    description: "Show some Discord username that has the discrim",
    usage: "discrim [User Discriminator]"
}
