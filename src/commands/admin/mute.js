exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Maaf kamu tidak bisa menggunakan perintah ini!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Maaf aku tidak mempunyai permission \`MANAGE_ROLES\` untuk melakukannya!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Maaf aku tidak bisa mencari member yang kamu maksud!`).then(msg=>msg.delete(5000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'Muted',
                color: '#000000',
                permission: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                });
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    if (member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, dia sudah ter-mute kasian jika me-mute dia 2 kali.`).then(msg=>msg.delete(5000));
    await (member.addRole(muterole.id));
    message.channel.send(`**${message.author.username}**, kamu me-mute <@${member.id}>.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "mute",
    description: "Mute seseorang yang kamu sukai",
    usage: "mute @mention"
}
