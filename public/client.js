const socket = io();

let username;

let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message__area')


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

do{
    username = prompt('Please enter your name : ')
}
while(!username);

function sendMessage(msg){
    let message = {
        user : username,
        message: msg.trim()
    }

    //append message
    appendMessage(message,'outgoing')
    textarea.value = ""
    scrollToBottom()
    

    socket.emit('message',message);

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');

    let classname = type;

    mainDiv.classList.add(classname,'message',)

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

