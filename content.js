let swipeRightPercentage = 20;
randomSwipe(swipeRightPercentage);

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


function randomSwipe(swipeRightPercentage) {
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

        let randomValue = Math.random() * 100;  // Generate a random number between 0 and 100
        if (randomValue <= swipeRightPercentage) {
            // Swipe right
            actionButtons[2].click();
        } else {
            // Swipe left
            actionButtons[0].click();
        }
    } else {
        console.error("Controls not found!");
    }
}
