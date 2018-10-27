var io = io()

var input = document.getElementById("input")
var log = document.getElementById("log")
input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        console.log(input.value)
        logMsg(input.value)
    }
})

function logMsg(input) {
    log.setAttribute("value", input)
}
