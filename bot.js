//Adding token from env variables
require('dotenv').config()

//Setting listening server on HTTP for Zeit or Heroku hosting
if(process.env.PORT) {
	const {createServer} = require('http')
	const server = createServer(() => {})
	server.listen(process.env.PORT)	
}

// require the discord.js and fs modules
const Discord = require('discord.js');
const fs = require('fs');

// create a new Discord client
const client = new Discord.Client();
const prefix = ".asuka ";

//Setting lists of commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Importing the commands from the folder
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log("Ready");
});

client.on('message', message => {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `.asuka`
	if (message.content.startsWith(prefix)) {
	
		//Fetching arguments, command used and the mentioned user
		const args = message.content.slice(prefix.length).split(' ');
		const command = args.shift().toLowerCase();
		const mentioned_user = message.mentions.users.first()//getUserFromMention(args[0]);

		switch(command) {
			case 'baka':
				client.commands.get('baka').execute(message, args, mentioned_user);
			break;

			case 'sad':
				client.commands.get('sad').execute(message, args, mentioned_user);
			break;

			case 'slap':
				client.commands.get('slap').execute(message, args, mentioned_user);
			break;

			case 'hug':
				client.commands.get('hug').execute(message, args, mentioned_user);
			break;

			case 'baka-license':
				client.commands.get('baka-license').execute(message, args, mentioned_user);
			break;

			case 'soundboard':
				client.commands.get('soundboard').execute(message, args, mentioned_user);
			break;

			case 'help':
				client.commands.get('help').execute(message, args, mentioned_user,client.commands);
			break;
			// Just add any case commands if you want to..
			default:
				message.channel.send("It's not a command. What are you, stupid ?!")
			break;
		}
	}
	// If the prefix isn't used we do some string analysis
	// We start to check if someone is tagged and if it's Asuka
	else if ((message.mentions.users.first()) && (message.mentions.users.first().id==process.env.id)){

		const args = message.content.split(' ')
		var command

		sleep(1000)
		// We check the length of the arguments to see if the message is something like 
		//".botprefix command tag" or "%command tag"
		if (args.length == 2) {
			// We remove all the special characters to get only the command
			command = args[0].replace(/[^\w\s]/gi, '');
		}
		else {
			command = args[1].toLowerCase();
		}
		
		switch(command) {
			case 'hug':
				message.channel.send("What are you doing ? Anta baka !")
			break;
			
			case 'kiss':
				message.channel.send("BAAAAKAAAAAAAAAA ! THAT'S GROSS ! PERV !")
			break;

			case 'lick':
				message.channel.send("..................................................... PERV !")
			break;

			case 'slap':
				message.channel.send("HOW DARE YOU SLAPPING ME !")
				message.channel.send(`.asuka slap ${message.author}`)
			break;
		}
	}
});

// login to Discord with your app's token
client.login(process.env.token);

// This will let us know of any API errors encountered
client.on('error', error => console.log(error))

//Function to fetch mentioned user
// function getUserFromMention(mention) {
// 	if (!mention) return;
// 	if (mention.startsWith('<@') && mention.endsWith('>')) {
// 		mention = mention.slice(2, -1);
// 		if (mention.startsWith('!')) {
// 			mention = mention.slice(1);
// 		}
// 		return client.users.get(mention);
// 	}
// }

//Function to set pause
function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
  }