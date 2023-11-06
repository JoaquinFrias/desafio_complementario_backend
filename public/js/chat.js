(function() {
    let username;
    const socket = io();
    
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const logMessage = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = inputMessage.value;
        socket.emit('new-message', {username, text});
        inputMessage.value = '';
        inputMessage.focus();
    })

    function updateLogMessages(messages) {
        logMessage.innerText = '';
        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.innerText = `${msg.username}: ${msg.text}`;
            logMessage.appendChild(p);
        });
    }

    socket.on('notification', ({ messages }) => {
        updateLogMessages(messages);
    })

    socket.on('new-client', () => {
        Swal.fire({
            text:'Nuevo usuario conectado',
            toast: true,
            position: 'top-right'
        })
    })

    Swal.fire({
        title: '¡Bienvenid@!',
        input: 'text',
        inputLabel: 'Por favor ingresa tu username para acceder al chat',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Olvidaste de colocar tu username';
            }
        }
    })
    .then((result) => {
        username = result.value.trim();
        console.log(`¡Hola ${username}! 👋`);
    })
})();

console.log('Hola desde el chat.js');