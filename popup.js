function clickHandler(e) {

    chrome.runtime.sendMessage({ directive: "popup-click" }, function (response) {

        this.close(); // close the popup when the background finishes processing request

    });
}

document.getElementById("btn1").onclick = function () {
    
    chrome.runtime.sendMessage({  //send a message to the background script

        from: "popup"

    });

}

document.getElementById("website").onclick = function () {
    chrome.runtime.sendMessage({  //send a message to the background script
        from: "popup", 
        value: "https://stackoverflow.com/"
    });
}