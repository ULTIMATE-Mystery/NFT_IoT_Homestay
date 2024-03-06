import io from 'socket.io-client';

const url = process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:8000';

const socket = io(url, {
    extraHeaders: {
        'ngrok-skip-browser-warning': '69420',
    },
});

export default socket;
