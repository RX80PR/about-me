document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach((group, index) => {
        group.style.setProperty('--i', index + 1);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームの送信アニメーション
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
});