chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "initiateMessaging") {
        startMessaging(request.count);
    }
});

function startMessaging(count) {
    // Your messaging logic here
    console.log("Sending messages to: ", count, " people.");

    // Example pseudo-code:
    // for (let i = 0; i < count; i++) {
    //     sendMessageToNextPerson();
    //     waitSomeTime();
    // }
}

// This will let the background know that the script has been loaded in this tab.
chrome.runtime.sendMessage({ action: "checkScriptPresence", scriptPresent: true });

