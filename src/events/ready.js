module.exports = client => {
  console.log(`${client.user.username} Ready to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  function randStatus() {
    let status = [`with ${client.users.size} users`, `on Saucecade`];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' });
  };
setInterval(randStatus, 60000);
  console.log(`${client.user.username} sukses online!`);
  
  /*hourly cat present :v - youKnowOwO*/ /*ok then - Hazmi35*/
  client.setInterval(() => {
  	for(const guild of client.guilds.array()){
	  	const channel = guild.channels.filter(x => x.name === 'bot-spam').first();
	  	if(!channel) continue;
		client.commands.get('cat').getCat(channel, 'Hourly Cat present');
  	}
  }, 3.6e+6);
}
