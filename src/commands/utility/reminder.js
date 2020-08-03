
exports.run = async (client, message, args, color) => { // eslint-disable-line no-unused-vars
	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.reply('Tidak dapat mengingatkan Anda jika saya tidak tahu kapan harus melakukannya...');
	if (!reminder) return message.reply('Anda lupa pengingat/pesannya');

	// Ini tidak akan berfungsi jika bot di-restart atau dihentikan

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Detik 
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Menit
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Jam
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Hari
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply('Waktu harus dalam format \`<number>[s/m/h/d]\`');
	}

	message.reply(`Aku akan mengingatkanmu dalam \`${time}\` tentang \`${reminder}\``);

	setTimeout(function () {
		message.author.send(`Anda bertanya kepada saya \`${time}\` lalu untuk mengingatkan Anda tentang \`${reminder}\``);
	}, parseInt(timems));

};

exports.conf = {
  aliases: ['remindme'], 
  cooldown: '5'
} 
exports.help = {
  name: 'reminder', 
  description: 'Untuk ketika Anda perlu mengingat sesuatu, ingat kalo botnya restart atau off, Ini gk akan bekerja, Usahakan waktunya minimal beberapa jam saja', 
  usage: 'reminder <number>[s/m/h/d]'  
} 
