chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
    if (request.action === "startMessaging") {
        checkOrInjectContentScript(sender.tab.id, "contentMessaging.js", { count: request.count }, function(data) {
            // After ensuring the script is there, send the command.
            chrome.tabs.sendMessage(sender.tab.id, {
                action: "initiateMessaging",
                count: data.count
            });
        });
    } 
    else if (request.action === "startSwiping") {
        checkOrInjectContentScript(sender.tab.id, "contentSwiping.js", { time: request.time, percentage: request.percentage }, function(data) {
            // After ensuring the script is there, send the command.
            chrome.tabs.sendMessage(sender.tab.id, {
                action: "initiateSwiping",
                time: data.time,
                percentage: data.percentage
            });
        });
    }
});

function checkOrInjectContentScript(tabId, scriptFile, data, callback) {
    chrome.tabs.sendMessage(tabId, { action: "checkScriptPresence" }, function(response) {
        
        // If an error is thrown or the script is not present, inject it.
        if (chrome.runtime.lastError || !response || !response.scriptPresent) {
            chrome.tabs.executeScript(tabId, { file: scriptFile }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    callback(data);
                }
            });
        } else {
            callback(data);
        }
    });
}

