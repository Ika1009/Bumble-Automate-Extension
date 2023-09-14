chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Fetch the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        
        const tabId = activeTab.id;

        if (request.action === "startMessaging") {
            checkOrInjectContentScript(tabId, "contentMessaging.js", "messagingScript", { count: request.count }, function(data) {
                chrome.tabs.sendMessage(tabId, {
                    action: "initiateMessaging",
                    count: data.count
                });
            });
        } 
        else if (request.action === "startSwiping") {
            checkOrInjectContentScript(tabId, "contentSwiping.js", "swipingScript", { time: request.time, percentage: request.percentage }, function(data) {
                chrome.tabs.sendMessage(tabId, {
                    action: "initiateSwiping",
                    time: data.time,
                    percentage: data.percentage
                });
            });
        }
    });
});

function checkOrInjectContentScript(tabId, scriptFile, scriptName, data, callback) {
    chrome.tabs.sendMessage(tabId, { action: "checkScriptPresence", scriptName: scriptName }, function(response) {
        if (chrome.runtime.lastError || !response || !response.scriptPresent) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: [scriptFile]
            }, (injectionResults) => {
                for (const frameResult of injectionResults) {
                    if (chrome.runtime.lastError) {
                        console.log(chrome.runtime.lastError.message);
                    } else {
                        callback(data);
                    }
                }
            });
        } else {
            callback(data);
        }
    });
}
