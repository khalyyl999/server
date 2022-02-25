const qs = require("querystring")
const Discord = require("discord.js")
const client = new Discord.Client()
const dig = require('gamedig')
const config = require('./config.js')

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});


// const hook = new Discord.WebhookClient('')
client.login(config.token)
client.on('ready', () => console.log('Logged In 123 ;)'))
client.on('error', () => console.log('error pray it didnt break'))

let interval
let channel
let sent = new Array()

let getInfo = (ip, port) => {
    return dig.query({
        type: 'mtasa',
        host: ip,
        port: port,
        socketTimeout: 5000,
        udpTimeout: 10000
    })
}
//let servers = ['payload.gaminginstitute.in', 'funmode.gaminginstitute.in', 'jump.gaminginstitute.in', 'payload.gaminginstitute.in:27016', 'funmode.gaminginstitute.in']
let servers = config.servers

let createEmbed = (info, sv, online) => {
    if (!online) {
        info = {
            name: 'Server is offline, or changing map',
            map: '-',
            pl: '0',
            maxpl: '0'
        }
    }
    return new Discord.MessageEmbed()
    .setTitle(`**${info.name}**`)
    .setColor((online ? 0x37963F : 0x933836))
    .addField('❯ IP::inbox_tray:', `mtasa://${sv[0]}:${sv[1]}`, true)
    .setFooter(client.user.username,client.user.avatarURL)
    .setThumbnail('https://cdn.discordapp.com/attachments/766352613524111450/854168312007098408/OM-TD.png')
    .setTimestamp()
    .addFields(
        { name: '❯ GameMod: :game_die:', value: `${info.map}`},
        { name: '❯ Players: :busts_in_silhouette:', value: `${info.pl}/${info.maxpl}`, inline: true }
    )

}



client.on('message', (message) => {
    if(message.content.startsWith('info')){
        sent = new Array()
        channel = message.channel
        for(let sv of servers){
            // GET INITIAL DATA TO SEND MESSAGES, 
            // THEN AFTER SENDING TRIGGER THE EDIT LOOP
            let promise = getInfo(sv[0], sv[1])
            promise.then(x => {
                let info = {
                    name: x.name,
                    map: x.map,
                    pl: x.raw.numplayers,
                    maxpl: x.maxplayers
                }

                embed = createEmbed(info, sv, true)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                
                // msg.catch(e => console.log(e, 'ERROR SENDING EMBED-----------'))
               
            }).catch(e => {
                embed = createEmbed([], sv, false)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                console.error("120:" + e + ' @ ' + sv)
            })
            
       }
    }
})
client.on('message', (message) => {
    if(message.content===('INFO')){
        sent = new Array()
        channel = message.channel
        for(let sv of servers){
            // GET INITIAL DATA TO SEND MESSAGES, 
            // THEN AFTER SENDING TRIGGER THE EDIT LOOP
            let promise = getInfo(sv[0], sv[1])
            promise.then(x => {
                let info = {
                    name: x.name,
                    map: x.map,
                    pl: x.raw.numplayers,
                    maxpl: x.maxplayers
                }

                embed = createEmbed(info, sv, true)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                
                // msg.catch(e => console.log(e, 'ERROR SENDING EMBED-----------'))
               
            }).catch(e => {
                embed = createEmbed([], sv, false)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                console.error("120:" + e + ' @ ' + sv)
            })
            
       }
    }
})
client.on('message', (message) => {
    if(message.content===('Info')){
        sent = new Array()
        channel = message.channel
        for(let sv of servers){
            // GET INITIAL DATA TO SEND MESSAGES, 
            // THEN AFTER SENDING TRIGGER THE EDIT LOOP
            let promise = getInfo(sv[0], sv[1])
            promise.then(x => {
                let info = {
                    name: x.name,
                    map: x.map,
                    pl: x.raw.numplayers,
                    maxpl: x.maxplayers
                }

                embed = createEmbed(info, sv, true)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                
                // msg.catch(e => console.log(e, 'ERROR SENDING EMBED-----------'))
               
            }).catch(e => {
                embed = createEmbed([], sv, false)
                // msgs.add(await message.channel.send({embed}))
                message.channel.send({ embed }).then(c => {
                    sent.push(c)
                })
                console.error("120:" + e + ' @ ' + sv)
            })
            
       }
    }
})