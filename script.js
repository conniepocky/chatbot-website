
var messages = []
var lastUserMessage = "" 
var botMessage = ""
var botName = "name"
var talking = true
var editedMessage = ""
var messagesSent = 0;
var speechAllowed = true;

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

    if (typeof botMessage === 'string') {
    	messages.push("<b>" + botName + ":</b> " + botMessage);
    } else if (typeof botMessage === "promise") { //promise
      const getNewQuote = async () =>
      {
          var url = "https://type.fit/api/quotes";  
          var author = ""  
      
          const response = await fetch(url);
          console.log(typeof response);
          const allQuotes = await response.json();
          const indx = Math.floor(Math.random()*allQuotes.length);
          const quote = allQuotes[indx].text;
      
          messages.push("<b>" + botName + ":</b> " + quote); 

          for (var i = 1; i < 8; i++) {
            if (messages[messages.length - i])
              document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
          }
      
      }
      getNewQuote()
      // console.log(messages) 
      // console.log(messages[messages.length - i])
      // console.log(typeof messages[messages.length - i])
    }

    Speech(botMessage);

    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

function showChatLog() {
  var x = document.getElementById("bodybox");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toggleSpeech() {
	if (speechAllowed == true) {
		speechAllowed = false;
	} else if (speechAllowed == false) {
		speechAllowed = true;
	}
}

function Speech(say) {
  if ('speechSynthesis' in window && speechAllowed) {
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
