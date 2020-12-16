//スタートボタンクリック時の効果音
let soundStartBtn = new Audio("https://otologic.jp/sounds/se/pre/Onmtp-Click03-1.mp3");
export const soundBtn = () => {
    const $startBtn = document.getElementById('startbtn')! as HTMLAnchorElement;
    $startBtn.addEventListener('click', () => {
        setTimeout(() => {
            location.replace('content.html');
        }, 1000);
        soundStartBtn.currentTime = 0;
        soundStartBtn.volume = 0.2;
        soundStartBtn.play();
    });
};

//正解時の効果音
let correctSound = new Audio("https://otologic.jp/sounds/se/pre/Quiz-Correct_Answer02-2.mp3");
export const soundTrue = () => {
    correctSound.currentTime = 0;
    correctSound.volume = 0.05;
    correctSound.play();
};

//不正解時の効果音
let falseSound = new Audio("https://otologic.jp/sounds/se/pre/Quiz-Wrong_Buzzer01-1.mp3");
export const soundFalse = () => {
    falseSound.currentTime = 0;
    falseSound.volume = 0.05;
    falseSound.play();
};

//結果表示時の効果音
let resulMusic = new Audio("https://otologic.jp/sounds/se/pre/Quiz-Results01-1.mp3");
export const soundResult = () => {
    resulMusic.currentTime = 0;
    resulMusic.volume = 0.1;
    resulMusic.play();
};

//スタート画面に戻るボタンの効果音
let toStartBtn  = new Audio("https://otologic.jp/sounds/se/pre/Onmtp-Click02-1.mp3");
export const soundToStart = () => {
    const $toStartBtn = document.getElementById('tostart') as HTMLAnchorElement;
    $toStartBtn.addEventListener('click', () => {
        setTimeout(() => {
            location.replace('index.html');
        }, 1000);
        toStartBtn.currentTime = 0;
        toStartBtn.volume = 0.2;
        toStartBtn.play();
    });
};


