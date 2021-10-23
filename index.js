const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '?';

const welcomeChannelID = "865328514533949520";
const rulesChannelID = "865328064158498838";
const supportChannelID = "865331109822726154";
const testingChannelID = "872217836372770837";
const adminChannelID = "865670678753443900";

const adminRole = "865325380034625586";
const moderatorRole = "865325952275054604";
const helperRole = "865326287593275423";
const memberRole = "865673628138078229";

const fanatixID = "399946430346690580";

let gameID;
let gameChannel;
// \ `

client.once('ready', async ()=>{
    /*let startMessage = await client.channels.cache.get(testingChannelID).send('funguje to zatim');
    startMessage.react('👍');*/
    console.log('it works');
    console.log(client.user.id);
});

client.on('message', async message =>{
    console.log(`${message.author}(${message.author.tag}): ${message.content}`);

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    /*if (message.member.roles.has(adminRole) || message.member.roles.has(moderatorRole) || message.member.roles.has(helperRole)){
        message.channel.send('<@message.author.id> Pouze členové Admin Teamu mohou používat příkazy!');
        return;
    }*/  
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`{COMMAND} ${message.author}(${message.author.tag}): ${message.content}`);
    
    if(command === 'test'){
        message.reply('vsechno funguje(snad)');
    } else if(command === 'ping'){
        message.reply('Pinging...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            resultMessage.edit(`Bot Ping: ${ping}, API Ping: ${client.ws.ping}`);
            console.log(`Bot Ping: ${ping}, API Ping: ${client.ws.ping}`);
        });
    } else if(command === '2048'){
        let gameEmbed = new Discord.MessageEmbed()
            .setColor(10181046)
            .setDescription('⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬜⬜⬜⬛\n⬛⬜⬜⬜⬜⬜⬜⬛\n⬛⬜⬜⬜⬜⬜⬜⬛\n⬛⬜⬜⬜⬜⬜⬜⬛\n⬛⬜⬜⬜⬜⬜⬜⬛\n⬛◀⬜⬜◀⬜⬜⬛\n⬛⬛⬛⬛⬛⬛⬛⬛')
        await message.channel.send(gameEmbed).then(sentEmbed => {
            sentEmbed.react('⬆️');
            sentEmbed.react('⬇️');
            sentEmbed.react('⬅️');
            sentEmbed.react('➡️');
        });
        console.log(gameEmbed.description);
        //await toGameID(gameEmbed.description)
        gameID = toGameID(gameEmbed.description);
        /*message.channel.send(gameEmbed).then(sentEmbed => {
            sentEmbed.react('⬆️');
            sentEmbed.react('⬇️');
            sentEmbed.react('⬅️');
            sentEmbed.react('➡️');
        });*/
        
        
        /*toGameID(gameEmbed.description, message.channel.id).then(
            message.channel.send(backToEmoji())
        );*/
    } else if(command === 'ip'){
        let IPEmbed = new Discord.MessageEmbed()
            .setColor(1752220)
            .setDescription('ms52.hicoria.cloud:35250')
        message.channel.send(IPEmbed);
    } else if(command === 'help'){
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle('Příkazy Azuremic Bota:')
            .setColor(1752220)
            .setDescription('**?test**: Otestuje jestli je bot ok\n **?2048**: Spustí hru 2048 !Ve Vývoji!\n**?ip**: Odešle IP serveru\n**?help**: Tato zpráva')
            .setFooter("Tým Azuremic", "https://i.imgur.com/m4hkkIj.png")
            .setTimestamp()
            message.channel.send(helpEmbed);
    } else if(command === 'pfp'){
        let uzivatel = message.mentions.users.first()
        if(!uzivatel){
            let pfpEmbed = new Discord.MessageEmbed()
                .setColor(1752220)
                .setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
            message.channel.send(pfpEmbed);
        } else {
            let pfpEmbed = new Discord.MessageEmbed()
                .setColor(1752220)
                .setImage(`https://cdn.discordapp.com/avatars/${uzivatel.id}/${uzivatel.avatar}.jpeg`)
            message.channel.send(pfpEmbed);
        }
    } else if(command === 'embed'){
        let title, url, authorName, authorImage, authorURL, description, thumbnail, image, footerText, footerImage;
        let fieldsName = [];
        let fieldsValue = [];
        let fieldsInline = [];
        message.author.send('Azuremic enhanced embed maker');
        message.author.send('Napiš nadpis:');
        title = message.content;
        let customEmbed = new Discord.MessageEmbed()
            .setColor(1752220)
            .setTitle(title)
            .setURL(url)
            .setAuthor(authorName, authorImage, authorURL)
            .setThumbnail(thumbnail)
            .setDescription(description)
            .addFields({})
            .setImage(image)
            .setFooter(footerText, footerImage)
        client.channels.cache.get(testingChannelID).send(customEmbed).then(
            client.channels.cache.get(testingChannelID).send('zatim to prcam :)'));
    } else if(command === 'invitelink'){
        let botID = client.user.id;
        client.channels.cache.get(adminChannelID).send(`<@${fanatixID}>`)
        .then(
            client.channels.cache.get(adminChannelID).send(`Command: 'invitelink' executed by: <@${message.author.id}> (${message.author.tag})`)
        )
        .then(
            client.channels.cache.get(adminChannelID).send(`https://discord.com/oauth2/authorize?client_id=${botID}&permissions=8&scope=bot`)
        );
    } else if(command === 'user'){
        let uzivatel = message.mentions.users.first()
        if(!uzivatel){
            uzivatel = message.author;
        }
        console.log(uzivatel);
        let userEmbed = new Discord.MessageEmbed()
            .setColor(1752220)
            .setAuthor(uzivatel.tag, `https://cdn.discordapp.com/avatars/${uzivatel.id}/${uzivatel.avatar}.jpeg`)
            .addFields(
                {name: 'Poslední zpráva', value: `**Obsah**: ${lastMessage(uzivatel, 'obsah')}\n **Vytvořeno**: ${lastMessage(uzivatel, 'time')}`, inline: true},
                {name: 'Typ', value: `**Bot**: ${uzivatel.bot}\n **System**: ${uzivatel.system}\n **Člověk**: ${isUser(uzivatel)}`, inline: true},
                {name: 'Přítomnost', value: `**Status**: ${uzivatel.presence.status}\n **Platforma**: ${platform(uzivatel)}`, inline: true},
                {name: 'Info', value: `**Jméno**: ${uzivatel.tag} (<@${uzivatel.id}>)\n **ID**: ${uzivatel.id}\n **Datum Vytvoření**: ${uzivatel.createdAt}`, inline: true}
            )
            .setTimestamp()
        message.channel.send(userEmbed);
    } else if(command === 'play'){
        let link = command.slice(5);
        if(message.member.voice.channelID){
            let connection = message.member.voice.channel.join();
        }
        //if(command.author)
    } else {
        message.react('❌');
        let unknownEmbed = new Discord.MessageEmbed()
            .setColor(1752220)
            .setDescription('🔻 Neznámý příkaz! Napiš ?help pro seznam příkazů 🔻')
        message.channel.send(unknownEmbed);
    }
});

