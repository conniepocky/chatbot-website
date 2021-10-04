const greetings = ["hi","hey","hello", "good day"]
let whatUserSaid = ""
let nextMessageMustSay = ""

function question(lastUserMessage, editedMessage, botMessage) {

	//local storage stuff
	if (botMessage == "i don't understand, what should i respond to that with?") {
		localStorage.setItem(whatUserSaid, editedMessage);
		botMessage = "i see, i'll keep that in mind, thanks"
	}

	//question inputs

	if (lastUserMessage.includes("?")) {
	    if (editedMessage.includes("who are you") || editedMessage.includes("whats your name")) {
		botMessage = "my name is " + botName;
	    } else if (editedMessage.includes("how are you")) {
		botMessage = "i am very well thank you, how are you?"
	    	nextMessageMustSay = "how are you reply"
	    } else if (editedMessage.includes("what day is it") || editedMessage.includes("what time is it")) {
		botMessage = "the exact date and time is " + new Date().toLocaleString();
	    } 
	} else { //normal stuff
		  if (editedMessage == "hi" || editedMessage == "hello") {
		      botMessage = greetings[Math.floor(Math.random()*(greetings.length))];
		  } else if (editedMessage == "how many messages have i sent") {
		      botMessage = "you have sent " + messagesSent;
		  } else if (editedMessage == "who am i") {
		      botMessage = "you are " + username;
		  } else if (editedMessage.includes("my name is")) {
		      username = lastUserMessage.match(/my name is ([a-z]*)/g);
		      username = RegExp.$1;
		      botMessage = "hello " + username
		  } else if (editedMessage == "im great" || editedMessage == "im good" || editedMessage == "i am good") {
		      if (nextMessageMustSay == "how are you reply") {
			  botMessage = "glad to hear your good, what has made you feel good?"
			  nextMessageMustSay = "that sounds lovely, i'm very pleased to hear you have had a good day"
		      }
		  } else {
		      if (nextMessageMustSay != "") {
			  botMessage = nextMessageMustSay
			  nextMessageMustSay = ""
		      } else if (editedMessage == "thank you" || editedMessage == "thanks") {
			  botMessage = ":)"
		      } else {
			  if (localStorage.getItem(editedMessage)) {
			  	botMessage = localStorage.getItem(editedMessage);
			  } else {
			  	whatUserSaid = editedMessage
			  	botMessage = "i don't understand, what should i respond to that with?"
		      	  }
		      }
		  }
	}

	//return

	return botMessage;
}
