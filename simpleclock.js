const timeDiv = document.getElementById('time');

function pad(num, size) {
    return String(num).padStart(size, '0')
}

setInterval(() => {
    const now = new Date();
    timeDiv.textContent = `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:${pad(now.getSeconds(), 2)}`;
}, 200);
