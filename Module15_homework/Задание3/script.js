const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById("output");
const textOfMessage = document.querySelector('.input')
const divWindow = document.querySelector('.windows')
const btnSend = document.querySelector('.message__btn')
const messageTo = document.querySelector('.messageTo')
const geolocationBtn = document.querySelector('.geolocation_btn')
let messageOfGeolocation = document.createElement('p')
let positionOfGeolocation = document.createElement('a')
let websocket;

let r = false

function writeToScreen(message) {
  let pre = document.querySelector('.p_out')
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}



function openServer () { 
  websocket = new WebSocket(wsUri);
  console.log("Сервер запущен");
}

openServer ()

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  positionOfGeolocation.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  positionOfGeolocation.textContent = 'Ваша геопозиция на карте';
}

const error = () => {
  positionOfGeolocation.textContent = 'Невозможно получить ваше местоположение';
}

geolocationBtn.addEventListener("click", () => { 
  messageOfGeolocation.classList.add('messageTo')
  messageOfGeolocation.innerText = 'Геолокация'
  divWindow.appendChild(messageOfGeolocation)
  positionOfGeolocation.classList.add('messageOut')
  console.log(positionOfGeolocation);
  positionOfGeolocation.textContent = '';
  
  if (!navigator.geolocation) {
    positionOfGeolocation.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
   
    navigator.geolocation.getCurrentPosition(success, error);
  }

  divWindow.appendChild(positionOfGeolocation)
})



btnSend.addEventListener('click', () => {
 
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };

  if (textOfMessage.value != false) { 
    const message = document.querySelector('.input').value
    console.log("🚀 ~ file: script.js:45 ~ btnSend.addEventListener ~ message", message)
    messageTo.innerText = textOfMessage.value
    websocket.send(message);

   websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
   divWindow.style = 'display: flex'
  }
  else { 
    console.log(textOfMessage.value);
  }
});



