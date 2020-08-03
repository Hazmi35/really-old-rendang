const Discord = require("discord.js");
const path = require("path");
const SQL = require('sqlite3').verbose();

exports.run = async (client, message, args, color) => {
    const database = new SQL.Database(path.join(__dirname, '..', '..', 'databases', 'f-total.db'));
    var db = await database;

    db.run("CREATE TABLE IF NOT EXISTS main (total INTEGER)");
    db.get(`SELECT * FROM main`, async function (err, rows) {
        if (err) {
            if (err.message === "SQLITE_ERROR: no such table: main") return undefined;
            console.error(err.message)
        }
        try {
            var fTotal = rows.total + 1;
            db.run(`UPDATE main SET total = '${fTotal}'`)
        } catch (e) {
            if (e.message === "Cannot read property 'total' of undefined") {
                db.run("INSERT INTO main (total) VALUES (?)", [0]);
                fTotal = 0
            } else {
                console.error(e)
            }
        }
        var embed = new Discord.RichEmbed()
            .setAuthor("Press f to pay respect", message.author.displayAvatarURL)
            .setDescription(`${message.author.tag} Has paid their respects!`)
            .setFooter(fTotal + " Respects")
            .setColor(color)
        message.channel.send(embed)
    });

}

exports.conf = {
  aliases: [],
  cooldowns: '3'
}

exports.help = {
  name: "f",
  description: "press f to pay respect",
  usage: "f"
}
