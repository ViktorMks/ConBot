require('dotenv').config()

let quoteUrl = "https://quotes.rest/qod/categories?language=en&detailed=false"
const words = [ "fuck",
"shit",
"dumbass",
"asshole",
"dick",
"cock",
"pussy",
"motherfucker",
"bullshit",
"dogshit"]

const Discord = require('discord.js')
const { findprofanity } = require('./profanity.json')
const client = new Discord.Client({
    partials: ['MESSAGE']
});

client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
    console.log('Ready');
})

function findUserByName(mention) {
    if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
}
}

client.on('message', msg => {
    const profane = !!words.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i'); // if the phrase is not alphanumerical,
        return regex.test(msg.content);             // you may need to escape tokens
      });

    if(profane) {
        msg.channel.send('Stop cursing')
    }
    else if(msg.content.includes("sad") || msg.content.includes("depressed")) {
        msg.react("❤")
        msg.reply('We are here for you 🎂. We will help you')
        msg.channel.send(`${msg.author}, you can be with us. If it does not help you can 
        visit a \`psyhologist\` or aks for \**help\** your \`parents\``)
    }
    else if(msg.content.includes("!inactive")) {
        const args = msg.content.slice(9, msg.content.length);
        msg.guild.owner.createDM(true)
        .then((channel) => {
            channel.send(`${msg.author.username} will be inactive`)
            channel.send(`${msg.author.username} said: "${args}"`)
        }).catch(err => {
            msg.channel.send(`Unable to message ${msg.guild.owner.displayName}`)
        });
    }
    else if(msg.content.includes("!poll")) {
        const args = msg.content.slice(5, msg.content.length);
        msg.channel.startTyping(2000)
        const reply = msg.channel.send({
            embed: {
                color: 'yellow',
                title: '📊 New Poll 📊',
                description: `${args}`
            }
        }).then((mes) => {
           mes.react('👍')
           mes.react('👎')
           msg.channel.stopTyping(true)
        })
    }
    else if(msg.content.includes("!meeting")) {
        const args = msg.content.slice(9, msg.content.length);
        const roles = msg.mentions.roles.last();
        msg.guild.roles.everyone.members.map(mem => {
            mem.createDM(true).then((channel) => {
                channel.send(`${msg.author} created meeting!`)
                channel.send(`Here are the meeting informations:`)
                channel.send(`${args}`)
            })
        })
    }
    else if(msg.content.includes("!add")) {
        const args = msg.content.trim().split(/ +/g);
        const user = findUserByName(args[2])
        const member = msg.mentions.members.first()

        const role = msg.guild.roles.cache.find(role => role.name === args[1])

        member.roles.add(role.id).then((val) => {
            msg.channel.send(`${user.tag} is now ${args[1]}`)
        }).catch((err) => {
            msg.reply('You have not access to role managing')
        })

       
    }
    else if(msg.content.includes("!remove")) {
        const args = msg.content.trim().split(/ +/g);
        const user = findUserByName(args[2])
        const member = msg.mentions.members.first()

        const role = msg.guild.roles.cache.find(role => role.name === args[1])

        member.roles.remove(role.id).then((val) => {
            msg.channel.send(`${user.tag} is not ${args[1]} anymore!`);
        }).catch(err => {
            msg.reply('You have not access to remove roles')
        })

    }
   
})

client.on('messageDelete', msg => {
    msg.channel.send('stop deleting messages!!!')
})

client.on('guildMemberAdd', member => {
    member.send(`Hello There. Welcome`)
    member.send('Now go to the roles channel and run \**!add padawan\**')
    member.send('With this you will have the ability to write in all public channels')
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name = "launch")
    welcomeChannel.send(`${member.displayName} joined, say hi`)
    welcomeChannel.send(`Give him role`)
})
