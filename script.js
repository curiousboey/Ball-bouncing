document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const box = document.querySelector(".box");
    const hitSound = document.getElementById("hitSound");

    let posX = 6;
    let posY = 0;
    let speedX = 7;
    let speedY = 5;

    function updateBallPosition() {
        posX += speedX;
        posY += speedY;

        if (posX < 0 || posX > box.clientWidth - ball.clientWidth) {
            speedX = -speedX;
            playHitSound();
        }

        if (posY < 0 || posY > box.clientHeight - ball.clientHeight) {
            speedY = -speedY;
            playHitSound();
        }

        ball.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    function playHitSound() {
        hitSound.currentTime = 0;
        hitSound.play();
    }

    function animate() {
        updateBallPosition();
        requestAnimationFrame(animate);
    }

    animate();
});
