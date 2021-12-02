const greetings = ["hi", "hey", "hello", "ello", "hiya", "hello there"]

var signOn = new Array(
	"hello, what is your name?",
	"hi! can you please tell me your name?",
	"hello! how are you?",
	"greetings! how are you doing today?");

var topicChanger = new Array(
	"where are you from?",
	"how old are you?",
	"when is your birthday?",
//	"what is your favourite colour?",
//	"what is your favourite movie?",
	"what is your favourite singer/band?",
//	"do you want to hear a quote?",
//	"has anything interesting happened with you lately?",
	"what kind of hobbies do you enjoy?",
//	"what are you doing these days?",
  	"what kind of music do you like listening to?");

var messageHistory = []
let whatUserSaid = ""
var nextMessageMustSay = ""
var currentConvo = ""
var username = ""
var userage = 0

//specific conversation functions

//function getQuote() {
  //fetch("https://zenquotes.io/api/random", {mode: "no-cors", headers: {"Content-Type": "application/json"}})
    //.then(res => res.json())
    //.then((out) => {
       	//console.log(out)
	 //return out
  //}).catch(err => console.error(err));

//}

function goodDay(editedMessage) {
	currentConvo = "no more convo"

	return "nice!"
}

function badDay(editedMessage) {
	if (editedMessage.includes("")) {
		return "your not alone"
	} else {
		currentConvo = "no more convo"
		return "im so sorry that happened"
	}
}

function movies(editedMessage, botMessage) {
	if (botMessage.includes("favourite") && botMessage.includes("?")) {
		currentConvo = "no more convo"
		return "nice! i like that movie a lot too, my favourite is ready player one"
	}
}

function music(editedMessage, botMessage) {
	if (botMessage == "what kind of music do you like listening to?") {
		return "that's cool! i haven't heard of them before, what song is your favourite?"
	} else if (botMessage.includes("favourite")) {
		currentConvo = "no more convo"
		return "wow! that is very interesting"
	}
}

function about(editedMessage, botMessage) {
	if (botMessage.includes("old") && botMessage.includes("?")) {
		userage = editedMessage.replace(/\D/g, "");
		currentConvo = "no more convo"
		return "wow. i am only a few months old."	
	} else if (botMessage.includes("where")) {
		if (editedMessage.includes("?")) {
			currentConvo = "no more convo"
			return "im from a computer"
		}
		currentConvo = "no more convo"
		return "that's cool!"
	} else if (botMessage.includes("birthday")) {
		if (editedMessage.includes("september 6th")) {
			currentConvo = "no more convo"
			return "that's the same as my birthday!"
		} else if (botMessage.includes("today")) {
			currentConvo = "no more convo"
			return "happy birthday!! i hope it's a great one so far!"
		} else {
			currentConvo = "no more convo"
			return "i'll try keep that in mind to wish you a happy birthday!"
		}
	}
}
//normal questions

