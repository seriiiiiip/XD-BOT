const form = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');
let botBusy = false;

// 사용자가 버튼을 클릭하여 메시지를 보낸 경우 처리하는 함수
function sendMessageFromButton(buttonText) {
    if (botBusy) return;
    botBusy = true;
    displayUserMessage(buttonText);
    displayBotMessage(`${buttonText}에 대한 질문을 주셨군요!`, () => {
        setTimeout(() => {
            displayBotMessage('모르겠습니다!', () => {
                botBusy = false;
            });
        }, 1500);
    });
}

// 버튼 클릭 시 질문 전송 함수를 직접 호출하여 메시지 보내기
function sendQuestion(buttonText) {
    userInput.value = buttonText;
    sendMessageFromButton(buttonText);
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = userInput.value.trim(); // 사용자 입력 받기 및 양쪽 공백 제거
    if (message !== '') {
        if (!botBusy) { 
            displayUserMessage(message);
            botBusy = true; 
            displayBotMessage('어쩌구저쩌구 샬라샬라 어쩌구저쩌구 샬라샬라 어쩌구저쩌구 샬라샬라 감사합니다.', () => {
                botBusy = false; 
            }); 
            userInput.value = ''; 
        }
    }
});

function displayUserMessage(message) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'user-message');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    const avatar = document.createElement('img');
    avatar.src = 'img/profile.jpg';
    avatar.classList.add('avatar', 'user-avatar');
    div.appendChild(messageContent);
    div.appendChild(avatar);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function displayBotMessage(message, callback) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'bot-message');
    
    const avatar = document.createElement('img');
    avatar.src = 'img/profile.jpg'; 
    avatar.classList.add('avatar', 'bot-avatar');
    div.appendChild(avatar);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    div.appendChild(messageContent);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;

    let index = 0; 

    const intervalId = setInterval(() => {
        if (index < message.length) {
            messageContent.textContent += message.charAt(index); 
            index++; 
        } else {
            clearInterval(intervalId);
            if (callback) callback(); 
        }
    }, 100); 
}
