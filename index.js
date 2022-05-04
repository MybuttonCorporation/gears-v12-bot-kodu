const discord = require('discord.js')
const client = new discord.Client();


/**
 * GEREKSİNİMLER:
 *  - Botun Prefixi,
 *  - 'komutlar' adına bir dosya
 *
 * segmentler:
 *  {prefix}{komut} {argümanlar} [seçilebilen-argümanlar]
 *  ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^
 *  Bu kısım komutlar gereklidir.
 */
const prefix = new Prefix("BOTPREFİX");
const komutlar = new CommandsFolder("./komutlar");
client.on('message', message => {
    //mesajı segmentlere ayır
    const args_raw = message.content.split(' '), msgPrefix = [...message.content].at(-([...message.content].length - prefix.length))
    var command = args_raw[0].replace(prefix)
    , arguements = message.content.split(' ').slice(1)
    , messageArguements = arguements.join(' ')
    , messageAuthor = message.author
    const fs = require('fs');
    if (!fs.existsSync('./komutlar')) {
        message.reply(
            new ErrorEmbed({error: 'Komutlar dosyası bulunamadı.\e'})
        )
        return;
    }
    if (msgPrefix == prefix) {
        if (komutlar.hasCommand(command)) {
            komutlar.runCommand(client, message, arguements);
        }
    }


})
/**
 * Discord botu için bir prefix belirler.
 * `ApplicationVariableChannel.Prefix = this.prefix, this.prefix.setAsString()`
 * @returns {(objectAsString) prefix};
 * @param {string} prefix;
 *  
 */
class Prefix {
    constructor(prefix = "!") {
        this.length = prefix.length;
        this.prefix = prefix;
        this.charCode = prefix.charCodeAt(0);

    }
    test() {
        var data = [];
        if (this.prefix.length < 4) data.push({length: '✅'}); 
        else data.push({length: '❌'})
        if (!this.prefix.includes("xxx")) data[0].usableState = '✅';
        else data[0].usableState = '❌';
        if (this.prefix != "!") data[0].unique = '✅';
        else data[0].unique = '❌';
        if (this.prefix.charCodeAt(0) != 65) data[0].valid = '✅';
        else data[0].valid = '❌';

        console.table(data) 
    }
    info() {
        var data = [];
        data[0] = {};
        data[0].length = this.length;
        data[0].index = this.prefix;
        data[0].charCode = this.charCode;
        data[0].valid = '✅';
        console.log("PREFİX BİLGİSİ:")
        console.table(data)

    }
}


class ErrorEmbed {
    constructor({error = "", newline = false}) {
        error = error.replace('\e', '');
        if (newline) return new discord.MessageEmbed({
            description: `
            > **📦 Hata**: 
            \`${error}\`
            `,
            color: 'RED'
        })
         else return new discord.MessageEmbed({
            description: `
            > **📦 Hata**: \`${error}\`
            `,
            color: 'RED'
        })
    }
}

class CommandsFolder {
    constructor(path = "./komutlar") {
        this.fs = require('fs')
    if (!fs.existsSync(path)) throw new RangeError("Komutlar dosyası bulunamadı.")
    this.path = path;
    this.commands = new Map();
    //get all files that ends with .js in the path folder
    var files = this.fs.readdirSync(this.path).filter(file => file.endsWith('.js'));
    files.forEach(file => {
        const cmd = require(`${this.path}/${file}.js`);
        this.commands.set(cmd.config.name, cmd);
    })
    }
    hasCommand(command = "") {
        if (this.commands.has(command)) return true;
        else return false;
    }
    /***
     * komutu çalıştırır.
     * @params `{client, message, arguements}`
     * @returns `(BotCommand) Command`
     */
    runCommand(command = "", message = "", args = []) {
        if (this.commands.has(command)) {
            this.commands.get(command).run(client, message, args);
        } else throw new RangeError("Komutlar dosyasında '"+command+"' diye bir komut bulunamadı.");
    }
    getCommandInfo(command = "") {
        if (this.fs.existsSync(`${this.path}/${command}.js`)) {
            var command = require(`${this.path}/${command}.js`)
            return command.config;
        }
    }
}