function isUser(sender){
    if(!sender.bot && !sender.system){
        return true;
    } else {
        return false;
    }
}

function lastMessage(sender, typ){
    if(sender.lastMessage === null){
        return null;
    } else if(typ === 'obsah'){
        return sender.lastMessage.content;
    } else if(typ === 'time'){
        return sender.lastMessage.createdAt;
    }
}

function platform(sender){
    let statusArr = [];
    if(sender.presence.status === 'offline'){
        return 'Žádná (offline)';
    } else if(sender.presence.clientStatus.web){
        statusArr.push('Web');
    } else if (sender.presence.clientStatus.desktop){
        statusArr.push('Desktop');
    } else if (sender.presence.clientStatus.mobile){
        statusArr.push('Mobile');
    }
    console.log(statusArr.join(', '));
    return statusArr.join(', ');
}

function moved(){
}

function toGameID(gameEmbedDesc){
    let gameEmbedEnd = false;
    let gameEmbedArr = ['2048'];
    gameEmbedArr.length = 0;
    gameEmbedArr = gameEmbedDesc.split('');
    let currentChar = 0;
    let currentLine = 0;
    let gameID = ['2048'];
    gameID.length = 0;
    while(!gameEmbedEnd){
        console.log('!gameEmbedEnd');
            if(gameEmbedArr[currentChar] === '⬛'){
                gameID.push('1');
                currentChar = currentChar + 1;
            } else if(gameEmbedArr[currentChar] === '⬜'){
                gameID.push('2');
                currentChar = currentChar + 1;
            } else if(gameEmbedArr[currentChar] === '\n'){
                gameID.push('0');
                currentChar = currentChar + 1;
            } else if(gameEmbedArr[currentChar] === '◀'){
                gameID.push('3');
                currentChar = currentChar + 1;
            }
        if(currentChar === 71){
            gameEmbedEnd = true;
        }
    }
    return(gameID);
}

