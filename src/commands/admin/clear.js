exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author.username}**, Maaf kamu tidak bisa menggunakan perintah ini!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author.username}**, Maaf aku tidak mempunyai permission \`MANAGE_MESSAGES\` untuk melakukannya!`).then(msg=>msg.delete(5000));

    if (args[0] > 100) return message.channel.send(`**${message.author.username}**, Kamu hanya bisa menghapus pesan hingga **100** pesan`)
    let count = parseInt(args[0]) || 1;
    await message.delete();

    message.channel.fetchMessages({ limit: Math.min(count, 100) })
    .then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send(`Sukses meghapus pesan. Total pesan terhapus ${count}`).then(msg=>msg.delete(5000));
    }).catch(err => {
        console.log(err);
    });
}

exports.conf = {
    aliases: ['purge'],
    cooldown: "5"
}

exports.help = {
    name: "clear",
    description: "Menghapus pesan yang tidak kamu inginkan",
    usage: "clear 10"
}
