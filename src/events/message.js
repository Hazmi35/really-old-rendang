const PREFIX = require('../config.json').bot_prefix;

module.exports = async (client, message) => {
    if (message.author.bot || !message.guild) return;

    let prefix = PREFIX.toLowerCase();
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix)) {
        try {
        require('../handle/command')(client, message);
        } catch(e) {
            console.error(e);
        }
    } 
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
        message.channel.send(`:wave: | Hai ${message.author}, prefix ku di server ini adalah \`${prefix}\``);
    }
}
