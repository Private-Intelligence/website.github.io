const cursor = document.querySelector('.cursor');
const follow = document.querySelector('.cursor-follow');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function animate() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follow.style.left = fx + 'px';
    follow.style.top = fy + 'px';
    requestAnimationFrame(animate);
})();

document.querySelectorAll('a, .project').forEach(el => {
    el.addEventListener('mouseenter', () => follow.style.transform = 'translate(-50%,-50%) scale(1.5)');
    el.addEventListener('mouseleave', () => follow.style.transform = 'translate(-50%,-50%) scale(1)');
});
