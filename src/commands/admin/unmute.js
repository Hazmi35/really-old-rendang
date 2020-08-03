exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Maaf kamu tidak bisa menggunakan perintah ini!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Maaf aku tidak mempunyai permission \`MANAGE_ROLES\` untuk melakukannya!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Maaf aku tidak bisa mencari member yang kamu maksud!`).then(msg=>msg.delete(5000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, dia belum ter-mute coba mute dia terlebih dahulu :)`).then(msg=>msg.delete(5000));
    await (member.removeRole(muterole.id));
    message.channel.send(`<@${member.id}> selamat kamu sudah ter-unmute.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute someone",
    usage: "unmute @mention"
}