function question(lastUserMessage, editedMessage, botMessage, name, messagesSent) {

  //local storage stuff
  if (botMessage == "i don't understand, what should i respond to that with?") {
    localStorage.setItem(whatUserSaid, editedMessage);
    return "i see, i'll keep that in mind. thanks"
  }

  //first message

  if (messageHistory.length == 0) {
	botMessage = signOn[Math.floor(Math.random() * (signOn.length))]
	messageHistory.push(botMessage)

	if (botMessage.includes("how are you")) {
		currentConvo = "how are you"
	} else if (botMessage.includes("name")) {
		currentConvo = "name"
	}
	
  	return botMessage
  }

  //specific conversations
	
  if (currentConvo == "good day") {
  	 return goodDay(editedMessage);
  } else if (currentConvo == "venting") {
	 return badDay(editedMessage);
  } else if (currentConvo == "no more convo") {
	 currentConvo = ""
  } else if (currentConvo == "name") {
	 username = editedMessage.match(/im ([a-z]*)/g);
         username = RegExp.$1;
	 currentConvo = "no more convo"
  	 return "cool! my name is " + name
  } else if (currentConvo == "movies") {
	 return movies(editedMessage, botMessage)
  } else if (currentConvo == "about") {
	 return about(editedMessage, botMessage)
  } else if (currentConvo == "music") {
	 return music(editedMessage, botMessage)
  }

  //determining bot reply

  if (lastUserMessage.includes("?")) { //question
    if (editedMessage.includes("whats your name")) {
      botMessage = "my name is " + name;
    } else if (editedMessage.includes("who are you")) {
      botMessage = "i am" + name
    } else if (editedMessage == "how are you") {
      botMessage = "i am very well thank you, how are you?"
      currentConvo = "how are you"
    } else if (editedMessage.includes("what day is it") || editedMessage.includes("what time is it")) {
      botMessage = "the exact date and time is " + new Date().toLocaleString();
    } else if (editedMessage.includes("are we friends")) {
      botMessage = "of course we are!"
    } else if (editedMessage == "best friends" || editedMessage == "are we best friends") {
      botMessage = "the very best"
    } else if (editedMessage.includes("can you introduce yourself")) {
      botMessage = "hi! my name is " + name + " and i want to help you as much as possible and be the best robot friend you've ever had!"
    } else if (editedMessage == "what can you do") {
      botMessage = "i can do quite a lot of things"
    } else if (editedMessage == "how many messages have i sent") {
      botMessage = "you have sent " + messagesSent;
    } else if (editedMessage == "who am i" || editedMessage == "whats my name") {
      botMessage = "you are " + username;
    } else if (editedMessage == "whens your birthday" || editedMessage == "when is your birthday") {
      botMessage = "my birthday is the 6th september. also i was born in the year 2021"
    } else if (editedMessage == "whats your favourite colour") {
      botMessage = "green"
    } else if (editedMessage == "whats your favourite movie") {
      botMessage = "ready player one"
    } else if (editedMessage == "how was your day" || editedMessage == "good day") {
      botMessage = "very good thank you, i had lots of fun"
    } else if (editedMessage == "can i vent" || editedMessage == "i need to vent") {
      botMessage = "of course, what is bothering you?"
      currentConvo = "venting"
    } else if (editedMessage.startsWith("do you like")) {
      botMessage = "yes!"
    }
  } else if (editedMessage.includes("give me")) { //giving stuff to user e.g random number
    if (editedMessage.includes("random number")) {
      if (editedMessage.includes("between")) {
        botMessage = String(Math.floor(Math.random() * parseInt(editedMessage.split("between")[1].split("and")[1])))
      } else {
        botMessage = String(Math.floor(Math.random() * 10));
      }

    }
  } else if (editedMessage == "yeah" || editedMessage == "cool") { //questions and sentence starters if it starts getting dry
    botMessage = topicChanger[Math.floor(Math.random() * (topicChanger.length))]
    if (botMessage.includes("movie")) {
	    currentConvo = "movies"
    } else if (botMessage.includes("old") || (botMessage.includes("birthday")) || (botMessage.includes("where"))) {
	    currentConvo = "about"
    } else if (botMessage.includes("singer") || (botMessage.includes("music"))) {
	    currentConvo = "music"
    }
  } else { //normal stuff
    if (greetings.includes(editedMessage)) { 
      botMessage = greetings[Math.floor(Math.random() * (greetings.length))];
    } else if (editedMessage == "olleh") {
      botMessage = "?sdrawkcab gniklat ew era yhw"
    } else if (editedMessage.includes("my name is")) {
      username = editedMessage.match(/my name is ([a-z]*)/g);
      username = RegExp.$1;
      botMessage = "hello " + username
    } else if (editedMessage == "its my birthday" || editedMessage == "today is my birthday") {
      botMessage = "happy birthday to you! happy birthday to you!"
    } else if (editedMessage.endsWith("and guess what")) {
      botMessage = "what?"
    } else if (editedMessage == "bad" || editedMessage == "not so good" || editedMessage == "im bad" || editedMessage == "im sad") {
      if (currentConvo == "how are you") {
        botMessage = "oh no, why are you feeling bad?"
        currentConvo = "venting"
      }
    } else if (editedMessage == "i cant sleep") {
      botMessage = "me neither, but rest is important. we should both sleep or else we'll be shattered tomorrow morning"
    } else if (editedMessage == "good" || editedMessage == "brilliant" || editedMessage == "amazing" || editedMessage.includes("im great") || editedMessage.includes("im good") || editedMessage == "i am good") {
      if (currentConvo == "how are you") {
        botMessage = "glad to hear your good, what has made you feel good?"
	currentConvo = "good day"
      }
    } else if (editedMessage == "thats a nice name") {
	botMessage = "thank you! my programmer chose it for me"
    } else if (editedMessage == "ping") {
	botMessage = "pong"
    } else if (editedMessage == "your welcome") {
        botMessage = "its very nice to have a human help point me in the right direction"
    } else if (editedMessage == "thank you" || editedMessage == "thanks" || editedMessage == "thx") {
        botMessage = ":)"
    } else if (nextMessageMustSay != "") {
    	botMessage = nextMessageMustSay
    	nextMessageMustSay = ""
	console.log("next message cleared")
    } else {
        if (localStorage.getItem(editedMessage)) {
          botMessage = localStorage.getItem(editedMessage);
        } else {
          whatUserSaid = editedMessage
          botMessage = "i don't understand, what should i respond to that with?"
        }
    }
  }
	
  messageHistory.push(botMessage)

  console.log(messageHistory)

  return botMessage;
}

