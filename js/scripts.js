// DOMの読み込みが完了したら初期化関数を実行
document.addEventListener('DOMContentLoaded', () => {
    initializeSakura();
    initializeBGM();
    initializeTypewriter();
    initializeClock();
});

// 桜の花びらアニメーションを初期化する関数
function initializeSakura() {
    const container = document.getElementById('sakura-container');
    const totalPetals = 100;

    // 個々の花びらを作成する関数
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('sakura');
        // 花びらの初期位置、アニメーション時間、遅延、透明度、サイズをランダムに設定
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.4;
        petal.style.transform = `scale(${Math.random() * 0.4 + 0.6})`;
        container.appendChild(petal);

        // アニメーションが1周するごとに花びらの位置をリセット
        petal.addEventListener('animationiteration', () => {
            petal.style.left = `${Math.random() * 100}%`;
        });
    }

    // 指定された数の花びらを作成
    for (let i = 0; i < totalPetals; i++) {
        createPetal();
    }
}

// BGMの状態を管理するグローバル変数
let bgm, isPlaying = false;

// BGM制御を初期化する関数
function initializeBGM() {
    bgm = document.getElementById('bgm');
    const bgmControl = document.getElementById('bgm-control');

    // BGMボタンのテキストを更新する関数
    function updateBgmButtonText() {
        bgmControl.textContent = isPlaying ? 'BGM 停止' : 'BGM 再生';
    }

    // BGMの再生/停止を切り替える関数
    function toggleBGM() {
        if (bgm.paused) {
            bgm.play().catch(e => console.log("再生が許可されていません:", e));
        } else {
            bgm.pause();
        }
        isPlaying = !bgm.paused;
        updateBgmButtonText();
    }

    // BGMボタンのクリックイベントリスナーを設定
    bgmControl.addEventListener('click', toggleBGM);

    // BGMの再生/停止イベントリスナー
    bgm.addEventListener('play', () => {
        isPlaying = true;
        updateBgmButtonText();
    });

    bgm.addEventListener('pause', () => {
        isPlaying = false;
        updateBgmButtonText();
    });

    // BGMの自動再生を試みる
    bgm.play().then(() => {
        isPlaying = true;
        updateBgmButtonText();
    }).catch(e => {
        console.log("自動再生が許可されていません:", e);
        isPlaying = false;
        updateBgmButtonText();
    });

    // ページの可視性変更イベントリスナーを設定
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

// ページの可視性変更時にBGMを制御する関数
function handleVisibilityChange() {
    if (document.hidden) {
        if (isPlaying) bgm.pause();
    } else {
        if (isPlaying) bgm.play().catch(e => console.log("再生が許可されていません:", e));
    }
}

// タイプライター効果を初期化する関数
function initializeTypewriter() {
    const textContent = document.getElementById('textContent').innerHTML;
    const verticalText = document.getElementById('verticalText');
    let index = 0;

    // 1文字ずつテキストを表示する関数
    function typeWriter() {
        if (index < textContent.length) {
            if (textContent.substr(index, 8) === '<strong>') {
                verticalText.innerHTML += '<strong>';
                index += 8;
            } else if (textContent.substr(index, 9) === '</strong>') {
                verticalText.innerHTML += '</strong>';
                index += 9;
            } else if (textContent.substr(index, 4) === '<br>') {
                verticalText.innerHTML += '<br>';
                index += 4;
            } else {
                // 通常の文字を処理
                const currentChar = textContent.charAt(index);
                if (currentChar !== '>' && currentChar !== '<') {
                    const span = document.createElement('span');
                    span.textContent = currentChar;
                    span.style.animationDelay = `${index * 0.03}s`;
                    verticalText.appendChild(span);
                }
                index++;
            }
             // 次の文字の処理をスケジュール
            requestAnimationFrame(typeWriter);
        }
    }

    // タイプライター効果の開始
    typeWriter();
}

// 時計機能を初期化する関数
function initializeClock() {
    updateClock();
    // 1秒ごとに時計を更新
    setInterval(updateClock, 1000);
}

// 時計を更新する関数
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 時計の文字列を生成し、HTMLに反映
    const timeString = `${hours}:${minutes}:<span class="small-seconds">${seconds}</span>`;
    document.getElementById('clock').innerHTML = timeString;
}



