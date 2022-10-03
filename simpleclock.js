const timeDiv = document.getElementById('time');

function pad(num, size) {
    return String(num).padStart(size, '0')
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen(element) {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.msExitFullscreen) {      // for IE11 (remove June 15, 2022)
        document.msExitFullscreen();
    } else if(document.webkitExitFullscreen) {  // iOS Safari
        document.webkitExitFullscreen();
    }
}

function isFullscreen() {
    return (!window.screenTop && !window.screenY);
}

setInterval(() => {
    const now = new Date();
    timeDiv.textContent = `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:${pad(now.getSeconds(), 2)}`;
}, 200);

AColorPicker.from('.picker')
    .on('change', (picker, color) => {
        window.savedColors[$(picker.element).parent().data('element')] = color;
        updateColors();
        saveColors();
    });

$('.ui.modal').modal();

$('#btn-settings').on('click', () => {
    $('#modal-settings').modal('show');
});


$('#btn-fullscreen').on('click', () => {
    if (!isFullscreen()) {
        enterFullscreen(document.documentElement);
    } else {
        exitFullscreen(document.documentElement);
    }
});

try {
    window.savedColors = JSON.parse(localStorage.getItem('simpleclock-colors'));
} finally {
    if (window.savedColors == null) {
        window.savedColors = {
            text: '#f00',
            background: '#000',
        };
    }
}

function updateColors() {
    $('#time').css('color', window.savedColors.text);
    $('body').css('background', window.savedColors.background);
}

function saveColors() {
    localStorage.setItem('simpleclock-colors', JSON.stringify(window.savedColors));
}

updateColors();