function gameProgress(gameID, direction, channel){
    console.log(gameID);
    let gameEmbedEnd = false;
    let currentlyChanging;
    let currentCharLoop = 0;
    let currentChar = 0;
    let changed = [];
    changed.length = 0;
    if(direction === 'up'){
        while(!gameEmbedEnd){
            if(gameID[currentChar] === '3'){
                currentlyChanging = currentChar;
                currentCharLoop = currentChar;
                console.log(`currentlyChanging: ${currentlyChanging}`);
                while(gameID[currentChar] != '1'){
                    currentChar = currentChar - 9;
                }
                currentChar = currentChar + 9;
                gameID[currentChar] = '3';
                changed.push(currentChar);
                gameID[currentlyChanging] = '2';
                currentChar = currentlyChanging;
                currentCharLoop = currentCharLoop + 1;
            } else {
                currentChar = currentChar + 1;
                currentCharLoop = currentCharLoop + 1;
            }
            if(currentCharLoop === 71){
                gameEmbedEnd = true;
            }
        }
    } else if(direction === 'down'){
        while(!gameEmbedEnd){
            if(gameID[currentChar] === '3'){
                currentlyChanging = currentChar;
                currentCharLoop = currentChar;
                console.log(`currentlyChanging: ${currentlyChanging}`);
                while(gameID[currentChar] != '1'){
                    currentChar = currentChar + 9;
                }
                if(moved()){
                    gameID[currentlyChanging] = '2';
                }
                currentChar = currentChar - 9;
                gameID[currentChar] = '3';
                changed.push(currentChar);
                gameID[currentlyChanging] = '2';
                currentChar = currentlyChanging;
                currentCharLoop = currentCharLoop + 1;
            } else {
                currentChar = currentChar + 1;
                currentCharLoop = currentCharLoop + 1;
            }
            if(currentCharLoop === 71){
                gameEmbedEnd = true;
            }
        }
    } else if(direction === 'left'){
        while(!gameEmbedEnd){
            if(gameID[currentChar] === '3'){
                currentlyChanging = currentChar;
                currentCharLoop = currentChar;
                console.log(`currentlyChanging: ${currentlyChanging}`);
                while(gameID[currentChar] != '1'){
                    currentChar = currentChar - 1;
                    console.log(currentChar);
                }
                currentChar = currentChar + 1;
                gameID[currentChar] = '3';
                changed.push(currentChar);
                gameID[currentlyChanging] = '2';
                currentChar = currentlyChanging;
                currentCharLoop = currentCharLoop + 1;
            } else {
                currentChar = currentChar + 1;
                currentCharLoop = currentCharLoop + 1;
            }
            if(currentCharLoop === 71){
                gameEmbedEnd = true;
            }
        }
    } else if(direction === 'right'){
        while(currentCharLoop < 72){
            if(gameID[currentChar] === '3'){
                currentlyChanging = currentChar;
                currentCharLoop = currentChar;
                console.log(`currentlyChanging: ${currentlyChanging}`);
                while(gameID[currentChar] != '1'){
                    console.log(currentChar);
                    currentChar = currentChar + 1;
                }
                currentChar = currentChar - 1;
                changed.push(currentChar);
                console.log(changed);
                console.log(`currentChar: ${currentChar}`);
                gameID[currentChar] = '3';
                for(let i = 0; i <= changed.length; ){
                    if(currentlyChanging === changed[i]){
                        i = i + 1;
                    } else {
                        gameID[currentlyChanging] = '2';
                        i = i + 1;
                    }
                }
                currentChar = currentlyChanging;
                currentCharLoop = currentCharLoop + 1;
            } else {
                currentChar = currentChar + 1;
                currentCharLoop = currentCharLoop + 1;
            }
            currentCharLoop++;
        }
    } else {
        client.channels.cache.get(channel).send(`Neznámý směr. Kontaktuj prosím <@${fanatixID}>`);
    }
    console.log(gameID);
    backToEmoji(gameID, channel);
}

function backToEmoji(gameID, channel){
    let gameEmbedEnd = false;
    let currentChar = 0;
    let gameEmojis = ['2048'];
    gameEmojis.length = 0;
    while(!gameEmbedEnd){
            if(gameID[currentChar] === '1'){
                gameEmojis.push('⬛');
                currentChar = currentChar + 1;
            } else if(gameID[currentChar] === '2'){
                gameEmojis.push('⬜');
                currentChar = currentChar + 1;
            } else if(gameID[currentChar] === '0'){
                gameEmojis.push('\n');
                currentChar = currentChar + 1;
            } else if(gameID[currentChar] === '3'){
                gameEmojis.push('◀');
                currentChar = currentChar + 1;
            }
            if(currentChar === 71){
                gameEmbedEnd = true;
            }
    }
    let gameEmbedDesc = gameEmojis.join("");
    gameEmbedDesc.replace(",", "");
    console.log(gameEmbedDesc);
    let gameEmbedNew = new Discord.MessageEmbed()
        .setColor(10181046)
        .setDescription(gameEmbedDesc)
    console.log(gameEmbedNew);
    client.channels.cache.get(channel).send(gameEmbedNew).then(sentEmbed => {
        sentEmbed.react('⬆️');
        sentEmbed.react('⬇️');
        sentEmbed.react('⬅️');
        sentEmbed.react('➡️');
    });
    
}

client.on('messageReactionAdd', async (reaction, user, message) => {
    if(user.bot) return;
    reactionChannel = reaction.message.channel.id;
    console.log(`channel: ${reaction.message.channel.name}`);
    console.log(`message reaction: ${reaction.emoji.name}`);
    if(reaction.emoji.name == '⬆️'){
        gameProgress(gameID, 'up', reactionChannel);
    } else if(reaction.emoji.name == '⬇️'){
        gameProgress(gameID, 'down', reactionChannel);
    } else if(reaction.emoji.name == '⬅️'){
        gameProgress(gameID, 'left', reactionChannel);
    } else if(reaction.emoji.name == '➡️'){
        gameProgress(gameID, 'right', reactionChannel);
    }
});



client.login('ODcyMjE2MTE1MTU2MjQ2NjE4.YQmojg.w5wggj0xF2zX6xU9JiA1k-ypXFQ');