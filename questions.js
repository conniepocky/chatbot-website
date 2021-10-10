const greetings = ["hi","hey","hello", "good day", "ello", "hiya", "hello there", "ello there", "hii"]
let whatUserSaid = ""
let nextMessageMustSay = ""

function question(lastUserMessage, editedMessage, botMessage, name, messagesSent) {

	//local storage stuff
	if (botMessage == "i don't understand, what should i respond to that with?") {
		localStorage.setItem(whatUserSaid, editedMessage);
		botMessage = "i see, i'll keep that in mind, thanks"
	}

	//determining bot reply

	if (lastUserMessage.includes("?")) { //question
	    if (editedMessage.includes("who are you") || editedMessage.includes("whats your name")) {
		botMessage = "my name is " + name;
	    } else if (editedMessage.includes("how are you")) {
		botMessage = "i am very well thank you, how are you?"
	    	nextMessageMustSay = "how are you reply"
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
            }
	} else if (editedMessage.includes("give me")) { //giving stuff to user e.g random number
	    if (editedMessage.includes("random number")) {
 	    	if (editedMessage.includes("between")) {
		   botMessage = String(Math.floor(Math.random() * parseInt(editedMessage.split("between")[1].split("and")[1])))
		} else {
		   botMessage = String(Math.floor(Math.random() * 10));
		}

	    }
	} else { //normal stuff
		  if (greetings.includes(editedMessage)) {
		      botMessage = greetings[Math.floor(Math.random()*(greetings.length))];
		  } else if (editedMessage == "how many messages have i sent") {
		      botMessage = "you have sent " + messagesSent;
		  } else if (editedMessage == "who am i") {
		      botMessage = "you are " + username;
		  } else if (editedMessage == "olleh") {
		      botMessage = "?sdrawkcab gniklat ew era yhw"
		  } else if (editedMessage.includes("my name is")) {
		      username = lastUserMessage.match(/my name is ([a-z]*)/g);
		      username = RegExp.$1;
		      botMessage = "hello " + username
		  } else if (editedMessage == "brilliant" || editedMessage == "amazing" || editedMessage == "im great" || editedMessage.includes("im good") || editedMessage == "i am good") {
		      if (nextMessageMustSay == "how are you reply") {
			  botMessage = "glad to hear your good, what has made you feel good?"
			  nextMessageMustSay = "nice :) i'm very happy to hear you have had a good day"
		      }
		  } else {
		      if (nextMessageMustSay != "") {
			  botMessage = nextMessageMustSay
			  nextMessageMustSay = ""
		      } else if (editedMessage == "thank you" || editedMessage == "thanks" || editedMessage == "thx") {
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
