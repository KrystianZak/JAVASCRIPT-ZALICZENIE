const sounds = {
    'a': document.querySelector('#a'),
    's': document.querySelector('#s'),
    'd': document.querySelector('#d'),
    'f': document.querySelector('#f'),
    'g': document.querySelector('#g'),
    'h': document.querySelector('#h'),
    'j': document.querySelector('#j'),
    'k': document.querySelector('#k'),
    'l': document.querySelector('#l')
};

let isRecording = [false, false, false, false];
let channels = [[], [], [], []];
let startTime = [0, 0, 0, 0];

function playSound(key) {
    const audio = sounds[key];
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function recordSound(channelIndex, key) {
    if (isRecording[channelIndex]) {
        const time = Date.now() - startTime[channelIndex];
        channels[channelIndex].push({ key, time });
    }
}

function playChannel(channel) {
    channel.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time);
    });
}

document.addEventListener('keydown', event => {
    playSound(event.key);
    for (let i = 0; i < isRecording.length; i++) {
        recordSound(i, event.key);
    }
});

document.getElementById('record1').addEventListener('click', () => {
    isRecording[0] = !isRecording[0];
    startTime[0] = Date.now();
});
document.getElementById('play1').addEventListener('click', () => playChannel(channels[0]));

document.getElementById('record2').addEventListener('click', () => {
    isRecording[1] = !isRecording[1];
    startTime[1] = Date.now();
});
document.getElementById('play2').addEventListener('click', () => playChannel(channels[1]));

document.getElementById('record3').addEventListener('click', () => {
    isRecording[2] = !isRecording[2];
    startTime[2] = Date.now();
});
document.getElementById('play3').addEventListener('click', () => playChannel(channels[2]));

document.getElementById('record4').addEventListener('click', () => {
    isRecording[3] = !isRecording[3];
    startTime[3] = Date.now();
});
document.getElementById('play4').addEventListener('click', () => playChannel(channels[3]));

document.getElementById('playAll').addEventListener('click', () => {
    for (let i = 0; i < channels.length; i++) {
        playChannel(channels[i]);
    }
});
