const toggleSwitch = document.getElementById("toggleSwitch");
const messageCount = document.getElementById("messageCount");
const swipeTime = document.getElementById("swipeTime");

toggleSwitch.addEventListener("click", function() {
    if (toggleSwitch.classList.contains("active")) {
        toggleSwitch.classList.remove("active");
        messageCount.disabled = false;
        swipeTime.disabled = true;
    } else {
        toggleSwitch.classList.add("active");
        messageCount.disabled = true;
        swipeTime.disabled = false;
    }
});

document.getElementById("startAction").addEventListener("click", function() {
    const messageCountVal = messageCount.value;
    const swipeTimeVal = swipeTime.value;

    if ((messageCountVal && !swipeTime.disabled) || (swipeTimeVal && !messageCount.disabled)) {
        // Pass these values to your background script or content script
        chrome.runtime.sendMessage({action: "startSwiping", time: swipeTimeVal, count: messageCountVal});
    } else {
        alert("Please fill in the active field!");
    }
});
