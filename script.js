const myUsername = generateName();

const drone = new Scaledrone("hSaQHXV8z3CUoESM", {
  data: {
    name: myUsername,
  },
});

const messageInput = document.querySelector(".messageInput");
const messageSend = document.querySelector(".messageSend");
const messageList = document.querySelector(".messageList");

drone.on("open", (error) => {
  if (error) {
    console.log("Error on open:", error);
    return;
  }

  const room = drone.subscribe("observable-room");

  room.on("open", (error) => {
    if (error) {
      console.log("Error on room open:", error);
    }
  });
  room.on("message", (message) => {
    console.log(message);
  
    let messageDiv = document.createElement("div");
    const userColor = generateColor(message.member.clientData.name); 
    const userName = message.member.clientData.name;
  
    messageDiv.innerHTML = `<div class="username" style="color:${userColor}">${userName}</div><div class="message">${message.data}</div>`;
    if (myUsername === userName) {
      messageDiv.style.textAlign = "right";
    }
  
    messageList.appendChild(messageDiv);
  });
  
  });


messageSend.addEventListener("click", () => {
  const inputValue = messageInput.value;
  messageInput.value = "";

  drone.publish({
    room: "observable-room",
    message: inputValue,
  });
});

messageInput.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const inputValue = messageInput.value;
    messageInput.value = "";

    drone.publish({
      room: "observable-room",
      message: inputValue,
    });
  }
});

function generateColor(string) {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

function generateName() {
  const names = [
    "Ivo",
"Mia",
"Luka",
"Tina",
"Marko",
"Ela",
"Ivan",
"Mara",
"Nikola",
"Nina",
"Ante",
"Marta",
"Stjepan",
"Ana",
"Petar",
"Eva",
"Josip",
"Lea",
"Mirko",
"Dora",
"Toni",
"Sara",
"Leo",
"Klara",
"Matija",
"Dina",
"Karlo",
"Ivana",
"Filip",
"Maja",
"Lovro",
"Lucija",
"Juraj",
"Iris",
"Mario",
"Lena",
"Borna",
"Tea",
"Šime",
"Marta",
"Patrik",
"Ivana",
"Bruno",
"Mila",
"Stipe",
"Ena",
"Marin",
"Jana",
"Andro",
"Ines"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

