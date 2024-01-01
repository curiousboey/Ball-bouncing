document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector(".box");
    const hitSound = document.getElementById("hitSound");
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    const restartButton = document.getElementById("restartButton");
    const addBallButton = document.getElementById("addBallButton");
    const speedUpButton = document.getElementById("speedUpButton");
    const slowDownButton = document.getElementById("slowDownButton");

    let animationId;
    let balls = [];
    let ballSpeed = { x: 7, y: 5 };

    function createBall() {
        const newBall = document.createElement("div");
        newBall.classList.add("ball");
        box.appendChild(newBall);

        // Set background image for the newly created ball
        newBall.style.backgroundImage = "url('football-texture.jpg')";

        balls.push({ element: newBall, posX: 9, posY: 0, speed: { x: ballSpeed.x, y: ballSpeed.y } });
    }

    function updateBallPosition(ball) {
        ball.posX += ball.speed.x;
        ball.posY += ball.speed.y;

        if (ball.posX < 0 || ball.posX > box.clientWidth - ball.element.clientWidth) {
            ball.speed.x = -ball.speed.x;
            playHitSound();
        }

        if (ball.posY < 0 || ball.posY > box.clientHeight - ball.element.clientHeight) {
            ball.speed.y = -ball.speed.y;
            playHitSound();
        }

        ball.element.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;
    }

    function playHitSound() {
        hitSound.currentTime = 0;
        hitSound.play();
    }

    function animate() {
        balls.forEach((ball) => {
            updateBallPosition(ball);
        });

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
        balls.forEach((ball) => {
            box.removeChild(ball.element);
        });
        ballSpeed = { x: 7, y: 5 };
        balls = [];
        createBall(); // Initial ball
        if (animationId === undefined) {
            animate();
        }
        pauseResumeButton.innerText = "Pause";
    }

    function addBall() {
        createBall();
    }

    function speedUp() {
        ballSpeed.x += 1;
        ballSpeed.y += 1;
        updateBallSpeed();
    }

    function slowDown() {
        if (ballSpeed.x > 1 && ballSpeed.y > 1) {
            ballSpeed.x -= 1;
            ballSpeed.y -= 1;
            updateBallSpeed();
        }
    }

    function updateBallSpeed() {
        balls.forEach((ball) => {
            ball.speed.x = ballSpeed.x;
            ball.speed.y = ballSpeed.y;
        });
    }

    pauseResumeButton.addEventListener("click", toggleAnimation);
    restartButton.addEventListener("click", restart);
    addBallButton.addEventListener("click", addBall);
    speedUpButton.addEventListener("click", speedUp);
    slowDownButton.addEventListener("click", slowDown);

    // Initial ball
    createBall();
    animate();
});
