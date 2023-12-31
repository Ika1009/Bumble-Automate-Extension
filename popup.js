const toggle = document.getElementById("toggleSwitch");
    
toggle.addEventListener('click', toggleSwitch);

let swipeIsEnabled = false;  // Default state: "People to Message" is enabled

function toggleSwitch() {
    const toggle = document.getElementById("toggleSwitch");
    const messageInput = document.getElementById("messageCount");
    const messageLabel = document.getElementById("messageLabel");
    const swipeInput = document.getElementById("swipeTime");
    const swipeLabel = document.getElementById("swipeLabel");
    const swipeInput1 = document.getElementById("swipePercentage");
    const swipeLabel1 = document.getElementById("swipePercentageLabel");

    if (swipeIsEnabled) {
        // When swipe is currently enabled:
        // Disable the "Seconds to Swipe" input and label
        swipeInput.disabled = true;
        swipeLabel.classList.add('disabled-label');
        swipeInput1.disabled = true;
        swipeLabel1.classList.add('disabled-label');
        
        // Enable the "People to Message" input and label
        messageInput.disabled = false;
        messageLabel.classList.remove('disabled-label');
        
        toggle.classList.remove('active');
    } else {
        // When swipe is currently disabled:
        // Enable the "Seconds to Swipe" input and label
        swipeInput.disabled = false;
        swipeLabel.classList.remove('disabled-label');
        swipeInput1.disabled = false;
        swipeLabel1.classList.remove('disabled-label');

        // Disable the "People to Message" input and label
        messageInput.disabled = true;
        messageLabel.classList.add('disabled-label');

        toggle.classList.add('active');
    }

    // Toggle the swipeIsEnabled value for the next time the function runs
    swipeIsEnabled = !swipeIsEnabled;
}


document.getElementById("startAction").addEventListener("click", function() {
    const messageCountVal = messageCount.value;
    const swipeTimeVal = swipeTime.value;
    const swipePercentageVal = swipePercentage.value;

    if (messageCountVal && !swipeIsEnabled) {
        chrome.runtime.sendMessage({action: "startMessaging", count: messageCountVal});
    }
    else if(swipeTimeVal && swipePercentageVal && swipeIsEnabled){
        chrome.runtime.sendMessage({action: "startSwiping", time: swipeTimeVal, percentage: swipePercentageVal});
    } else {
        alert("Please fill in the active field!");
    }
});
