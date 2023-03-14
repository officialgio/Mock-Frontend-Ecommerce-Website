// Tl's for transitions
const tlLeave = gsap.timeline({
    defaults: {
        duration: 0.75,
        ease: 'Power2.easeOut'
    }
});

const tlEnter = gsap.timeline({
    defaults: {
        duration: 0.75,
        ease: 'Power2.easeOut'
    }
});

// Functions for leave and enter animations
/**
 * Once leave the animation have the current arrow fade out and go downwards vertically
 * Have the product image do the same thing
 * Then, have the text fade out and go downwards vertically
 * @param {current} current 
 * @param {done} done 
 * @returns 
 */
const leaveAnimation = (current, done) => {
    const product = current.querySelector('.image__container');
    const text = current.querySelector('.showcase__text');
    const circles = current.querySelectorAll('.circle');
    const arrow = current.querySelector('.showcase-arrow');
    return (
        tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
        tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, '<'),
        tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: 100, onComplete: done }, '<'),
        tlLeave.fromTo(circles, { y: 0, opacity: 1 }, { y: -200, opacity: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 }, '<')
    )
}

// Function for enter animations
/**
 * Enter animation is the reverse of leave animation
 * Ensure to change the background color gradient depending on the switch case
 * @param {current} current 
 * @param {done} done 
 * @returns 
 */
const enterAnimation = (current, done, gradient) => {
    const product = current.querySelector('.image__container');
    const text = current.querySelector('.showcase__text');
    const circles = current.querySelectorAll('.circle');
    const arrow = current.querySelector('.showcase-arrow');
    return (
        tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
        tlEnter.to('body', { background: gradient }, '<'),
        tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, '<'),
        tlEnter.fromTo(text, { y: 100, opacity: 0 }, { opacity: 1, y: 0, onComplete: done }, '<'),
        tlEnter.fromTo(circles, { y: -200, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 }, '<')
    )
}

// Transition
barba.init({
    preventRunning: true, // prevent clicking multiple times bug fix
    transitions: [
        {
            once(data) { // refresh the page
                const done = this.async();
                let next = data.next.container;
                let gradient = getGradient(data.next.namespace);
                gsap.set('body', { background: gradient });
                enterAnimation(next, done, gradient);
            },
            leave(data) {
                const done = this.async();
                let current = data.current.container;
                leaveAnimation(current, done);
            }, 
            enter(data) {
                const done = this.async();
                let next = data.next.container;
                let gradient = getGradient(data.next.namespace);
                enterAnimation(next, done, gradient);
            },
        },
    ],
});

// Change Color Gradient
function getGradient(name) {
    switch (name) {
        case 'handbag':
            return 'linear-gradient(260deg, #b75d62, #754d4f)';
        case 'boot':
            return 'linear-gradient(260deg, #5d8cb7, #4c4f70)';
        case 'hat': 
            return 'linear-gradient(260deg, #b27a5c, #7f5450'
    }
}