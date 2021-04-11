interface KeyToSound { [keyCode: string]: HTMLAudioElement }

const channel1Play: any[] = [];
const channel2Play: any[] = [];
const channel3Play: any[] = [];
const channel4Play: any[] = [];

let recordChanel1: boolean;
let recordChanel2: boolean;
let recordChanel3: boolean;
let recordChanel4: boolean;

let playChanel1: boolean;
let playChanel2: boolean;
let playChanel3: boolean;
let playChanel4: boolean;

let mappedSounds: KeyToSound;

appStart();

function appStart(): void {
    document.addEventListener('keypress', onKeyPress);
    document.querySelector('#stop-all').addEventListener('click', stopRecording);
    document.querySelector('#play-selected').addEventListener('click', playSelected);

    setListernersForChanels();
    mapAudioTags();
}

function mapAudioTags() {
    mappedSounds = {
        'q': document.querySelector('[data-sound="clap"]'),
        'w': document.querySelector('[data-sound="kick"]'),
        'e': document.querySelector('[data-sound="ride"]'),
        'r': document.querySelector('[data-sound="tom"]'),
        'a': document.querySelector('[data-sound="boom"]'),
        's': document.querySelector('[data-sound="hihat"]'),
        'd': document.querySelector('[data-sound="openhat"]'),
        'f': document.querySelector('[data-sound="snare"]'),
    }
}

function onKeyPress(ev: KeyboardEvent): void {
    const key = ev.key;
    const time = ev.timeStamp;

    recrodToChanels(key, time);

    playSound(mappedSounds[key]);
}

function playSound(sound: HTMLAudioElement): void {
    if (sound === undefined) return;

    sound.currentTime = 0;
    sound.play();
}

function setListernersForChanels(): void {

    document.querySelector('#select-chanel-1').addEventListener('change', () => {
        playChanel1 = !playChanel1;
    });
    document.querySelector('#select-chanel-2').addEventListener('change', () => {
        playChanel2 = !playChanel2;
    });
    document.querySelector('#select-chanel-3').addEventListener('change', () => {
        playChanel3 = !playChanel3;
    });
    document.querySelector('#select-chanel-4').addEventListener('change', () => {
        playChanel4 = !playChanel4;
    });

    document.querySelector('#record-chanel-1').addEventListener('click', () => {
        recordChanel1 = !recordChanel1;
    });
    document.querySelector('#record-chanel-2').addEventListener('click', () => {
        recordChanel2 = !recordChanel2;
    });
    document.querySelector('#record-chanel-3').addEventListener('click', () => {
        recordChanel3 = !recordChanel3;
    });
    document.querySelector('#record-chanel-4').addEventListener('click', () => {
        recordChanel4 = !recordChanel4;
    });

    document.querySelector('#play-chanel-1').addEventListener('click', () => {
        channel1Play.forEach(sound => {
            setTimeout(() => playSound(mappedSounds[sound.key]), sound.time);
        });
    });
    document.querySelector('#play-chanel-2').addEventListener('click', () => {
        channel2Play.forEach(sound => {
            setTimeout(() => playSound(mappedSounds[sound.key]), sound.time);
        });
    });
    document.querySelector('#play-chanel-3').addEventListener('click', () => {
        channel3Play.forEach(sound => {
            setTimeout(() => playSound(mappedSounds[sound.key]), sound.time);
        });
    });document.querySelector('#play-chanel-4').addEventListener('click', () => {
        channel4Play.forEach(sound => {
            setTimeout(() => playSound(mappedSounds[sound.key]), sound.time);
        });
    });
}

function recrodToChanels(key: string, time: number): void {
    if (recordChanel1) channel1Play.push({ key, time });
    if (recordChanel2) channel2Play.push({ key, time });
    if (recordChanel3) channel3Play.push({ key, time });
    if (recordChanel4) channel4Play.push({ key, time });
}

function stopRecording(): void {
    recordChanel1 = false;
    recordChanel2 = false;
    recordChanel3 = false;
    recordChanel4 = false;
}

function playSelected(): void {
    let playArray : any[] = [];

    if(playChanel1) playArray = playArray.concat(channel1Play);
    if(playChanel2) playArray = playArray.concat(channel2Play);
    if(playChanel3) playArray = playArray.concat(channel3Play);
    if(playChanel4) playArray = playArray.concat(channel4Play);

    playArray.forEach(sound => {
        setTimeout(() => playSound(mappedSounds[sound.key]), sound.time);
    });
}