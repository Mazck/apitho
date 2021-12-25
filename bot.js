module.exports.config = {
    name: "bot",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "datoccho",
    description: "test",
    commandCategory: "test",
    usages: "test",
    cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "listAdmin": '==============\n TIME: %2\nADMIN\n%1\nPREFIX: %3 \nTÊN BOT: %4\nFAST: %5 \nPING: %6 \nTỔNG MODULES: %7'
    },
    "en": {
        "listAdmin": '==============\n TIME: %2\nADMIN\n%1\nPREFIX: %3 \nNAME BOT: %4\nFAST: %5 \nPING: %6 \nALL MODULES: %7'
    }
}

module.exports.run = async function({
    api,
    event,
    args,
    Users,
    permssion,
    getText
}) {
    const content = args.slice(1, args.length);
    const {
        threadID,
        messageID,
        mentions
    } = event;
    const {
        configPath
    } = global.client;
    const {
        ADMINBOT
    } = global.config;
    const {
        userName
    } = global.data;
    const { 
        commands
     } = global.client;
    const {
        writeFileSync
    } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);


    const listAdmin = ADMINBOT || config.ADMINBOT || []; {
        const prefix = config.PREFIX
        const namebot = config.BOTNAME
        const fast = global.nodemodule["fast-speedtest-api"];
        const speedTest = new fast({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
            verbose: false,
            timeout: 10000,
            https: true,
            urlCount: 5,
            bufferSize: 8,
            unit: fast.UNITS.Mbps
        });
        const resault = await speedTest.getSpeed();
        const dateNow = Date.now();
        const command = commands.values();
        var msg = [] , i = 1;;
        const moment = require("moment-timezone");
        const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
        for (const idAdmin of listAdmin) {
            if (parseInt(idAdmin)) {
                const name = await Users.getNameUser(idAdmin);
                msg.push(`${i++}: ${name}\n-${idAdmin}`);

            }
        }

        return api.sendMessage(getText("listAdmin", msg.join("\n"), time, prefix, namebot, Math.floor(resault), Date.now() - dateNow, commands.size), threadID, messageID);
    }

}
