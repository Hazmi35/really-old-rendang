const Discord = require('discord.js'),
      math = require('math-expression-evaluator');
exports.run = async (bot, message, args) => {
        const operation = args[0]
        const one = parseInt(args[1]);
        const two = parseInt(args[2]);
        
        if (!isNaN(operation)) {
            const embed = new Discord.RichEmbed()
        
            // Evaluate Expression
            let result;
            try {
                
                result = math.eval(args.join(' '));
                
            } catch (e) { // This will catch any errors in the expression
                
                result = 'Error: "Invalid Input"';
                
            }
                
            // Configure Embed
            embed.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
                .addField('Output', `\`\`\`js\n${result}\`\`\``);
                
            // Send Embed
            return message.channel.send(embed);
        }
        //if (isNaN(operation)) return message.reply("Invalid number.");
        if (["exponent"].includes(operation) && isNaN(two)) return message.reply("This operation requires a second parameter.");
        
        // Extract properties from math
        const { pow, sqrt, floor, ceil, sin, cos, tan } = Math;
        
        let ans;
        if (operation === "exponent") ans = pow(one, two);
        else if (operation === "sqrt") ans = sqrt(one, 2);
        else if (operation === "floor") ans = floor(one);
        else if (operation === "ceil") ans = ceil(one);
        else if (operation === "n-root") ans = pow(one, 1 / two);
        else if (operation === "sec") ans = 1 / cos(one * Math.PI / 180.0);
        else if (operation === "csc") ans = 1 / sin(one * Math.PI / 180.0);
        else if (operation === "cot") ans = 1 / tan(one * Math.PI / 180.0);
        else {
            const embed = new Discord.RichEmbed()
        
            // Evaluate Expression
            let result;
            try {
                
                result = math.eval(args.slice(1).join(' '));
                
            } catch (e) { // This will catch any errors in the expression
                
                result = 'Error: "Invalid Input"';
                
         }
         //if (isNan(one)) result = 'Error: "Input must be an integer"';
         //if (isNan(two) && (operation === "exponent" || operation === "n-root")) result = 'Error: "Input(s) must be integer(s)"';
                
            // Configure Embed
            embed.addField('Input', `\`\`\`js\n${args.slice(1).join(' ')}\`\`\``)
                .addField('Output', `\`\`\`js\n${result}\`\`\``);
                
            // Send Embed
            return message.channel.send(embed);
        }

        const mathEmbed = new Discord.RichEmbed()
        .addField('Input', `\`\`\`js\n${args.sjoin(' ')}\`\`\``)
        .addField('Output', `\`\`\`js\n${ans}\`\`\``);

        message.channel.send(mathEmbed)
        
    

}

exports.conf = {
    aliases: ["calc"],
    cooldown: "10"
}

exports.help = {
    name: "calculator",
    description: "math ",
    usage: "calculator [number]"
}
