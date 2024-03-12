const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');
const centerLogo = document.querySelector('.center_logo');
let botBusy = false;

function sendMessage(message) {
    if (botBusy) return;
    botBusy = true;
    displayUserMessage(message);
    displayBotMessage('다른 질문이 있나요?', () => {
        botBusy = false;
    });
    hideCenterLogoAndBoxContainer();
}

function hideCenterLogoAndBoxContainer() {
    if (centerLogo) centerLogo.style.display = 'none';
    const boxContainer = document.querySelector('.box-container');
    if (boxContainer) boxContainer.style.display = 'none';
}

function sendMessageFromButton(buttonText) {
    if (botBusy) return;
    botBusy = true;
    hideCenterLogoAndBoxContainer();
    displayUserMessage(buttonText);
    displayBotMessage(`${buttonText}에 대한 질문을 주셨군요!`, () => {
        setTimeout(() => {
            displayBotMessage('다른 질문이 있나요?', () => {
                botBusy = false;
                displayBelowMessageButtons();
            });
        }, 1000);
    });
}

function displayUserMessage(message) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'user-message');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    const avatar = document.createElement('img');
    avatar.src = 'images/dx_logo_2.png';
    avatar.classList.add('avatar', 'user-avatar');
    div.appendChild(messageContent);
    div.appendChild(avatar);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
    displayTime(div, 'user-message-time');
}

function displayBotMessage(message, callback) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'bot-message');
    const avatar = document.createElement('img');
    avatar.src = 'images/dx_logo_2.png';
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
    displayTime(div, 'bot-message-time');

    if (message === '다른 질문이 있나요?') {
        displayBelowMessageButtons();
    }
}

function displayBelowMessageButtons() {
    const belowMessageButtons = document.querySelector('.below-message-buttons');
    if (belowMessageButtons) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'below-message-container');
        messageContainer.appendChild(belowMessageButtons);
        chatbox.appendChild(messageContainer);
    }
}

function displayTime(messageElement, timeClass) {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time', timeClass);
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    timeDiv.textContent = timeString;
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timeDiv);
    chatbox.appendChild(messageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
}

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (event.ctrlKey) {
            const cursorPos = this.selectionStart;
            const value = this.value;
            const before = value.substring(0, cursorPos);
            const after = value.substring(cursorPos);
            this.value = before + "\n" + after;
            this.selectionStart = cursorPos + 1;
            this.selectionEnd = cursorPos + 1;
        } else {
            const message = userInput.value.trim();
            if (message !== '') {
                sendMessage(message);
                userInput.value = '';
            }
        }
    }
});

document.querySelector('.hamburger-menu').addEventListener('click', function(event) {
    event.stopPropagation();
    const nav = document.getElementById('nav');
    const header = document.querySelector('header');
    const main = document.querySelector('.main');
    const subPost = document.querySelector('.sub-post');

    this.classList.toggle('active'); 
    sidebar.classList.toggle('active');
    header.classList.toggle('active');
    main.classList.toggle('active');
    subPost.classList.toggle('active');
});

userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    const maxHeight = 204;
    if (this.scrollHeight <= maxHeight) {
        this.style.height = (this.scrollHeight + 2) + 'px';
    } else {
        this.style.height = maxHeight + 'px';
        this.style.overflowY = 'auto';
    }
});

document.querySelector('.dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
