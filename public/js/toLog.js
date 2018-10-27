var length = 0;
function sendToLog(text) {
    var ul = document.getElementById("log_e")
    var li = document.createElement("li")
    if (length < 44) {
        console.log("log set")
        li.appendChild(document.createTextNode("you: " + text))
        ul.appendChild(li)
        length+=1
    }
}