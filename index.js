const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
var https = require("https");
const Keyv = require('keyv');
const keyv = new Keyv();

const ytdl = require("ytdl-core");
var search = require('youtube-search');
const queue = new Map();
var fs = require('fs');

client.once('ready', () => {
    console.log('Ready!');
});

async function getUserSong(id) {

    var result = await keyv.get(id);











    return result;

}

let disabled = false;
client.on('voiceStateUpdate', async(oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel


    if (disabled == false) {
        // Ryan
        if (newMember == '230469569817477120') {
            const channel = client.channels.cache.get("509460560610459653");
            const song = await getUserSong('230469569817477120');
            const info = { table: [] };
            info.table.push({ id: 230469569817477120, song: song });
            fs.writeFile("./intros.json", JSON.stringify(info), (err) => {
                if (err) console.error(err)
            });
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {





                console.log(song + " test ");
                const stream = ytdl('#', { filter: 'audioonly' });
                const dispatcher = connection.play(stream, {
                    volume: 1,
                });
                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Ryan'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
        // Cammy
        if (newMember == '459451342008877066') {
            const channel = client.channels.cache.get("509460560610459653");

            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {

                const stream = ytdl('#', { filter: 'audioonly' });
                const dispatcher = connection.play(stream, {
                    volume: 0.05,
                });
                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - cammy'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
        //Aiden
        if (newMember == '572530316162367498') {
            const channel = client.channels.cache.get("509460560610459653");
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {

                const stream = ytdl('#', { filter: 'audioonly' });
                const dispatcher = connection.play(stream, {
                    volume: 1,
                });

                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Aiden'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
        //alex
        if (newMember == '407631374481096714') {
            const channel = client.channels.cache.get("509460560610459653");
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {

                const stream = ytdl('#', { filter: 'audioonly' });
                const dispatcher = connection.play(stream, {
                    volume: 0.75,
                });

                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Alex'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
        //Will
        if (newMember == '703701359446458469') {

            const channel = client.channels.cache.get("509460560610459653");
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {


                const dispatcher = connection.play('../sounds/test.mp3', {
                    volume: 0.55,
                });

                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Alex'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }

        if (newMember == '704794388500316180') {

            const channel = client.channels.cache.get("509460560610459653");
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {
                const stream = ytdl('#', { filter: 'audioonly' });

                const dispatcher = connection.play(stream, {
                    volume: 0.55,
                });

                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Alex'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
        if (newMember == '703644422029574244') {

            const channel = client.channels.cache.get("509460560610459653");
            if (!channel) return console.error("The channel does not exist!");
            channel.join().then(connection => {
                const stream = ytdl('#', { filter: 'audioonly' });

                const dispatcher = connection.play(stream, {
                    volume: 0.55,
                });

                dispatcher.on('finish', () => {

                    channel.leave();
                    console.log(chalk.cyan('Finished playing! - Alex'));

                });

            }).catch(e => {

                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });


        }
    }



});



client.on('message', async message => {
    if (message.channel.type === "dm") console.log(chalk.cyan(`[${message.author.username}] ${message.content}`));
    if ((message.channel.type === "dm" && message.content.startsWith("!enable"))) {
        disabled = false;
        message.channel.send("Intro's are enabled.");
    }

    if (message.content.startsWith("!disable")) {
        disabled = true;
        message.channel.send("Intro's are disabled.");
        console.log(disabled);
    }


    if (message.content.startsWith('!intro')) {
        const args = message.content.split(" ");
        await keyv.set(message.member.id, (message.content.substr("!intro ".length)));
        console.log(message.member.id);
        console.log(await keyv.get(message.member.id));
    }

    if (message.content.startsWith("!weather")) {
        const args = message.content.split(" ");
        const url = 'https://samples.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=INSERTID';
        let x = 0.0;

        https.get(url, function(res) {
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var fbResponse = JSON.parse(body);
                x = fbResponse.main.temp;
                console.log(fbResponse);
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });

        // const x = json.weather.temp;
        const temp = x - 273.15;
        message.channel.send({
            embed: {
                color: 3447003,
                title: "Weather",
                description: "Weather in " + args[1] + "is : " + temp
            }
        });



    }


    if (message.content.startsWith("!delete")) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('sounds/kek.mp3', {
                volume: 1,
            });

            dispatcher.on('finish', () => {

                message.member.voice.channel.leave();
                console.log('Finished playing!');

            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

    if (message.content.startsWith("clear")) {
        message.channel.send("(∩｀-´)⊃━☆ﾟ.*･｡ﾟ ----- Deleted 10 messages.");
        message.channel.bulkDelete(10);
    }

    if (!message.guild) return;



    if (message.content === 'boom') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('sounds/boom.mp3', {
                volume: 1,
            });

            dispatcher.on('finish', () => {

                message.member.voice.channel.leave();
                console.log('Finished playing!');

            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

    if (message.content === 'tyler') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('#', { filter: 'audioonly' });
            const dispatcher = connection.play(stream, {
                volume: 1,
            });

            dispatcher.on('finish', () => {

                message.member.voice.channel.leave();
                console.log('Finished playing!');

            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
    if (message.content === 'tyler1') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const stream = ytdl('#', { filter: 'audioonly' });
            const dispatcher = connection.play(stream, {
                volume: 1,
            });

            dispatcher.on('finish', () => {

                message.member.voice.channel.leave();
                console.log('Finished playing!');

            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`!play`)) {

        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(`!skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(`!stop`)) {
        stop(message, serverQueue);
        return;
    } else if (message.content.startsWith(`!volume`)) {
        volume(message, serverQueue);
        return;
    } else if (message.content.startsWith(`!pause`)) {
        pause(message, serverQueue);
        return;
    } else if (message.content.startsWith(`!resume`)) {
        resume(message, serverQueue);
        return;
    } else if (message.content.startsWith('!musicmode')) {
        musicmode(message, serverQueue);
        return;
    }





});

function resolveAfter2Seconds(message) {
    return new Promise(resolve => {
        setTimeout(() => {

            var opts = {
                maxResults: 1,
                key: 'INSERTKEY'
            };
            search(message.content.substr("!play ".length), opts, function(err, results) {
                if (err) return console.log(err);


                resolve(results[0]);


            });


        }, 1000);
    });
}


async function execute(message, serverQueue) {


    const args = message.content.split(" ");


    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "You need to be in a voice channel to play music!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
    }



    const result = await resolveAfter2Seconds(message);
    console.log(chalk.cyan("rBot : YT URL: " + result.id));


    const songInfo = await ytdl.getInfo(result.id);
    const song = {
        title: songInfo.title,
        url: songInfo.url
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);

        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

function skip(message, serverQueue) {
    console.log(chalk.cyan("rBot: Song Skipped"));
    if (!message.member.voice.channel)
        return message.channel.send(
            "You have to be in a voice channel to stop the music!"
        );
    if (!serverQueue)
        return message.channel.send("There is no song that I could skip!");
    serverQueue.textChannel.send(`**Skipped one of aiden's tunes**`);
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    console.log(chalk.cyan("rBot: Song Stopped"));
    if (!message.member.voice.channel)
        return message.channel.send(
            "You have to be in a voice channel to stop the music!"
        );

    serverQueue.songs = [];
    serverQueue.textChannel.send(`**Stopped Cammy's songs**`);
    serverQueue.connection.dispatcher.end();



}

async function musicMode(message, serverQueue) {
    const args = message.content.split(" ");
    console.log(chalk.cyan("rBot: MusicMode (づ｡◕‿‿◕｡)づ"));


    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "You need to be in a voice channel to play music!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
    }



    const result = await resolveAfter2Seconds(message);
    console.log(result.id);


    const songInfo = await ytdl.getInfo("#");
    const song = {
        title: songInfo.title,
        url: songInfo.url
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 10,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();

            queueContruct.connection = connection;


            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);

        return message.channel.send(`${song.title} has been added to the queue!`);
    }




    message.channel.send(`**(づ｡◕‿‿◕｡)づ MUSIC MODE (づ｡◕‿‿◕｡)づ**`);




}

function pause(message, serverQueue) {
    console.log(chalk.cyan("rBot: Song Paused"));
    const args = message.content.split(" ");
    if (!message.member.voice.channel)
        return message.channel.send(
            "You have to be in a voice channel to pause bot!"
        );
    serverQueue.connection.dispatcher.pause(true);
    serverQueue.textChannel.send(`Paused rBot (づ｡◕‿‿◕｡)づ`);


}

function resume(message, serverQueue) {
    console.log(chalk.cyan("rBot: Song Resume"));
    const args = message.content.split(" ");
    if (!message.member.voice.channel)
        return message.channel.send(
            "You have to be in a voice channel to resume bot!"
        );
    serverQueue.connection.dispatcher.resume();
    serverQueue.textChannel.send(`Resumed rBot (づ｡◕‿‿◕｡)づ`);


}


function volume(message, serverQueue) {
    console.log(chalk.cyan("rBot: Song Volume Adjusted"));
    const args = message.content.split(" ");
    if (!message.member.voice.channel)
        return message.channel.send(
            "You have to be in a voice channel to adjust the volume!"
        );
    serverQueue.connection.dispatcher.setVolume(args[1]);
    serverQueue.textChannel.send(`Adjusted rBot's volume to : ` + args[1]);


}

function play(guild, song) {
    console.log(chalk.cyan("rBot: Song Played"));
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    serverQueue.textChannel.send('https://www.youtube.com/' + song.url);
}


client.login('secret');