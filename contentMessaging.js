let count;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "initiateMessaging") {
        count = request.count;
        startMessaging();
    }
    else if (request.action === "checkScriptPresence" && request.scriptName === "messagingScript") {
        sendResponse({ scriptPresent: true });
    }
});

function startMessaging() {
    // Your messaging logic here
    console.log("Sending messages to: ", count, " people.");

    // Example pseudo-code:
    // for (let i = 0; i < count; i++) {
    //     sendMessageToNextPerson();
    //     waitSomeTime();
    // }
}

