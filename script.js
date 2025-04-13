// Initialize elements
const el = {
    l: document.getElementById('l'),
    o: document.getElementById('o'),
    v: document.getElementById('v'),
    e: document.getElementById('e'),
    blop: new mojs.Burst({
        radius: { 0: 100 },
        count: 20,
        children: {
            shape: 'circle',
            fill: ['#ff4757', '#2ed573', '#1e90ff', '#ffa502'],
            radius: { 10: 0 },
            duration: 1000
        }
    })
};

const ctrlOverl = () => {
    const move = 1000;
    const boom = 200;
    const easing = "sin.inOut";
    const easingBoom = "sin.in";
    const easingOut = "sin.out";
    const opts = { duration: move, easing, opacity: 1 };
    const delta = 150;

    return new mojs.Timeline().add([
        new mojs.Tween({
            duration: move,
            onComplete: () => {
                [el.l, el.o, el.v, el.e].forEach((el) => (el.style.opacity = 0));
                el.blop.play();
            }
        }),
        // Animation for letter L
        new mojs.Html({
            el: el.l,
            x: { [-100]: 0 },
            ...opts
        }).then({
            opacity: 0,
            duration: boom,
            easing: easingOut
        }),
        // Animation for letter O
        new mojs.Html({
            el: el.o,
            x: { [100]: 0 },
            delay: delta,
            ...opts
        }).then({
            opacity: 0,
            duration: boom,
            easing: easingOut
        }),
        // Animation for letter V
        new mojs.Html({
            el: el.v,
            y: { [-100]: 0 },
            delay: delta * 2,
            ...opts
        }).then({
            opacity: 0,
            duration: boom,
            easing: easingOut
        }),
        // Animation for letter E
        new mojs.Html({
            el: el.e,
            y: { [100]: 0 },
            delay: delta * 3,
            ...opts
        }).then({
            opacity: 0,
            duration: boom,
            easing: easingOut
        })
    ]);
};

// Start the animation when the page loads
window.addEventListener('load', () => {
    const timeline = ctrlOverl();
    timeline.play();
    
    // Add click event to replay animation
    document.body.addEventListener('click', () => {
        [el.l, el.o, el.v, el.e].forEach(el => el.style.opacity = 0);
        timeline.replay();
    });
});