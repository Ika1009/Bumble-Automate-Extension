let count;
let started = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "initiateMessaging") {
        count = request.count;
        if(!started) await startMessaging();
    }
    else if (request.action === "checkScriptPresence" && request.scriptName === "messagingScript") {
        sendResponse({ scriptPresent: true });
    }
});

async function startMessaging() {
    started = true;
    // Your messaging logic here
    console.log("Sending messages to: ", count, " people.");

    // Example pseudo-code:
    for (let i = 0; i < count; i++) {
        document.getElementsByTagName("li")[0].children[0].click();
        
        await delay(5000);
    }
}

// Function to get a random text line
function getRandomLine(extractedName) {
    const randomIndex = Math.floor(Math.random() * textLines.length);
    return textLines[randomIndex].replace('<name>', extractedName);
}


const textLines = [
    "hii how are you <name>? add me on snap i love your profile picture! you should add me on snap:)",
    "you look like a lot of fun <name>:) here is my snap",
    "hi hi <name> how are you? here's my snap btw",
    "yayy hi <name>! you should add me on snap:)",
    "hello:) you seem fun <name>, add me on snap",
    "hi hi you seem fun, add me on snap <name>:)",
    "you look like a funny guy, i had to message first. add me on snap <name>:)",
    "no way haha, hi! add me on snap <name>:)",
    "how are you <name>? You should add me on snap",
    "<name> how are you? you seem fun, here's my snap",
    "helloo:) you should add me on snap <name> im pretty bored",
    "yayy hi <name>, you should add me on snap:)",
    "helloo hi <name>, heres my snap",
    "you seem like a fun guy, hi! add me on snap <name>",
    "<name> hi hi how are you? you should add me on snap:)",
    "i love your profile pic haha, add me on snap <name>:)",
    "how r you <name>? add me on snap:)",
    "hello! do you have snap? add me:)",
    "hi hello <name>:) u use snap? add me",
    "hii <name> do you like icecream? add me on snap",
    "Heyy you seem like a funny guy! add me on snap <name>:)",
    "helloo you seem fun:) you should add me on snap",
    "do you like icecream <name>? you seem fun, add me on snap:)",
    "you're cute:) do you use snap <name>? here's mine, add me",
    "hi hi how are you <name>? you should add me on snap:)",
    "hiii hi <name>:) you should add me on snap💕",
    "hi how are you <name>?💕 add me on my snap",
    "do you have snap <name>? add me:)",
    "hi helloo <name> do you have snap? here is mine",
    "hi hi <name> do u use snap? here is mine, you should add me:)",
    "<name> do you have snap? you should add me there you're cute:)",
    "hi hi you're cute 🙈 you should add me on snap <name>:)",
    "hi <name> what are you up to? add me on snap!",
    "hii what are you doing right now? anything interesting <name>? you should add me on snap:)",
    "hello hows your day goiing?:)) you should add me on snap <name>:)",
    "hi hi you seem like a super nice guy:) you should add me on snap <name>! :)",
    "hi you're cute:) you seem like a nice guy, add me on snap:)",
    "<name> do you have snap by any chance? you should add me there, you're cute:)",
    "hi hii <name>:) what are you up to? add me on my snap",
    "helloo what are you doing rn <name>? you should add me on snap btw",
    "hii how are you? you seem cute, add me on your snap <name>:))",
    "hi hi <name> are you here? if not, you should add me on snap:))",
    "yayy hi i thought you would match me, maybe add me on your snap <name>:))",
    "how's your day <name>?:) you can add me on snap if you want:)",
    "hi yayy nice to meet you, you're cute!:) you should add me on your snap:)",
    "hi <name> do you prefer icecream or coffee? add me on snap by the way:))",
    "helloo i like you, you're cute <name>:) why don't you add me on snap?",
    "hi hi i like your name <name> haha:)) add me on snap:)",
    "yayy helloo how are you <name>? i like your name haha its cute, add me on snap!:)"
];
