class TestEmbed {
	static run (client, msg, args){
		if(!args.length) return msg.channel.send(this.help.usage, { code: 'unu' });
		try {
			args = JSON.parse(args.join(' '));
			return msg.channel.send({embed: args});
		}catch(e){
			return msg.channel.send(e.message, {code: 'bk' });
		}
	}
	static get conf(){
		return {
			aliases: ['tmb'],
			cooldown: 1
		}
	}
	static get help(){
		return {
			name: 'testembed',
			description: 'Parse Json and represent in to embed',
			usage: 'testembed <JSON>'
		}
	}
}

module.exports = TestEmbed;
