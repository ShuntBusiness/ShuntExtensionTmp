chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

var textChange;
var originalText = "";
var searchTags = ['p', 'div', 'th', 'td', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'q', 'blockquote', 'hr', 'li', 'dt', 'dd', 'mark', 'ins', 'del', 'sup', 'sub', 'small', 'i', 'b'];
var spoilers_detected = ["Marty"];
var tmp_tag;


chrome.runtime.onMessage.addListener(function (msg, url, value) {

    if (msg.from == "background") {

        for (var i = 0; i < searchTags.length; i++) {

            var tag = document.getElementsByTagName(searchTags[i]);
            var tmp_tag = tag;

            for (var j = 0; j < tag.length; j++) {

                textChange = tag[j].innerHTML;
                originalText = tag[j].innerText;

                if (findCommonElements2(originalText, spoilers_detected) && !textChange.includes('name="changed"')) {

                    textChange = '</' + searchTags[i] + '> <span name="changed" style="background-color: black"> ' + originalText + ' </span> <' + searchTags[i] + '>';
                    tmp_tag[j].innerHTML = textChange;

                }

            }

            tag = tmp_tag;

        }

    }

});

function findCommonElements2(arr1, arr2) {

    arr1 = arr1.toLowerCase();

    for (var i = 0; i < arr2.length; i++) {

        if (arr1.includes(arr2[i].toLowerCase())) {

            return true;

        }

    }

    return false;

}

