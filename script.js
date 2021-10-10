
var messages = []
var lastUserMessage = "" 
var botMessage = ""
var botName = "name"
var talking = true
var editedMessage = ""
var messagesSent = 0;

var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
var regex = new RegExp('[' + punctuation + ']', 'g');

//chatbot stuff

function chatbotResponse() {
  talking = true;

  //regex

  editedMessage = lastUserMessage.toLowerCase()
  editedMessage = editedMessage.replace(regex, "");
  console.log(editedMessage)

  //questions

  botMessage = question(lastUserMessage, editedMessage, botMessage, botName, messagesSent)
}
function newEntry() {
  if (document.getElementById("chatbox").value != "") {

    messagesSent += 1;
    localStorage.setItem("messagesSentData", messagesSent);

    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push(lastUserMessage);

    chatbotResponse();
    messages.push("<b>" + botName + ":</b> " + botMessage);

    Speech(botMessage);

    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    speechSynthesis.speak(utterance);
  }
}

function keyPress() {
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //enter pressed
        newEntry()
    }
    if (event.keyCode == 38) { //up arrow pressed
      document.getElementById("chatbox").value = lastUserMessage;
    }
  });
}
