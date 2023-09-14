let time;
let percentage;
let started = false;
let startTime;
const delay = ms => new Promise(res => setTimeout(res, ms));

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "initiateSwiping") {
        time = request.time;
        percentage = request.percentage;
        startTime = Date.now();

        //Start function if the first time
        if(!started) await startSwiping()
    }    
    else if (request.action === "checkScriptPresence" && request.scriptName === "swipingScript") {
        sendResponse({ scriptPresent: true });
    }
});


async function startSwiping() {
    started=true;

    // Your swiping logic here
    console.log("Swiping for: ", time, " seconds with percentage: ", percentage);

    while (Date.now() < startTime + (time * 1000)) {
        if (randomPercentage() < 30) {
            //30% chance to Scroll Down

        }
        randomSwipe();
        await delay(5000);
    }

    function randomPercentage(){
        return Math.random() * 100;  // Generate a random number between 0 and 100
    }

    // Check if the user SuperSwiped
    function hasSuperSwipe() {
        let elements = document.getElementsByClassName("tooltip__content");
        
        for (let i = 0; i < elements.length; i++) {
            let spanChildren = elements[i].getElementsByTagName("span");
            
            for (let j = 0; j < spanChildren.length; j++) {
                if (spanChildren[j].textContent === "He SuperSwiped you!") {
                    return true;
                }
            }
        }
        return false;
    }


    function randomSwipe() {
        let controls = document.getElementsByClassName("encounters-controls__actions");
        console.log(controls);
        if (controls.length > 0) {
            let actionButtons = controls[0].children;
            
            console.log("HAS: ", hasSuperSwipe())
            if (hasSuperSwipe()) {
                // Always swipe right if SuperSwiped
                actionButtons[2].click();
                return;
            }

            if (randomPercentage() <= percentage) {
                // Swipe right
                console.log("swipe right")
                actionButtons[2].click();
            } else {
                // Swipe left
                console.log("swipe left")
                actionButtons[0].click();
            }
        } else {
            console.log("Controls not found!");
        }
    }

}




