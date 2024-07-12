document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sakura-container');
    const totalPetals = 100;

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('sakura');
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.4;
        petal.style.transform = `scale(${Math.random() * 0.4 + 0.6})`;
        container.appendChild(petal);

        petal.addEventListener('animationiteration', () => {
            petal.style.left = `${Math.random() * 100}%`;
        });
    }

    for (let i = 0; i < totalPetals; i++) {
        createPetal();
    }
});
