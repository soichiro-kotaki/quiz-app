import { q_data } from "../modules/data";
import { soundBtn, soundFalse, soundResult, soundToStart, soundTrue,} from "../modules/sound";
import '../stylesheets/style.scss';

//共通部分

//ブラウザバックを既存のurlのループで防止（Chromeは、ページ遷移後、一度画面内をクリックしない限り、ブラウザバックができる仕様になっている。その他のブラウザでは、正常に動作する。）
history.pushState(null, null, location.href);
window.addEventListener("popstate",  () => {
    history.go(1);
});

//初めてページを読み込んだときにボタンイベントを発火させる
window.addEventListener('load', () => {
    const PageHandler = document.getElementById('title');
    if (PageHandler) {
        soundBtn();
    } else {
        return;
    };
});

//index.html
if (document.URL.match(/index/)) {
    soundBtn();
};

//content.html
if (document.URL.match(/content/)) {
    //各問題の問題文と選択肢、答えの定義と個数、それぞれのDOM要素取得。クイズの番号と正答数のカウンターの定義（繰り返し処理用のカウンターは構文の直前に定義）
    const $qText = document.getElementById('q-text')! as HTMLElement;
    const $correctOrNot = document.getElementById('correct-show-area')! as HTMLElement;
    const $button = document.querySelectorAll('button')! as NodeListOf<HTMLButtonElement>;
    const buttonLength = q_data[0].choices.length;
    const quizLength = q_data.length;
    let quizIndex = 0;
    let correctanswer = q_data[0].answer;
    let score = 0;

    //問題文のフェードインと書き換え。
    const quizShow = (): void =>{
        $qText.animate([{opacity:0}, {opacity:1}], 1000);
        $qText.textContent = q_data[quizIndex].question;
    };

    //選択肢を画面表示の更新。
    const showChoices = (): void => {
        let buttonIndex = 0;
        while (buttonIndex < buttonLength) {
            $button.forEach( (btn: HTMLButtonElement) => {
                btn.animate([{opacity:0}, {opacity:1}], 1000)
            });
            $button[buttonIndex].textContent = q_data[quizIndex].choices[buttonIndex];
            buttonIndex++;
        };
    };
    //一問目の問題文と選択肢を表示
    quizShow();
    showChoices();

    //選択肢をクリックした時のメソッド
    const clickHandler = (e): void => {
        //正解か不正解かを判断、画面に正誤結果を表示。
        if (correctanswer === e.target.textContent) {
            $correctOrNot.classList.add('result-true');
            $correctOrNot.textContent = '正解！';
            $correctOrNot.style.visibility = 'visible';
            soundTrue();
            //正答数をプラス
            score++;
        } else {
            $correctOrNot.classList.add('result-false');
            $correctOrNot.textContent = '不正解！';
            $correctOrNot.style.visibility = 'visible';
            soundFalse();
        };
        //クイズの番号を進める。
        quizIndex++;

        //全問答え終わったかどうかを確認。答え終わっていなければ、次の問題へ。答え終わっていた場合は、結果発表欄とクイズ表示欄を入れ替える。
        if (quizIndex < quizLength) {
            //次の問題の解答へ更新
            correctanswer = q_data[quizIndex].answer;
            //表示していた正誤結果を非表示にし、選択肢を押せるようにする
            setTimeout( () => {
                $correctOrNot.style.visibility = 'hidden';
            }, 1300);
            setTimeout( () => {
                $button.forEach( (btn: HTMLButtonElement) => {
                btn.disabled = false;
                });
                //次の問題文と選択肢を表示
                quizShow();
                showChoices();
                $correctOrNot.classList.remove('result-false');
                $correctOrNot.classList.remove('result-true');
                const $activeButton = document.activeElement as HTMLElement;
                $activeButton.blur();
            }, 1500)
        } else {
            setTimeout( () => {
                soundToStart();
                //問題文と選択肢を非表示、結果発表用のボックスを表示するためのクラスをそれぞれに追加。
                document.getElementById('result-content').classList.add('open');
                document.getElementById('main-content').classList.add('close');
                const $resultBtn = document.getElementById('resultbtn')! as HTMLButtonElement;
                $resultBtn.disabled = false;
                const $resultShowArea = document.getElementById('result-show-area')! as HTMLDivElement;
                $resultBtn.addEventListener('click', () => {
                    soundResult();
                    $resultBtn.disabled = true;
                    //正答数によってランクを変えて表示する。
                    setTimeout(() => {
                        if (score === 8) {
                        $resultShowArea.innerHTML = `８ / ${score}問正解！（Sランク）<br>遊んでくれてありがとう٩( ᐛ )و`
                        } else if (score >= 6) {
                        $resultShowArea.innerHTML = `８ / ${score}問正解！（Aランク）<br>遊んでくれてありがとう٩( ᐛ )و`
                        } else if (score >= 4) {
                        $resultShowArea.innerHTML = `８ / ${score}問正解！（Bランク）<br>遊んでくれてありがとう٩( ᐛ )و`
                        } else if (score >= 2) {
                        $resultShowArea.innerHTML = `８ / ${score}問正解！（Cランク）<br>遊んでくれてありがとう٩( ᐛ )و`
                        } else {
                        $resultShowArea.innerHTML = `８ / ${score}問正解！（Dランク）<br>遊んでくれてありがとう٩( ᐛ )و`
                        };
                    }, 2000);
                });
            }, 2000);
        };
    };

  //各問題の選択肢をクリックした時に正誤判定ようのメソッドを実行させ、選択肢を押せないようにする。
    let handlerIndex = 0;
    while (handlerIndex < buttonLength) {
        $button[handlerIndex].addEventListener('click', (e) => {
            clickHandler(e);
            $button.forEach( (btn: HTMLButtonElement) => {
                btn.disabled = true;
            });
        });
        handlerIndex++;
    };
};
