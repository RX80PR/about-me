function checkScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
            const fadeElements = section.querySelectorAll('.fade-in');
            fadeElements.forEach(el => el.classList.add('visible'));
            const typingElement = section.querySelector('.typing');
            if (typingElement) {
                typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
            }
        }
    });
}

function createCherryBlossom() {
    const cherryBlossom = document.createElement('div');
    cherryBlossom.classList.add('cherry-blossom');
    
    const size = Math.random() * 10 + 5;
    cherryBlossom.style.width = `${size}px`;
    cherryBlossom.style.height = `${size}px`;
    
    cherryBlossom.style.left = `${Math.random() * 100}vw`;
    cherryBlossom.style.animationDuration = `${Math.random() * 5 + 5}s`;
    
    document.querySelector('.cherry-blossom-container').appendChild(cherryBlossom);
    
    setTimeout(() => {
        cherryBlossom.remove();
    }, 10000);
}

function startCherryBlossomAnimation() {
    setInterval(createCherryBlossom, 300);
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', () => {
    checkScroll();
    startCherryBlossomAnimation();
});
