var Discord = require('discord.js');
var auth = require('./auth.json');
var quotes = require('./quotes.json');

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', function() {
    console.log('I am ready!');
    bot.user.setGame('"StagWars2 quote" for a quote')
});

bot.on('message', message => {
    console.log(message.content);

    if(message.content.toLowerCase() == 'stagwars2 ping') {
        message.channel.send('pong');
    }

    if(message.content.toLowerCase() == 'stagwars2 quote') {
        if(!message.channel.nsfw) {
            message.channel.send("This command only works in NSFW channels friendo");
            return false;
        }

        var q = randomProperty(quotes.quotes);
        var date = '';
        if(q.date == "") {
            date = "Once upon a time, Stag said \n"
        } else {
            date = "On " + q.date + ", Stag said \n"
        }

        message.channel.send(date + "\"" + q.content + "\"");
    }
});
bot.login(auth.token);