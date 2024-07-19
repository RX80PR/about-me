// DOMが読み込まれた後に実行される初期化関数
document.addEventListener('DOMContentLoaded', () => {
    initializeImageContainers();
    initializeBgmControl();
    initializeTopButton();
    createNightSky();
    createStarBackground();
    initializeTypewriter();
    initializeScrollEffects();
});

// 画像コンテナの初期化と自動切り替え機能
function initializeImageContainers() {
    const containers = document.querySelectorAll('.container');
    containers.forEach((container, containerIndex) => {
        const images = container.querySelectorAll('.image-container img');
        let currentIndex = 0;
        let autoChangeInterval;
        
        // アクティブな画像を更新する関数
        function updateActiveImage() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
        }
        
        // 画像を自動で切り替える関数
        function autoChangeImage() {
            currentIndex = (currentIndex + 1) % images.length;
            updateActiveImage();
        }

        // 自動切り替えを開始する関数
        function startAutoChange() {
            autoChangeInterval = setInterval(autoChangeImage, 5000 + containerIndex * 1000);
        }

        // 初期状態の設定と自動切り替えの開始
        updateActiveImage();
        startAutoChange();

        // 最初の画像をアクティブにする
        const firstImage = container.querySelector('.image-container img');
        if (firstImage) {
            firstImage.classList.add('active');
        }
    });
}

// BGM制御機能の初期化
function initializeBgmControl() {
    const bgm = document.getElementById('bgm');
    const bgmControl = document.getElementById('bgm-control');
    let isPlaying = false;

    // BGMボタンのテキストを更新する関数
    function updateBgmButtonText() {
        bgmControl.textContent = isPlaying ? 'BGM 停止' : 'BGM 再生';
    }

    // BGMの再生/停止を切り替える関数
    function toggleBgm() {
        if (isPlaying) {
            bgm.pause();
        } else {
            bgm.play().catch(e => console.log("再生が許可されていません:", e));
        }
        isPlaying = !isPlaying;
        updateBgmButtonText();
    }

    // BGMボタンのクリックイベントリスナー
    bgmControl.addEventListener('click', toggleBgm);

    // BGMの再生/停止イベントリスナー
    bgm.addEventListener('play', () => {
        isPlaying = true;
        updateBgmButtonText();
    });

    bgm.addEventListener('pause', () => {
        isPlaying = true;
        updateBgmButtonText();
    });

    // BGMの自動再生試行
    bgm.play().then(() => {
        isPlaying = true;
        updateBgmButtonText();
    }).catch(e => {
        console.log("自動再生が許可されていません:", e);
        isPlaying = false;
        updateBgmButtonText();
    });

    // ページの可視性変更時のBGM制御
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (isPlaying) bgm.pause();
        } else {
            if (isPlaying) bgm.play().catch(e => console.log("再生が許可されていません:", e));
        }
    });
}

// トップページへ戻るボタンの初期化
function initializeTopButton() {
    const topButton = document.getElementById('top-button');
    topButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// 夜空の背景を作成
function createNightSky() {
    // 夜空の要素を作成
    const nightSky = document.createElement('div');
    nightSky.classList.add('night-sky');
    document.body.appendChild(nightSky);

    // 星を生成
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        createStar(nightSky);
    }
}

// 星を作成する関数
function createStar(container) {
    // 星の要素を作成し、スタイルを設定
    const star = document.createElement('div');
    star.classList.add('star');
    
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(star);
}

// テキストコンテンツの背景に星を作成
function createStarBackground() {
    // 星の背景要素を作成
    const textContent = document.querySelector('.text-content');
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    textContent.appendChild(starBackground);

    // 星を生成
    const starCount = 50;
    const stars = [];

    // 星の生成コード
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        star.classList.add(Math.random() > 0.5 ? 'star-blue' : 'star-red');
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.opacity = '0';
        starBackground.appendChild(star);
        stars.push(star);
    }

    // 星のアニメーション関数
    function animateStars() {
        stars.forEach(star => {
            if (Math.random() < 0.01) {
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.opacity = '1';
                setTimeout(() => {
                    star.style.opacity = '0';
                }, Math.random() * 500 + 100);
            }
        });
        requestAnimationFrame(animateStars);
        setTimeout(animateStars, 10000000);
    }

    // アニメーションの開始
    animateStars();
}

// スクロール効果の初期化
function initializeScrollEffects() {
    document.addEventListener('scroll', () => {
        // スクロール位置に基づいてコンテナの可視性を制御
        const containers = document.querySelectorAll('.container');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        containers.forEach((container, index) => {
            if (index === 0) return;

            const containerTop = container.offsetTop;
            if (scrollPosition > containerTop - windowHeight / 2) {
                container.classList.add('visible');
            } else {
                container.classList.remove('visible');
            }
        });
    });
}

// タイプライター効果の初期化
function initializeTypewriter() {
    const textContent = document.getElementById('textContent').innerHTML;
    const verticalText = document.getElementById('verticalText');
    let index = 0;

    // 文字を1つずつ表示する関数
    function typeWriter() {
        // HTMLタグを処理しながら文字を1つずつ表示
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
                const currentChar = textContent.charAt(index);
                if (currentChar !== '>' && currentChar !== '<') {
                    const span = document.createElement('span');
                    span.textContent = currentChar;
                    span.style.animationDelay = `${index * 0.02}s`;
                    verticalText.appendChild(span);
                }
                index++;
            }
            requestAnimationFrame(typeWriter);
        }
    }

     // タイプライター効果の開始
    typeWriter();
}