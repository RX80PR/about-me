// ページがスクロールされたときに呼び出される関数
function checkScroll() {
    const sections = document.querySelectorAll('.section'); // すべてのセクションを取得
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top; // セクションの上端位置を取得
        const windowHeight = window.innerHeight; // ウィンドウの高さを取得
        if (sectionTop < windowHeight * 0.75) { // セクションがウィンドウの75%内に入った場合
            section.classList.add('visible'); // セクションに「visible」クラスを追加
            const fadeElements = section.querySelectorAll('.fade-in'); // セクション内のフェードイン要素を取得
            fadeElements.forEach(el => el.classList.add('visible')); // フェードイン要素にも「visible」クラスを追加
            const typingElement = section.querySelector('.typing'); // タイピングエフェクト要素を取得
            if (typingElement) {
                // タイピングアニメーションを適用
                typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
            }
        }
    });
}

// ページのスクロールイベントとロードイベントにリスナーを追加
window.addEventListener('scroll', checkScroll); // スクロール時にcheckScroll関数を呼び出す
window.addEventListener('load', () => {
    checkScroll(); // ページ読み込み時に一度checkScrollを実行
});

