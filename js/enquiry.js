document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach((group, index) => {
        group.style.setProperty('--i', index + 1);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        form.style.transition = 'opacity 0.5s, transform 0.5s';
        form.style.opacity = '0';
        form.style.transform = 'scale(0.9)';

        setTimeout(() => {
            alert('お問い合わせありがとうございます。メッセージが送信されました。');
            form.reset();
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 500);
    });

    // 雪アニメーション
    const sakuraContainer = document.getElementById('snow-container');
    const sakuraCount = 50;

    function createSakura() {
        const sakura = document.createElement('div');
        sakura.className = 'snow';
        sakura.style.left = `${Math.random() * 100}%`;
        sakura.style.width = `${Math.random() * 10 + 5}px`;
        sakura.style.height = sakura.style.width;
        sakura.style.animationDuration = `${Math.random() * 5 + 5}s`;
        sakura.style.animationDelay = `${Math.random() * 5}s`;
        sakuraContainer.appendChild(sakura);

        sakura.addEventListener('animationend', () => {
            sakura.remove();
            createSakura();
        });
    }

    for (let i = 0; i < sakuraCount; i++) {
        createSakura();
    }

    // 雪だるまのアニメーション
    function animateSnowman() {
        const parts = [
            { selector: '.snowball.bottom', finalScale: 1 },
            { selector: '.snowball.middle', finalScale: 1 },
            { selector: '.snowball.top', finalScale: 1 },
            { selector: '.eye.left', finalScale: 1 },
            { selector: '.eye.right', finalScale: 1 },
            { selector: '.carrot', finalScale: 1 },
            { selector: '.arm.left', finalScale: 1 },
            { selector: '.arm.right', finalScale: 1 }
        ];

        let delay = 0;
        parts.forEach((part, index) => {
            const element = document.querySelector(part.selector);
            element.style.transform = 'scale(0)';
            element.style.opacity = '0';

            setTimeout(() => {
                element.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
                element.style.transform = `scale(${part.finalScale})`;
                element.style.opacity = '1';
            }, delay);

            delay += (index < 3) ? 2000 : 500; // 雪玉は2秒間隔、他のパーツは0.5秒間隔
        });
    }

    // 地面の雪が積もるアニメーション
    function animateGroundSnow() {
        const groundSnow = document.getElementById('ground-snow');
        let snowHeight = 0;
        const maxSnowHeight = 50; // 最大の雪の高さ（ピクセル）
        const snowIncrement = 5; // 一度に増える雪の高さ（ピクセル）
        const snowInterval = 1000; // 雪が増える間隔（ミリ秒）

        function addSnow() {
            if (snowHeight < maxSnowHeight) {
                snowHeight += snowIncrement;
                groundSnow.style.height = `${snowHeight}px`;
                setTimeout(addSnow, snowInterval);
            }
        }

        setTimeout(addSnow, snowInterval);
    }

    // ページ読み込み完了後にアニメーションを開始
    window.addEventListener('load', () => {
        setTimeout(() => {
            animateSnowman();
            animateGroundSnow();
        }, 1000); // 1秒後にアニメーション開始
    });
});
