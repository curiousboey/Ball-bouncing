let animationId; // Declare animationId outside the event listener

document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const box = document.querySelector(".box");
    const hitSound = document.getElementById("hitSound");
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    const restartButton = document.getElementById("restartButton");

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
        animationId = requestAnimationFrame(animate);
    }

    function toggleAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = undefined;
            pauseResumeButton.innerText = "Resume";
        } else {
            animate();
            pauseResumeButton.innerText = "Pause";
        }
    }

    function restart() {
        posX = 6;
        posY = 0;
        speedX = 7;
        speedY = 5;
        ball.style.transform = `translate(${posX}px, ${posY}px)`;
        if (animationId === undefined) {
            animate();
        }
        pauseResumeButton.innerText = "Pause";
    }

    pauseResumeButton.addEventListener("click", toggleAnimation);
    restartButton.addEventListener("click", restart);

    // Initial animation
    animate();
});
