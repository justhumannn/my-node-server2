const socket = io();

const form     = document.getElementById('chat-form');
const userIn   = document.getElementById('username');
const msgIn    = document.getElementById('message');
const messages = document.getElementById('messages');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = { user: userIn.value, msg: msgIn.value };
    socket.emit('chat message', data);
    msgIn.value = '';
});

socket.on('chat message', data => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${data.user}</strong>: ${data.msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});