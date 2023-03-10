/*
VARIABLES 
*/ 

//Connect to WebSockets Server 
const myWebSocket = new WebSocket(`${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${document.body.dataset.host}/ws/social-network/`);

const inputAuthor = document.querySelector("#message-form__author");

const inputText = document.querySelector("#message-form__text");

const inputSubmit = document.querySelector('#message-form__submit');


/*
FUNCTIONS
*/

/*
send data to websockets server
@param {string} message
@param {WebSocket} webSocket
@return {void}
*/

function sendData(message,webSocket){
    webSocket.send(JSON.stringify(message));
}

function sendNewMessage(event){
    event.preventDefault();
    //Prepare the information we will send
    const newData ={
        "action": "add message",
        "data":{
            "author": inputAuthor.value,
            "text": inputText.value
        }
    };

    //send the data to the server
    sendData(newData, myWebSocket);
    
    //clear message form
    inputText.value="";

}


/*
EVENTS
*/

//evnet when a new message is received by websockets
myWebSocket.addEventListener("message",(event)=>{
    //parse the data received
    const data = JSON.parse(event.data);
    //renders the HTML received form the Consumer
    document.querySelector(data.selector).innerHTML=data.html;
});


//Sends new message when you click on Submit 
inputSubmit.addEventListener("click", sendNewMessage);

