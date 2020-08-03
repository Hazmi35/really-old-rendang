const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (args.length < 1) {
    message.channel.send('Kamu harus memasukkan text yang ingin di jadikan emoji atau di perbesar!');
}

message.channel.send(
    args.join(' ')
        .split('')
        .map(c => mapping[c] || c)
        .join('')
);
};

exports.conf = {
  aliases: ['emoji'],
  cooldown: '5'
  
}

exports.help = {
  name: "emojify",
  description: "Membuat Text Menjadi Emoji",
  usage: "emojify [text]"
  
}
